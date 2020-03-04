from flask import Blueprint, request, current_app
from datetime import datetime, timezone
from ..models.mention import Mention
from ..models.user import MentionUser
from ..responses import ok_response, unauthorized_response
from ...constants import TOKEN_TAG, EPOCH, WEEK_IN_SECONDS
from jwt.exceptions import InvalidTokenError
import jwt

email_bp = Blueprint("email", __name__, url_prefix="/")


@email_bp.route("/email")
def get_email_mentions():
    token = request.cookies.get(TOKEN_TAG)
    if token is not None:
        try:
            jwt.decode(token, current_app.secret_key)
        except InvalidTokenError:
            return unauthorized_response("You're not authorized to clean the database!")
        users = MentionUser.query.all()
        current_time = (datetime.now().replace(tzinfo=timezone.utc) - EPOCH).total_seconds()
        mentions = Mention.query.filter(Mention.date < current_time-WEEK_IN_SECONDS)
