from __future__ import absolute_import, unicode_literals
from celery import Celery
import os

app = Celery("server.mentions_crawler_apis", broker=os.environ["REDIS_URL"],
             include=["server.mentions_crawler_apis.reddit",
                      "server.mentions_crawler_apis.twitter",
                      "server.mentions_crawler_apis.db",
                      "server.mentions_crawler_apis.email"])


if __name__ == "__main__":
    app.start()
