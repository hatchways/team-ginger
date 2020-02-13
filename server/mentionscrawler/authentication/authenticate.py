from flask import request, current_app
from .token import decode_token
from jwt.exceptions import InvalidTokenError


def authenticate(request_body: object):
    if "token" in request_body:
        try:
            decode_token(current_app.secret_key, request_body["token"])
            return True
        except InvalidTokenError:
            return False
    else:
        return False
