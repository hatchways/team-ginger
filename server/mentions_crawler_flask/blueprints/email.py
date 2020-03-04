from flask import Blueprint, request, current_app
from datetime import datetime, timezone
from ..models.mention import Mention
from ..models.user import MentionUser
from ..models.site import SiteAssociation
from ..responses import data_response, unauthorized_response
from ...constants import TOKEN_TAG, EPOCH, WEEK_IN_SECONDS, WARN_TAG, MENTIONS_TAG
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
        output = {}
        current_time = (datetime.now().replace(tzinfo=timezone.utc) - EPOCH).total_seconds()
        for user in users:
            assoc = SiteAssociation.query.filter_by(mention_user_id=user.id).all()
            mentions = Mention.query.order_by(Mention.hits.desc()). \
                filter_by(mention_user_id=user.id). \
                filter(Mention.date < current_time - WEEK_IN_SECONDS).limit(7).all()
            if mentions is not None:
                if assoc is None:
                    output[user.email] = {WARN_TAG: True, MENTIONS_TAG: mentions}
                else:
                    output[user.email] = {WARN_TAG: False, MENTIONS_TAG: mentions}
        return data_response(output)
    return unauthorized_response("No token provided!")
