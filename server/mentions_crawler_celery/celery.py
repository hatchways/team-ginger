from __future__ import absolute_import, unicode_literals
from celery import Celery
from celery.schedules import crontab
from ..config import SECRET_KEY
from sendgrid import SendGridAPIClient
from .constants import EMAIL_URL, DB_CLEAN_URL, _ISSUER
from ..constants import TOKEN_TAG, MENTIONS_TAG, WARN_TAG, EMPTY_TAG, SECRET_KEY_TAG
from requests import get, post
from datetime import date
from .utils import month_to_num
import os
import jwt


app = Celery("server.mentions_crawler_celery", broker=os.environ["REDIS_URL"],
             include=["server.mentions_crawler_celery.reddit",
                      "server.mentions_crawler_celery.twitter",
                      "server.mentions_crawler_celery.db",
                      "server.mentions_crawler_celery.email"])


SENDGRID_API_KEY = os.environ["SENDGRID_API_KEY"]
FROM_EMAIL = os.environ["FROM_EMAIL"]
WELCOME_SUBJECT = "Welcome to mentionscrawler"
WELCOME_TEMPLATE_ID = "d-335f9dca0ced402aabcc72e3a352c265"
WEEKLY_TEMPLATE_ID = "d-2f796ef4ab8541dbb30dc80d62a1fd86"
MONTH_TAG = "month"
DAY_START_TAG = "dayStart"
DAY_END_TAG = "dayEnd"


@app.task(name="db.clean")
def clean_db(token: str):
    cookies = {TOKEN_TAG: token}
    clean_db_request = post(DB_CLEAN_URL, cookies=cookies)
    return clean_db_request.status_code


def welcome_email(email, company):
    message = {
        'personalizations': [
            {
                'to': [
                    {
                        'email': email
                    }
                ],
                'subject': 'Welcome to MentionsCrawler',
                "dynamic_template_data": {
                    "company": company,
                }
            }
        ],
        'from': {
            'email': FROM_EMAIL
        },
        'template_id': WELCOME_TEMPLATE_ID
        ,
    }
    sg = SendGridAPIClient(SENDGRID_API_KEY)
    sg.send(message)


def weekly_email(email,  data):
    message = {
        'personalizations': [
            {
                'to': [
                    {
                        'email': email
                    }
                ],
                'subject': 'Your Weekly Mentions',
                'dynamic_template_data': data
            }
        ],
        'from': {
            'email': FROM_EMAIL
        },
        'template_id': WEEKLY_TEMPLATE_ID
        ,
    }
    sg = SendGridAPIClient(SENDGRID_API_KEY)
    sg.send(message)


@app.task(name="email.generate")
def generate_emails(token: str):
    cookies = {TOKEN_TAG: token}
    request = get(EMAIL_URL, cookies=cookies)
    data = request.json()
    day = date.today().day
    month = date.today().month
    if data is not None:
        for email in data:
            mentions = []
            empty = data[email][EMPTY_TAG]
            if data[email].get(MENTIONS_TAG) is not None:
                mentions = data[email].get(MENTIONS_TAG)
            template = {
                WARN_TAG: data[email][WARN_TAG],
                EMPTY_TAG: empty,
                MONTH_TAG: month_to_num(month),
                DAY_START_TAG: day - 6,
                DAY_END_TAG: day,
                MENTIONS_TAG: mentions
            }
            weekly_email(email, template)



@app.on_after_configure.connect
def setup_periodic_tasks(sender, **kwargs):
    token = jwt.encode({"iss": _ISSUER, SECRET_KEY_TAG: os.environ["SCHEDULER_KEY"]}, SECRET_KEY, algorithm="HS256")\
        .decode("utf-8")
    # Calls test('hello') every 10 seconds.
    sender.add_periodic_task(10.0, generate_emails.s(token))

    # Calls test('world') every 30 seconds
    sender.add_periodic_task(30.0, clean_db.s(token))
