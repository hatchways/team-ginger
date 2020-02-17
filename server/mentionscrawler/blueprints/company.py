from flask import Blueprint, request, jsonify
from ..models.company import Company
from ..db import insert_rows
from ..responses import ok_response, bad_request_response
from ..authentication.authenticate import authenticate, enforce_json

company_bp = Blueprint("companies", __name__, url_prefix="/")


# Route for updating company names
@company_bp.route("/companies", methods=["PUT"])
@enforce_json()
@authenticate()
def update_companies(user):
    names = request.get_json()
    if len(names) == 0:
        return bad_request_response("Must have at least one company name")
    Company.query.filter_by(mention_user_id = user.get("user_id")).delete()
    companies = []
    for name in names:
        companies.append(Company(user.get("user_id"), name))
    insert_rows(companies)
    return ok_response("Company names updated!")

