import pytest
from ..mentions_crawler_flask import create_app
from ..mentions_crawler_flask.db import db


@pytest.fixture
def client():
    app = create_app(True)
    app.config["TESTING"] = True
    app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql+psycopg2:///testdb"
    with app.test_client() as client:
        yield client


def signup(client, username, password, company):
    return client.post('/login', data=dict(
        email=username,
        password=password,
        name=company
    ), follow_redirects=True)


def login(client, username, password):
    return client.post('/login', data=dict(
        email=username,
        password=password
    ), follow_redirects=True)


def test_cheese(client):
    rv = client.get("/signup")
    print(rv.data)
    assert b'GOUDA!' in rv.data


'''
class TestBase(unittest.TestCase):

    # executed prior to each test
    def setUp(self):
        app.testing = True
        self.api = app.test_client()

    # executed after each test
    def tearDown(self):
        pass

    if __name__ == "__main__":
        unittest.main()
'''