from flask import Blueprint, request
from ..models.company import Company
from ..models.mention import Mention
from ..db import insert_rows, delete_rows
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
    old_companies = Company.query.filter_by(mention_user_id=user.get("user_id")).all()
    old_mentions = []
    companies = []
    for company in old_companies:
        old_mentions = Mention.query.filter_by(mention_user_id=user.get("user_id"), company_name=company.name).all()
    for name in names:
        companies.append(Company(user.get("user_id"), name))
    delete_rows(old_mentions)
    delete_rows(old_companies)
    insert_rows(companies)
    return ok_response("Company names updated!")

