from flask import (Blueprint, request, session, url_for)
from werkzeug.security import check_password_hash, generate_password_hash
from mentionscrawler.db import db

user_bp = Blueprint(__name__, __name__, url_prefix='/user')

@user_bp.route('/')
def hello():
    return "hello"