from flask import Blueprint, request, make_response
from werkzeug.security import check_password_hash
from ..models.user import MentionUser
from ..responses import token_response, bad_request_response, ok_response
from ..authentication.authenticate import enforce_json

session_bp = Blueprint("session", __name__, url_prefix="/")


@session_bp.route("/login", methods=["POST"])
@enforce_json()
def login():
    body = request.get_json()
    if body.get("email") and body.get("password"):
        user = MentionUser.query.filter_by(email=body.get("email")).first()
        if user is not None:
            if check_password_hash(user.password, body.get("password")):
                print("VALIDATED!")
                return token_response("Successfully validated "+body.get("email"), user.email, user.id)
        return bad_request_response("Either email or password was incorrect!")

