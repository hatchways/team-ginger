from flask import Blueprint, request, make_response
from werkzeug.security import check_password_hash
from ..models.user import MentionUser
from ..responses import token_response, bad_request_response, ok_response, EXPECTED_JSON
from ..authentication.authenticate import authenticate

__all__ = ["session_bp"]

session_bp = Blueprint("session", __name__, url_prefix="/")


@session_bp.route("/login", methods=["POST"])
def login():
    if request.is_json:
        body = request.get_json()
        print(body)
        if body.get("email") and body.get("password"):
            user = MentionUser.query.filter_by(email=body.get("email")).first()
            if user is not None:
                #print(user)
                print(user)
                if check_password_hash(user.password, body.get("password")):
                    return token_response("Successfully validated "+body["email"], body["email"])
            return bad_request_response("Either email or password was incorrect!")
    else:
        return bad_request_response(EXPECTED_JSON)

'''
# For testing authentication, need to be authenticated to get a cheeseburger
@session_bp.route("/cheeseburger", methods=["GET", "POST"])
def cheeseburger():
    if request.is_json:
        if authenticate(request.get_json()):
            return ok_response("CHEESEBURGER FOR YOU!!!!")
        else:
            return bad_request_response("NO CHEESEBURGER FOR YOU!!!!")
    else:
        return bad_request_response(EXPECTED_JSON)
'''

@session_bp.route("/makecookie")
def make_cookie():
    response = make_response("making a chocolate chip cookie!")
    response.set_cookie("choclatechip", "moist and delicious")
    return response


@session_bp.route("/cheeseburger2")
@authenticate()
def cheeseburger2(user):
    return "Double cheese burger"
