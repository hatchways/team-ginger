from flask import Blueprint, request
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
        if body["email"] and body["password"]:
            user = MentionUser.query.filter_by(email=body["email"])
            if user is not None:
                if check_password_hash(user.password, body["password"]):
                    return token_response("Successfully validated "+body["email"], body["email"])
            return bad_request_response("Either email or password was incorrect!")
    else:
        return bad_request_response(EXPECTED_JSON)


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
