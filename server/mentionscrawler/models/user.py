from ..db import db


class MentionUser(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(50), unique=True, nullable=False)
    company_names = db.relationship(
        "Company", backref="mention_user", lazy=True)
    password = db.Column(db.String(256), nullable=False)

    def __init__(self, email: str, password: str):
        self.email = email
        self.password = password

    def __repr__(self):
        return "id: {}, email: {}".format(self.id, self.email)


class Company(db.Model):
    mention_user_id = db.Column(db.Integer, db.ForeignKey(
        "mention_user.id"), primary_key=True)
    name = db.Column(db.String(50), primary_key=True)

    def __init__(self, mention_user_id: int, name: str):
        self.mention_user_id = mention_user_id
        self.name = name

    def __repr__(self):
        return "mention_user_id: {}, name: {}".format(self.mention_user_id, self.name)
