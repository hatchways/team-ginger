import praw
from . import REDDIT, SITE_ID, USER_ID, COMPANY_ID, TITLE, DATE, HITS, SNIPPET, URL

_CLIENT_ID = "auo7pZGyIVaJhw"
_CLIENT_SECRET = "thAk1F93RSQC2uA_6d0xKYNntD8"
_USER_AGENT = "mentions_crawler:redditpart:madebyevanandryan"

_reddit = praw.Reddit(client_id=_CLIENT_ID,
                      client_secret=_CLIENT_SECRET,
                      user_agent=_USER_AGENT)

# TODO Remove all database references
# TODO search needs to start no later than the latest mention
# TODO pass list of company names and list of most recent mention of said company


def search(user_id, companies: list, first_run: bool):
    #  get all company names associated with a user
    mentions = []  # initialize mentions as a list
    for company in companies:
        if first_run:
            submissions = _reddit.subreddit("all").search(company.name, sort="new", time_filter="month")
        else:
            submissions = _reddit.subreddit("all").search(company.name, sort="new", time_filter="hour")
        for submission in submissions:
            if submission.is_self:
                mention = {USER_ID: user_id, COMPANY_ID: company.id, SITE_ID: REDDIT, URL: submission.url,
                           SNIPPET: submission.selftext, HITS: submission.score, DATE: submission.created_utc,
                           TITLE: submission.title}
                mentions.append(mention)
    return mentions
