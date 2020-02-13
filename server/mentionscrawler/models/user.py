from ..db import db


class MentionUser(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(50), unique=True, nullable=False)
    company_name = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(256), nullable=False)

    def __init__(self, email, company_name, password):
        self.email = email
        self.company_name = company_name
        self.password = password

    def __repr__(self):
        return "id: {}, name: {} email: {}".format(self.id, self.company_name, self.email)


def commit_user(new_user: object):
    db.session.add(new_user)
    db.session.commit()