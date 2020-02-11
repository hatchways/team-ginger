from flask_sqlalchemy import SQLAlchemy
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
        
    @staticmethod
    def newUser(_email, _company_name, _password):
        new_user = MentionUser(email=_email, company_name=_company_name, password=_password)
        db.session.add(new_user)
        db.session.commit()