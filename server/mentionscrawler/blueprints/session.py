from flask import Blueprint, request, make_response
from werkzeug.security import check_password_hash
from ..models.user import MentionUser
from ..responses import token_response, bad_request_response, ok_response, EXPECTED_JSON
from ..authentication.authenticate import authenticate

session_bp = Blueprint("session", __name__, url_prefix="/")


@session_bp.route("/login", methods=["POST"])
def login():
    if request.is_json:
        body = request.get_json()
        if body.get("email") and body.get("password"):
            user = MentionUser.query.filter_by(email=body.get("email")).first()
            if user is not None:
                if check_password_hash(user.password, body.get("password")):
                    print("VALIDATED!")
                    return token_response("Successfully validated "+body["email"], body["email"])
            return bad_request_response("Either email or password was incorrect!")
    else:
        return bad_request_response(EXPECTED_JSON)


@session_bp.route("/cheeseburger2")
@authenticate()
def cheeseburger2(user):
    return "Double cheese burger"

@session_bp.route("/gimmeatoken")
def gimmetoken():
    return token_response("Boop", "gaurdianaq@protonmail.com")
