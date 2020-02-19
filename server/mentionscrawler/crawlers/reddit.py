import praw

from ..models.company import Company
from ..models.mention import Mention
from ..models.site import REDDIT

_CLIENT_ID = "auo7pZGyIVaJhw"
_CLIENT_SECRET = "thAk1F93RSQC2uA_6d0xKYNntD8"
_USER_AGENT = "mentions_crawler:redditpart:madebyevanandryan"

_reddit = praw.Reddit(client_id=_CLIENT_ID,
                      client_secret=_CLIENT_SECRET,
                      user_agent=_USER_AGENT)


def search(user):
    #  get all company names associated with a user
    companies = Company.query.filter_by(mention_user_id=user.get("user_id")).all()
    mentions = []  # initialize mentions as a list
    for company in companies:
        for submission in _reddit.subreddit("all").search(company.name, sort="new", time_filter="month"):
            if submission.is_self:
                mention_count = Mention.query.filter_by(mention_user_id=user.get("user_id"), url=submission.url,
                                                        date=submission.created_utc).count()
                if mention_count == 0:
                    mentions.append(Mention(user.get("user_id"), company.id, REDDIT, submission.url, submission.selftext,
                                            submission.score, submission.created_utc, submission.title))
    return mentions
