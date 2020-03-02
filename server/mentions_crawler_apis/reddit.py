from __future__ import absolute_import, unicode_literals
import json
import praw
import requests
from .Mention import Mention
from .constants import REDDIT, RESPONSE_URL, SCHEDULE_TIME
from ..constants import MENTIONS_TAG, SITE_TAG, USER_ID_TAG, COMPANY_ID_TAG, COMPANY_NAME_TAG
from .celery import app
from celery.exceptions import CeleryError

_CLIENT_ID = "auo7pZGyIVaJhw"
_CLIENT_SECRET = "thAk1F93RSQC2uA_6d0xKYNntD8"
_USER_AGENT = "mentions_crawler:redditpart:madebyevanandryan"

_reddit = praw.Reddit(client_id=_CLIENT_ID,
                      client_secret=_CLIENT_SECRET,
                      user_agent=_USER_AGENT)


@app.task(name="reddit.search")
def search(user_id: int, companies: list, cookies: dict, first_run: bool):
    #  get all company names associated with a user
    mentions = []  # initialize mentions as a list
    for company in companies:
        if first_run:
            submissions = _reddit.subreddit("all").search(company[COMPANY_NAME_TAG], sort="new", time_filter="month")
        else:
            submissions = _reddit.subreddit("all").search(company[COMPANY_NAME_TAG], sort="new", time_filter="hour")
        for submission in submissions:
            if submission.is_self and submission.over_18 is not True:
                mention = Mention(company[COMPANY_ID_TAG], submission.url,
                                  submission.selftext, submission.score, submission.created_utc,
                                  submission.title)
                mentions.append(json.dumps(mention.__dict__))
    payload = {USER_ID_TAG: user_id, SITE_TAG: REDDIT, MENTIONS_TAG: mentions}
    requests.post(RESPONSE_URL, json=payload, cookies=cookies)


def enqueue(user_id: int, companies: list, cookies: dict, first_run):
    try:
        if first_run is True:
            result = search.apply_async((user_id, companies, cookies, first_run))
        else:
            result = search.apply_async((user_id, companies, cookies, first_run),
                                        countdown=SCHEDULE_TIME)

    except CeleryError as e:  # might look into more specific errors later, but for now I just need to get this working
        print(e)
        return e
    return result


'''
def enqueue_at(user_id: int, companies: list, key: str):
    job_id = str(user_id)+":"+REDDIT
    job = Job.create(search, (user_id, companies, key), False, id=job_id)
    scheduled_time = datetime.now() + timedelta(0, SCHEDULE_TIME * 60)
    reddit_queue.enqueue_at(scheduled_time, job)


def stop_job(user_id: int):
    job_id = str(user_id)+":"+REDDIT
    reddit_queue.remove(job_id)
'''

