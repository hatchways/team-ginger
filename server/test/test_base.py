
import unittest
from ..mentionscrawler import create_app

app = create_app()


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
