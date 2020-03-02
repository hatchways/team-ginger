from sendgrid import SendGridAPIClient

SENDGRID_API_KEY = "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"
FROM_EMAIL = "ryannarine97@gmail.com"
WELCOME_SUBJECT = "Welcome to mentionscrawler"
WELCOME_TEMPLATE_ID = "d-335f9dca0ced402aabcc72e3a352c265"
WEEKLY_TEMPLATE_ID = "d-2f796ef4ab8541dbb30dc80d62a1fd86"
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

def weekly_email(email,  data = TEST_DATA_1, no_crawlers = False):
    message = {
        'personalizations': [
            {
                'to': [
                    {
                        'email': email
                    }
                ],
                'subject': 'Your Weekly Mentions',
                'dynamic_template_data': TEST_DATA_1
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
