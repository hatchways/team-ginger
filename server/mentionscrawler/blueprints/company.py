from flask import Blueprint, request, jsonify
from ..models.company import Company
from ..db import insert_row
from ..responses import ok_response
from ..authentication.authenticate import authenticate, enforce_json

company_bp = Blueprint("companies", __name__, url_prefix="/")


# Route for updating company names
@company_bp.route("/companies", methods=["PUT"])
@enforce_json()
@authenticate()
def update_companies(user):
    names = request.get_json()
    Company.query.delete()
    for name in names:
        insert_row(Company(user.get("user_id"), name))
    return ok_response("Company names updated!")

