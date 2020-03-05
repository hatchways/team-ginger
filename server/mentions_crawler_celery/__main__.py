from __future__ import absolute_import, unicode_literals
from celery.schedules import crontab
from .celery import app
from .constants import _ISSUER
from ..constants import SECRET_KEY_TAG
from ..config import SECRET_KEY
from .db import clean_db
from .email import generate_emails
import os
import jwt


if __name__ == "__main__":
    '''
    app.conf.beat_schedule = {
        "generate-emails": {
            "task": "email.generate",
            "schedule": crontab(minute=1),
            "args": (token,)
        },
        "clean_database": {
            "task": "server.mentions_crawler_celery.db.clean",
            "schedule": crontab(minute=1),
            "args": (token,),
            "options": {
                "queue": "celery",
                "routing_key": "celery"
            }
        }
    }
    app.conf.timezone = "UTC"
    print("Did this configure right?")
    '''
    app.start()
