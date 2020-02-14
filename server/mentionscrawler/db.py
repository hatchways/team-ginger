from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def insert_row(row: object):
    db.session.add(row)
    db.session.commit()
