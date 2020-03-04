from ..db import db
# TODO Add date field


class Mention(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    mention_user_id = db.Column(db.Integer, db.ForeignKey("mention_user.id"), nullable=False, index=True)
    site_id = db.Column(db.String(50), db.ForeignKey("site.name"), nullable=False)
    company = db.Column(db.Integer, db.ForeignKey("company.id"), nullable=False)
    url = db.Column(db.Text, nullable=False)
    # Not every mention will have an article title, such as facebook or twitter, I think?
    title = db.Column(db.Text, nullable=False)
    snippet = db.Column(db.Text, nullable=False)
    hits = db.Column(db.Integer, nullable=False)
    # using integer for now because the reddit api returns things in unix time
    date = db.Column(db.Integer, nullable=False)
    sentiment = db.Column(db.Float, nullable=False)

    def email_json(self):
        return {"company_id": self.company_id,
                "url": self.url, "snippet": self.snippet, "hits": self.hits, "title": self.title}

    def __init__(self, mention_user_id: int, company: int, site_id: str, url: str, snippet: str,
                 hits: int, date: int, sentiment: float, title: str = ""):
        self.mention_user_id = mention_user_id
        self.company = company
        self.site_id = site_id
        self.url = url
        self.snippet = snippet
        self.hits = hits
        self.sentiment = sentiment
        self.title = title
        self.date = date
