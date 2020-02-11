from flask import (Blueprint, request, session, url_for)
from werkzeug.security import check_password_hash, generate_password_hash
from ..models.user import MentionUser

__all__ = ['user_bp']

user_bp = Blueprint(__name__, __name__, url_prefix='/')

@user_bp.route('/user', methods=['POST'])
def register():
    return "boop"

@user_bp.route('/user', methods=['GET'])
def update():
    return "itworked!"

@user_bp.route('/user', methods=['DELETE'])
def delete():
    