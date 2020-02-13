import jwt

_ISSUER = "Evan & Ryan"


def generate_token(secret: str, email: str):
    token = jwt.encode({"iss": _ISSUER, "email": email}, secret, algorithm="HS256")
    return token.decode("utf-8")  # need to turn it into a utf-8 encoding or jsonify yells at you


def decode_token(secret: str, token: str):
    return jwt.decode(token, secret, algorithm="HS256")
