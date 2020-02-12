from flask import (Blueprint, current_app, jsonify, request, session, url_for)
from werkzeug.security import generate_password_hash
from ..models.user import MentionUser
from sqlalchemy.exc import IntegrityError, DataError
from psycopg2.errorcodes import UNIQUE_VIOLATION, INTEGRITY_CONSTRAINT_VIOLATION, STRING_DATA_RIGHT_TRUNCATION, NUMERIC_VALUE_OUT_OF_RANGE
from ..responses import *

__all__ = ["user_bp"]

user_bp = Blueprint(__name__, __name__, url_prefix="/")

# TO-DO Validation, check for minimum password length
# To-DO Check for database errors due to constraints


@user_bp.route("/user", methods=["POST"])
def register():
    if request.is_json:
        body = request.get_json()
        if body["email"] and body["name"] and body["password"]:
            if len(body["password"]) < 7:
                return bad_request_response("Password too short! Must be greater than 6 characters!")
            new_user = MentionUser(body["email"], body["name"], generate_password_hash(body["password"]))
            try:
                MentionUser.commit_user(new_user)
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
                elif e.orig.pgcode == INTEGRITY_CONSTRAINT_VIOLATION:
                    return bad_request_response("Integrity Constraint Violation")
            except Exception as e:
                print(e)  # Will eventually replace this with a logger that prints to a file
                return error_response("Something went wrong and we don't know what!")
        else:
            return bad_request_response("Invalid request! Missing fields!")
    else:
        return bad_request_response("Expected to receive json, did not get json!")
    return created_response("Account successfully created!")


@user_bp.route("/user", methods=["PUT"])
def update():
    return "itworked!"


@user_bp.route("/user", methods=["DELETE"])
def delete():
    return "DELETED!"
