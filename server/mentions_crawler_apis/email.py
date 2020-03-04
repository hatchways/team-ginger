from sendgrid import SendGridAPIClient
from .celery import app
from .constants import EMAIL_URL
from ..constants import TOKEN_TAG, MENTIONS_TAG, WARN_TAG
from requests import get
from datetime import date
from .utils import month_to_num
import os

SENDGRID_API_KEY = os.environ["SENDGRID_API_KEY"]
FROM_EMAIL = os.environ["FROM_EMAIL"]
WELCOME_SUBJECT = "Welcome to mentionscrawler"
WELCOME_TEMPLATE_ID = "d-335f9dca0ced402aabcc72e3a352c265"
WEEKLY_TEMPLATE_ID = "d-2f796ef4ab8541dbb30dc80d62a1fd86"
MONTH_TAG = "month"
DAY_START_TAG = "dayStart"
DAY_END_TAG = "dayEnd"

TEST_DATA_1 = {
    "warn": True,
    "month": "Oct",
    "dayStart": 11,
    "dayEnd": 17,
    "mentions": [{"title": "Paypal invested $500 million into company ABC", "source": "Reddit", "snippet": "Man Paypal made a huge mistake" 
        }, {"title": "Company ABC flees with Paypal investment", "source": "Facebook", "snippet": "Everyone but Paypal saw this coming"}]    
}

TEST_DATA_2 = {
    "warn": True,
    "empty": True,
    "month": "Nov",
    "dayStart": 9,
    "dayEnd": 16,
    "mentions": []    
}


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
            template = {
                WARN_TAG: data[email][WARN_TAG],
                MONTH_TAG: month_to_num(month),
                DAY_START_TAG: day - 6,
                DAY_END_TAG: day,
                MENTIONS_TAG: data[email][MENTIONS_TAG]
            }
            weekly_email(email, template)



