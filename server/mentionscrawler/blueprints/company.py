from flask import Blueprint, request
from ..models.user import Company
from ..db import insert_row, delete_row
from ..authentication.authenticate import authenticate

company_bp = Blueprint("companies", __name__, url_prefix="/")


@company_bp.route("/companies", methods=["POST"])
@authenticate()
def add(user):
    pass


@company_bp.route("/companies", methods=["PUT"])
@authenticate()
def update(user):
    pass


@company_bp.route("/companies", methods=["DELETE"])
@authenticate()
def update(user):
    pass
