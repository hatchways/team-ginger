import praw

from ..models.company import Company
from ..models.mention import Mention
from ..models.site import REDDIT
from ..db import insert_rows

_CLIENT_ID = "auo7pZGyIVaJhw"
_CLIENT_SECRET = "thAk1F93RSQC2uA_6d0xKYNntD8"
_USER_AGENT = "mentions_crawler:redditpart:madebyevanandryan"

_reddit = praw.Reddit(client_id=_CLIENT_ID,
                      client_secret=_CLIENT_SECRET,
                      user_agent=_USER_AGENT)


def search(user):
    companies = Company.query.filter_by(mention_user_id=user.get("user_id")).all()
    mentions = []
    for company in companies:
        for submission in _reddit.subreddit("all").search(company.name, sort="new", time_filter="month"):
            if submission.is_self:
                mentions.append(Mention(user.get("user_id"), REDDIT, submission.url, submission.selftext,
                                        submission.score, submission.title))
            else:
                # Blank text used until I get the ability to crawl the link and pull some text there
                mentions.append(Mention(user.get("user_id"), REDDIT, submission.url, "",
                                        submission.score, submission.title))

    insert_rows(mentions)
