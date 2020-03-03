from __future__ import absolute_import, unicode_literals
from celery import Celery
from requests import post
from .constants import DB_CLEAN_URL, _ISSUER
from ..config import SECRET_KEY
import jwt


app = Celery("server.mentions_crawler_apis", broker="", include=["server.mentions_crawler_apis.reddit",
                                                                         "server.mentions_crawler_apis.twitter",
                                                                         "server.mentions_crawler_apis.db",
                                                                         "server.mentions_crawler_apis.email"])


@app.task()
def email_report(token: str):
    pass


if __name__ == "__main__":
    app.start()
