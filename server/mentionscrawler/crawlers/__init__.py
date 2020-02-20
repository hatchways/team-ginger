from . import reddit

REDDIT = "Reddit"
TWITTER = "Twitter"
FACEBOOK = "Facebook"
MENTIONS_TAG = "mentions"
SECRET_HASH_TAG = "secret_hash"
RESPONSE_URL = "/mentions/responses"
SCHEDULE_TIME = 1  # time between crawls in minutes

enqueue_dict = {REDDIT: reddit.enqueue}
stop_job_dict = {REDDIT: reddit.stop_job}


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

    def __repr__(self):
        return {"user_id": self.user_id, "company_id": self.company_id, "site_id": self.site_id,
                "url": self.url, "snippet": self.snippet, "hits": self.hits, "date": self.date, "title": self.title}


def stop_job(site: str, user_id: int):
    stop_job_dict[site](user_id)


def enqueue(site: str, user_id: int, companies: list, key: str):
    enqueue_dict[site](user_id, companies, key)
