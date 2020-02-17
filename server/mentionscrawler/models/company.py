from ..db import db


class Company(db.Model):
    mention_user_id = db.Column(db.Integer, db.ForeignKey("mention_user.id"), primary_key=True)
    name = db.Column(db.String(50), primary_key=True)

    def __init__(self, mention_user_id: int, name: str):
        self.mention_user_id = mention_user_id
        self.name = name

    def __repr__(self):
        return "mention_user_id: {}, name: {}".format(self.mention_user_id, self.name)
