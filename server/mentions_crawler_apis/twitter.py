from __future__ import absolute_import, unicode_literals
import json
import requests
from requests_o
from .Mention import Mention
from .constants import TWITTER, RESPONSE_URL, SCHEDULE_TIME
from ..json_constants import MENTIONS_TAG, SITE_TAG, USER_ID_TAG, COMPANY_ID_TAG, COMPANY_NAME_TAG
from .celery import app
from celery.exceptions import CeleryError

url = "https://twitter.com/search?q=cheeseburger"

api_key = "cvk7jHmbc3Y08jLhrMnelgAeL"
api_secret_key = "PQ4WXZmBBd6f9SyspCaCn1Q2xpdawTY2YnwqF7YfpdYni5jlg7"

access_token = "125311068-VrV3rhIY01mWzFXLy6Xa0UvPFAhHZ4oC6rnf2Y5A"
access_token_secret = "62lyn41C46GZ16RmHcEgI4f5VH3n4pdlQjKH790qh3khi"
