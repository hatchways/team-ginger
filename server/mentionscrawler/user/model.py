from flask_sqlalchemy import SQLAlchemy
from mentionscrawler.db import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(256), nullable=False)

    def __init__(self, email, password):
        self.email = email
        self.password = password

    def __repr__(self):
        return "id: {}, email: {}".format(self.id, self.email)