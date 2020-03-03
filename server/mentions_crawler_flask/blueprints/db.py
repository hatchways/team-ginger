from flask import Blueprint, request
from ..db import delete_rows
from ..models.mention import Mention
from datetime import datetime, timezone
from ..responses import ok_response

MONTH_IN_SECONDS = 2592000
EPOCH = datetime(1970, 1, 1).replace(tzinfo=timezone.utc)

db_bp = Blueprint("database", __name__, url_prefix="/db")


@db_bp.route("/clean", methods=["POST"])
def clean_db():
    current_time = (datetime.now().replace(tzinfo=timezone.utc) - EPOCH).total_seconds()
    mentions = Mention.query.filter(Mention.date < current_time-MONTH_IN_SECONDS).all()
    result = delete_rows(mentions)
    if result is True:
        return ok_response("Cleaned the DB Successfully!")
    return result
