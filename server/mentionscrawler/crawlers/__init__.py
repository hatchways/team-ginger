from . import reddit

REDDIT = "Reddit"
TWITTER = "Twitter"
FACEBOOK = "Facebook"

USER_ID = "user_id"
COMPANY_ID = "company_id"
SITE_ID = "site_id"
URL = "url"
SNIPPET = "snippet"
HITS = "hits"
DATE = "date"
TITLE = "title"

search_dict = {REDDIT: reddit.search}


def search(user, site: str):
    return search_dict[site](user)
