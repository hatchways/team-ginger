from __future__ import absolute_import, unicode_literals
import json
import requests
from requests_oauthlib import OAuth1
from .Mention import Mention
from .constants import TWITTER, RESPONSE_URL, SCHEDULE_TIME
from ..json_constants import MENTIONS_TAG, SITE_TAG, USER_ID_TAG, COMPANY_ID_TAG, COMPANY_NAME_TAG
from .celery import app
from celery.exceptions import CeleryError
from datetime import date, timedelta, timezone
from dateparser import parse

QUERY_TAG = "q"
UNTIL_TAG = "until"

STATUSES_TAG = "statuses"
TEXT_TAG = "text"
FAVOURITE_COUNT_TAG = "favorite_count"
CREATED_AT_TAG = "created_at"
EXTENDED_TWEET_TAG = "extended_tweet"
FULL_TEXT_TAG = "full_text"
ENTITIES_TAG = "entities"
URLS_TAG = "urls"
URL_TAG = "url"


def one_week_ago():
    return str(date.today() - timedelta(days=7))


def one_day_ago():
    return str(date.today() - timedelta(days=1))


@app.task(name="twitter.search")
def search(user_id: int, companies: list, cookies: dict, first_run: bool):
    #  get all company names associated with a user
    api_url = "https://api.twitter.com/1.1/search/tweets.json"

    api_key = "cvk7jHmbc3Y08jLhrMnelgAeL"
    api_secret_key = "PQ4WXZmBBd6f9SyspCaCn1Q2xpdawTY2YnwqF7YfpdYni5jlg7"

    access_token = "125311068-VrV3rhIY01mWzFXLy6Xa0UvPFAhHZ4oC6rnf2Y5A"
    access_token_secret = "62lyn41C46GZ16RmHcEgI4f5VH3n4pdlQjKH790qh3khi"

    auth = OAuth1(api_key, api_secret_key,
                  access_token, access_token_secret)
    mentions = []  # initialize mentions as a list
    for company in companies:
        company_name = '"' + company[COMPANY_NAME_TAG] + '"'
        if first_run:
            params = {QUERY_TAG: company_name, UNTIL_TAG: one_week_ago()}
        else:
            params = {QUERY_TAG: company_name, UNTIL_TAG: one_day_ago()}
        tweets = requests.get(api_url, auth=auth, params=params)
        tweets_json = tweets.json()

        for tweet in tweets_json[STATUSES_TAG]:
            tweet_date = parse(tweet[CREATED_AT_TAG])
            tweet_date_unix_time = tweet_date.replace(tzinfo=timezone.utc).timestamp()
            url = tweet[ENTITIES_TAG][URLS_TAG][URL_TAG]
            if tweet.get(EXTENDED_TWEET_TAG) is not None:
                text = tweet[EXTENDED_TWEET_TAG][FULL_TEXT_TAG]
            else:
                text = tweet[TEXT_TAG]
            if tweet.get(FAVOURITE_COUNT_TAG) is not None:
                favourites = tweet[FAVOURITE_COUNT_TAG]
            else:
                favourites = 0
            mention = Mention(company[COMPANY_ID_TAG], url,
                              text, favourites, tweet_date_unix_time)
            mentions.append(json.dumps(mention.__dict__))
    payload = {USER_ID_TAG: user_id, SITE_TAG: TWITTER, MENTIONS_TAG: mentions}
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