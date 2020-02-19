from test.test_base import TestBase


class HomeHandlerTest(TestBase):

    def test_welcome(self):
        response = self.api.get('/test')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.json['cheese'],
            'GOUDA!')
