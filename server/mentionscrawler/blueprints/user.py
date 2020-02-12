from flask import (Blueprint, current_app, jsonify, request, session, url_for)
from werkzeug.security import check_password_hash, generate_password_hash
from ..models.user import MentionUser
from sqlalchemy.exc import IntegrityError
from psycopg2.errorcodes import UNIQUE_VIOLATION
from ..responses import *

__all__ = ['user_bp']

user_bp = Blueprint(__name__, __name__, url_prefix='/')


@user_bp.route('/user', methods=['POST'])
def register():
    try:
        new_user = MentionUser("freddy@protonmail.com", "jimmy inc", "asgfjmalkgjaslg")
        MentionUser.commit_user(new_user)
    except IntegrityError as e:
        if e.orig.pgcode == UNIQUE_VIOLATION:
            return bad_request_response(new_user.email + " already taken")
    except Exception as e:
        print(e)  # Will eventually replace this with a logger that prints to a file
        return error_response("Something went wrong and we don't know what!")
    return created_response("Account successfully created!")


@user_bp.route('/user', methods=['GET'])
def update():
    return "itworked!"


@user_bp.route('/user', methods=['DELETE'])
def delete():
    return "DELETED!"
