from flask import Blueprint
from ..authentication.authenticate import authenticate, enforce_json

mention_bp = Blueprint("mentions", __name__, url_prefix="/")

@mention_bp.route("/mentions")