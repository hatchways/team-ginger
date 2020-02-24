import json


class Mention:
    user_id: int
    company_id: int
    url: str
    snippet: str
    hits: int
    date: int
    title: str

    def __init__(self, user_id: int, company_id: int, url: str, snippet: str,
                 hits: int, date: int, title: str):
        self.user_id = user_id
        self.company_id = company_id
        self.url = url
        self.snippet = snippet
        self.hits = hits
        self.date = date
        self.title = title

    def __repr__(self):
        return {"user_id": self.user_id, "company_id": self.company_id,
                "url": self.url, "snippet": self.snippet, "hits": self.hits, "date": self.date, "title": self.title}