from flask import (Blueprint, current_app, jsonify, request, session, url_for)
from werkzeug.security import generate_password_hash
from ..models.user import MentionUser
from sqlalchemy.exc import IntegrityError
from psycopg2.errorcodes import UNIQUE_VIOLATION
from ..responses import *

__all__ = ["user_bp"]

user_bp = Blueprint(__name__, __name__, url_prefix="/")


@user_bp.route("/user", methods=["POST"])
def register():
    if request.is_json:
        body = request.get_json()
        if body["email"] and body["name"] and body["password"]:
            new_user = MentionUser(body["email"], body["name"], generate_password_hash(body["password"]))
            try:
                MentionUser.commit_user(new_user)
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
        return bad_request_response("Expected to receive json, did not get json!")
    return created_response("Account successfully created!")


@user_bp.route("/user", methods=["PUT"])
def update():
    return "itworked!"


@user_bp.route("/user", methods=["DELETE"])
def delete():
    return "DELETED!"
