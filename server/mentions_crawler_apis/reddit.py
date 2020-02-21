import praw
import requests
from datetime import datetime, timedelta
from .Mention import Mention
from .constants import REDDIT, SECRET_HASH_TAG, MENTIONS_TAG, RESPONSE_URL, SCHEDULE_TIME
from redis import Redis
from rq import Queue
from rq.job import Job
from .celery import app


_CLIENT_ID = "auo7pZGyIVaJhw"
_CLIENT_SECRET = "thAk1F93RSQC2uA_6d0xKYNntD8"
_USER_AGENT = "mentions_crawler:redditpart:madebyevanandryan"

_reddit = praw.Reddit(client_id=_CLIENT_ID,
                      client_secret=_CLIENT_SECRET,
                      user_agent=_USER_AGENT)



'
def enqueue(user_id: int, companies: list, key: str):

    search.delay(user_id, companies, key, True)


def enqueue_at(user_id: int, companies: list, key: str):
    job_id = str(user_id)+":"+REDDIT
    job = Job.create(search, (user_id, companies, key), False, id=job_id)
    scheduled_time = datetime.now() + timedelta(0, SCHEDULE_TIME * 60)
    reddit_queue.enqueue_at(scheduled_time, job)


def stop_job(user_id: int):
    job_id = str(user_id)+":"+REDDIT
    reddit_queue.remove(job_id)



@app.task
def search(user_id: int, companies: list, key: str, first_run: bool):
    #  get all company names associated with a user
    mentions = []  # initialize mentions as a list
    for company in companies:
        if first_run:
            submissions = _reddit.subreddit("all").search(company.name, sort="new", time_filter="month")
        else:
            submissions = _reddit.subreddit("all").search(company.name, sort="new", time_filter="hour")
        for submission in submissions:
            if submission.is_self:
                mention = Mention(user_id, company.id, REDDIT, submission.url,
                                  submission.selftext, submission.score, submission.created_utc,
                                  submission.title)
                mentions.append(mention)
    payload = {SECRET_HASH_TAG: key, MENTIONS_TAG: mentions}
    request = requests.post(RESPONSE_URL, json=payload)
    print("Request status code: " + request.status_code)

