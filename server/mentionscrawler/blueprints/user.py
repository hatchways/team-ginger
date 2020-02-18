from flask import Blueprint, request
from werkzeug.security import generate_password_hash
from ..authentication.authenticate import enforce_json, authenticate
from ..models.user import MentionUser
from ..models.company import Company
from ..models.site import get_sites
from ..db import insert_row, commit
from sqlalchemy.exc import IntegrityError, DataError
from psycopg2.errorcodes import (UNIQUE_VIOLATION, FOREIGN_KEY_VIOLATION, STRING_DATA_RIGHT_TRUNCATION,
                                 NUMERIC_VALUE_OUT_OF_RANGE)
from ..responses import *

user_bp = Blueprint("users", __name__, url_prefix="/")


@user_bp.route("/users", methods=["POST"])
@enforce_json()
def add():
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
    else:
        return bad_request_response("Invalid request! Missing fields!")
    new_company = Company(new_user.id, body.get("name"))
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

    return created_response("Account successfully created!", new_user.email, [new_company.name],
                            new_user.id, get_sites())


@user_bp.route("/users", methods=["PUT"])
@enforce_json()
@authenticate()
def update(user):
    body = request.get_json()
    if body.get("email"):
        _user = MentionUser.query.filter_by(id=user.get("user_id")).first()
        _user.email = body.get("email")
        commit()
    else:
        return bad_request_response("Invalid request! Missing fields!")
    return ok_response("Email changed!")


@user_bp.route("/users", methods=["DELETE"])
@enforce_json()
@authenticate()
def delete(user):
    return "DELETED!"
