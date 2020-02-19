from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import IntegrityError, DataError
from psycopg2.errorcodes import (UNIQUE_VIOLATION, FOREIGN_KEY_VIOLATION, STRING_DATA_RIGHT_TRUNCATION,
                                 NUMERIC_VALUE_OUT_OF_RANGE)
from functools import wraps
from .responses import ok_response, bad_request_response

db = SQLAlchemy()

# All functions here must be called somewhere with app context


def catch_db_errors():
    def wrap(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            try:
                return fn(*args, **kwargs)
            except DataError as e:
                if e.orig.pgcode == STRING_DATA_RIGHT_TRUNCATION:
                    return bad_request_response({"STRING_DATA_RIGHT_TRUNCATION!": e.detail})
                elif e.orig.pgcode == NUMERIC_VALUE_OUT_OF_RANGE:
                    return bad_request_response({"NUMERIC_VALUE_OUT_OF_RANGE": e.detail})
            except IntegrityError as e:
                if e.orig.pgcode == UNIQUE_VIOLATION:
                    return bad_request_response({"UNIQUE_VIOLATION": e.detail})
                elif e.orig.pgcode == FOREIGN_KEY_VIOLATION:
                    return bad_request_response({"FOREIGN_KEY_VIOLATION": e.detail})
        return wrapper()
    return wrap


# just commits whatever is in the session
def commit():
    db.session.commit()


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


def delete_rows(rows: list):
    for row in rows:
        db.session.delete(row)
    db.session.commit()
