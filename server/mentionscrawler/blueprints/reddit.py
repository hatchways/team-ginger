import praw
from flask import Blueprint, jsonify
_CLIENT_ID = "auo7pZGyIVaJhw"
_CLIENT_SECRET = "thAk1F93RSQC2uA_6d0xKYNntD8"
_USER_AGENT = "mentions_crawler:redditpart:madebyevanandryan"

reddit = praw.Reddit(client_id=_CLIENT_ID,
                     client_secret=_CLIENT_SECRET,
                     user_agent=_USER_AGENT)

reddit_bp = Blueprint("reddit", __name__, url_prefix="/")


@reddit_bp.route("/testsearch")
def testsearch():
    return reddit.subreddit("all").subscribers
