from sendgrid import SendGridAPIClient
import os

SENDGRID_API_KEY = os.environ["SENDGRID_API_KEY"]
FROM_EMAIL = os.environ["FROM_EMAIL"]
WELCOME_SUBJECT = "Welcome to mentionscrawler"
WELCOME_TEMPLATE_ID = "d-335f9dca0ced402aabcc72e3a352c265"
WEEKLY_TEMPLATE_ID = "d-2f796ef4ab8541dbb30dc80d62a1fd86"


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


