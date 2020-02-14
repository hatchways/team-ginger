from flask import Blueprint, request
from werkzeug.security import generate_password_hash
from ..models.user import MentionUser, Company
from ..db import insert_row
from sqlalchemy.exc import IntegrityError, DataError
from psycopg2.errorcodes import (UNIQUE_VIOLATION, FOREIGN_KEY_VIOLATION, STRING_DATA_RIGHT_TRUNCATION,
                                 NUMERIC_VALUE_OUT_OF_RANGE)
from ..responses import *

user_bp = Blueprint("users", __name__, url_prefix="/")


@user_bp.route("/users", methods=["POST"])
def register():
    if request.is_json:
        body = request.get_json()
        if "email" in body and "name" in body and "password" in body:
            if len(body["password"]) < 7:
                return bad_request_response("Password too short! Must be greater than 6 characters!")
            new_user = MentionUser(body["email"], generate_password_hash(body["password"]))
            try:
                insert_row(new_user)
            except DataError as e:
                print(e)
                if e.orig.pgcode == STRING_DATA_RIGHT_TRUNCATION:
                    return bad_request_response("String is too long!")
                elif e.orig.pgcode == NUMERIC_VALUE_OUT_OF_RANGE:
                    return bad_request_response("Number is out of range!")
            except IntegrityError as e:
                print(e)
                if e.orig.pgcode == UNIQUE_VIOLATION:
                    return bad_request_response(new_user.email + " already taken")
            except Exception as e:
                print(e)  # Will eventually replace this with a logger that prints to a file
                return error_response("Something went wrong and we don't know what!")
        else:
            return bad_request_response("Invalid request! Missing fields!")
    else:
        return bad_request_response(EXPECTED_JSON)
    new_company = Company(body["name"], new_user.id)
    try:
        insert_row(new_company)
    except DataError as e:
        print(e)
        if e.orig.pgcode == STRING_DATA_RIGHT_TRUNCATION:
            return bad_request_response("String is too long!")
        elif e.orig.pgcode == NUMERIC_VALUE_OUT_OF_RANGE:
            return bad_request_response("Number is out of range!")
    except IntegrityError as e:
        print(e)
        if e.orig.pgcode == FOREIGN_KEY_VIOLATION:
            return bad_request_response("Foreign key violation!")
    return created_response("Account successfully created!", new_user.email)


@user_bp.route("/user", methods=["PUT"])
def update():
    return "itworked!"


@user_bp.route("/user", methods=["DELETE"])
def delete():
    return "DELETED!"
