from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def insert_row(row: object):
    db.session.add(row)
    db.session.commit()


def insert_rows(rows: list):
    for row in rows:
        db.session.add(row)
    db.session.commit()


def delete_row(row: object):
    db.session.delete(row)
    db.session.commit()
