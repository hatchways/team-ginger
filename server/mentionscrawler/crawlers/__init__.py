from . import reddit

REDDIT = "Reddit"
TWITTER = "Twitter"
FACEBOOK = "Facebook"

search_dict = {REDDIT: reddit.search}


class _Mention:
    user_id: int
    company_id: int
    site_id: str
    url: str
    snippet: str
    hits: int
    date: int
    title: str

    def __init__(self, user_id: int, company_id: int, site_id: str, url: str, snippet: str,
                 hits: int, date: int, title: str):
        self.user_id = user_id
        self.company_id = company_id
        self.site_id = site_id
        self.url = url
        self.snippet = snippet
        self.hits = hits
        self.date = date
        self.title = title


def search(user, site: str):
    search_dict[site](user)
