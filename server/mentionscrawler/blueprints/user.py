from flask import (Blueprint, request, session, url_for)
from werkzeug.security import check_password_hash, generate_password_hash
from ..models.user import AddUser

user_bp = Blueprint(__name__, __name__, url_prefix='/')

@user_bp.route('/users', methods=['POST'])
def _register():
    AddUser("chica", "george")
    return "boop"