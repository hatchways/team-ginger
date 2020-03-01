from sendgrid import SendGridAPIClient

SENDGRID_API_KEY = "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"
FROM_EMAIL = "ryannarine97@gmail.com"
WELCOME_SUBJECT = "Welcome to mentionscrawler"
WELCOME_TEMPLATE_ID = "d-335f9dca0ced402aabcc72e3a352c265"

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