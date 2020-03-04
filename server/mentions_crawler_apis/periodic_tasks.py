from celery.schedules import crontab
from .celery import app
from .constants import _ISSUER
from ..constants import SECRET_KEY_TAG
from ..config import SECRET_KEY
from .db import clean_db
import os
import jwt


@app.on_after_configure.connect
def setup_periodic_tasks(sender, **kwargs):
    token = jwt.encode({"iss": _ISSUER, SECRET_KEY_TAG: os.environ["SCHEDULER_KEY"]}, SECRET_KEY, algorithm="HS256")
    sender.add_periodic_task(
        crontab(hour=0, minute=0, day_of_month=30),
        clean_db.s(token)
    )
