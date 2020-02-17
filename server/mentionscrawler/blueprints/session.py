from flask import Blueprint, request
from werkzeug.security import check_password_hash
from ..models.user import MentionUser
from ..models.company import Company
from ..responses import token_response, bad_request_response, logout_response, TOKEN_TAG
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
                companies = list(Company.query.filter_by(mention_user_id=user.id).values("name"))
                return token_response("Successfully validated "+body.get("email"), user.email, companies, user.id)
        return bad_request_response("Either email or password was incorrect!")


@session_bp.route("/logout", methods=["POST"])
def logout():
    if request.cookies.get(TOKEN_TAG) is None:
        return bad_request_response("No one is logged in!")
    return logout_response("Successfully logged out!")
