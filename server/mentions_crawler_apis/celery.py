from __future__ import absolute_import, unicode_literals
from celery import Celery
from celery.schedules import crontab
from requests import post
from .constants import DB_CLEAN_URL, _ISSUER
from ..constants import SCHEDULER_KEY, SECRET_KEY_TAG, TOKEN_TAG
from ..config import SECRET_KEY
import jwt


app = Celery("server.mentions_crawler_apis", broker="redis://", include=["server.mentions_crawler_apis.reddit",
                                                                         "server.mentions_crawler_apis.twitter"]

@app.on_after_configure.connect
def setup_periodic_tasks(sender, **kwargs):
    token = jwt.encode({"iss": _ISSUER, SECRET_KEY_TAG: SCHEDULER_KEY}, SECRET_KEY, algorithm="HS256")



    '''
    sender.add_periodic_task(
        crontab(hour=0, minute=0, day_of_month=30),
        clean_db.s(token)
    )'''


@app.task
def email_report(token: str):
    pass


if __name__ == "__main__":
    app.start()
