from flask import request, current_app
from .token import decode_token
from jwt.exceptions import InvalidTokenError
from functools import wraps
from ..responses import unauthorized_response, error_response, TOKEN_TAG


def authenticate():
    def wrap(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            auth_token = request.cookies.get(TOKEN_TAG)
            if auth_token:
                try:
                    user = decode_token(current_app.secret_key, auth_token)
                    print(user)
                except InvalidTokenError:
                    return unauthorized_response('Invalid token')

                return fn(user, *args, **kwargs)

            return error_response('No user logged in. Please log in again.')
        return wrapper
    return wrap
