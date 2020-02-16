from flask import Blueprint, request
from ..models.user import Company
from ..db import insert_row, delete_row
from ..responses import bad_request_response, EXPECTED_JSON
from ..authentication.authenticate import authenticate, enforce_json

company_bp = Blueprint("companies", __name__, url_prefix="/")


@company_bp.route("/companies", methods=["POST"])
@enforce_json()
@authenticate()
def add(user):
    return "SUCCESS!"


@company_bp.route("/companies", methods=["PUT"])
@authenticate()
def update(user):
    return "cheeseburger"


@company_bp.route("/companies", methods=["DELETE"])
@authenticate()
def delete(user):
    return "cheeseburger"
