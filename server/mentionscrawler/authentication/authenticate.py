from flask import request, current_app
from functools import wraps
from ..responses import bad_request_response, unauthorized_response
from .token import decode_token
from jwt.exceptions import InvalidTokenError


def authenticate(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        if request.is_json:
            body = request.get_json()
            if body["token"]:
                try:
                    decode_token(current_app.secret_key, body["token"])
                    return f(*args, **kwargs)
                except InvalidTokenError:
                    return unauthorized_response("Invalid token! Please try logging back in...")
            else:
                return unauthorized_response("Need to log in!")
        else:
            return bad_request_response("Expected to receive json, did not get json!")

