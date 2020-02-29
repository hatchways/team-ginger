from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

SENDGRID_API_KEY = "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"
FROM_EMAIL = "ryannarine97@gmail.com"
WELCOME_SUBJECT = "Welcome to mentionscrawler"

def welcome_email(email):
    message = Mail(
        from_email=FROM_EMAIL,
        to_emails=email,
        subject=WELCOME_SUBJECT,
        html_content='<strong>Welcome to MentionsCrawler</strong>')
    try:
        sg = SendGridAPIClient(SENDGRID_API_KEY)
        response = sg.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
    except Exception as e:
        print(e.message)