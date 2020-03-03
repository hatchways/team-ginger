from .celery import app
from

@app.task
def clean_db(token: str):
    cookies = {TOKEN_TAG: token}
    clean_db_request = post(DB_CLEAN_URL, cookies=cookies)
    return clean_db_request.status_code