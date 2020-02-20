import praw
import requests
from . import REDDIT, SECRET_HASH_TAG, MENTIONS_TAG, RESPONSE_URL, _Mention
from redis import Redis
from rq import Queue

_CLIENT_ID = "auo7pZGyIVaJhw"
_CLIENT_SECRET = "thAk1F93RSQC2uA_6d0xKYNntD8"
_USER_AGENT = "mentions_crawler:redditpart:madebyevanandryan"

_reddit = praw.Reddit(client_id=_CLIENT_ID,
                      client_secret=_CLIENT_SECRET,
                      user_agent=_USER_AGENT)

reddit_queue = Queue(connection=Redis())

# TODO Remove all database references
# TODO search needs to start no later than the latest mention
# TODO pass list of company names and list of most recent mention of said company


def enqueue(site: str, user_id: int, companies: list, key: str):
    reddit_queue.enqueue(search, site, user_id, companies, key)


def stop_job(user_id: int):
    pass


def search(user_id: int, companies: list, key: str, first_run=True):
    #  get all company names associated with a user
    mentions = []  # initialize mentions as a list
    for company in companies:
        if first_run:
            submissions = _reddit.subreddit("all").search(company.name, sort="new", time_filter="month")
        else:
            submissions = _reddit.subreddit("all").search(company.name, sort="new", time_filter="hour")
        for submission in submissions:
            if submission.is_self:
                mention = _Mention(user_id, company.id, REDDIT, submission.url,
                                   submission.selftext, submission.score, submission.created_utc,
                                   submission.title)
                mentions.append(mention)
    payload = {SECRET_HASH_TAG: key, MENTIONS_TAG: mentions}
    request = requests.post(RESPONSE_URL, json=payload)
