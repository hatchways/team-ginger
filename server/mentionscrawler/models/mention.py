from ..db import db


class Mention(db.model):
    id = db.Column(db.Integer, primary_key=True)
    mention_user_id = db.Column(db.Integer, db.ForeignKey("mention_user.id"), nullable=False)
    site_id = db.Column(db.String(50), db.ForeignKey("site.name"), nullable=False)
    url = db.Columndb(db.String(128), nullable=False)

    def __init__(self, mention_user_id: int, site_id: str, url: str):
        self.mention_user_id = mention_user_id
        self.site_id = site_id
        self.url = url
