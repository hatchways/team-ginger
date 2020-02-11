from flask_sqlalchemy import SQLAlchemy
from ..db import db

class MentionUser(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(256), nullable=False)
    dummydata = db.Column(db.String(1))
    def __init__(self, email, password, dummydata):
        self.email = email
        self.password = password
        self.dummydata = dummydata

    def __repr__(self):
        return "id: {}, email: {}".format(self.id, self.email)


def AddUser(_email, _password):
    new_user = MentionUser(email=_email, password=_password, dummydata="a")
    db.session.add(new_user)
    db.session.commit()