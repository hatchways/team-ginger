from ..db import db


class Company(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    mention_user_id = db.Column(db.Integer, db.ForeignKey("mention_user.id"), nullable=False)

    def __init__(self, name: str, mention_user_id: int):
        self.name = name
        self.mention_user_id = mention_user_id

    def __repr__(self):
        return "id: {}, name: {}, mention_user_id: {}".format(self.id, self.name, self.mention_user_id)
