import praw
from flask import Blueprint
from ..authentication.authenticate import authenticate, enforce_json
from ..models.user import Company
from ..models.mention import Mention

_CLIENT_ID = "auo7pZGyIVaJhw"
_CLIENT_SECRET = "thAk1F93RSQC2uA_6d0xKYNntD8"
_USER_AGENT = "mentions_crawler:redditpart:madebyevanandryan"

reddit = praw.Reddit(client_id=_CLIENT_ID,
                     client_secret=_CLIENT_SECRET,
                     user_agent=_USER_AGENT)

reddit_bp = Blueprint("reddit", __name__, url_prefix="/")


@reddit_bp.route("/reddit")
@authenticate()
def search(user):
    companies = Company.query.filter_by(mention_user_id=user.get("user_id")).all()
    mentions = []
    for submission in reddit.subreddit("all").search("Microsoft", sort="new", time_filter="month"):
        if submission.is_self:
            mentions.append(Mention(user.get("user_id"), ))
    return "reddit"
