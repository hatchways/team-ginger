from __future__ import absolute_import, unicode_literals

from celery import Celery


app = Celery("server.mentions_crawler_apis", broker="redis://", include=["server.mentions_crawler_apis.reddit"])

if __name__ == "__main__":
    app.start()