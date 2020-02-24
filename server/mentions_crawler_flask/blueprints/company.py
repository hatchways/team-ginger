from flask import Blueprint, request
from ...json_constants import USER_ID_TAG
from ..models.company import Company
from ..models.mention import Mention
from ..db import insert_rows, delete_rows
from ..responses import ok_response, bad_request_response
from ..authentication.authenticate import authenticate, enforce_json

company_bp = Blueprint("companies", __name__, url_prefix="/")


# TODO reimplement composite key to prevent users from having duplicate companies

# Route for updating company names
@company_bp.route("/companies", methods=["PUT"])
@enforce_json()
@authenticate()
def update_companies(user):
    names = request.get_json()
    if len(names) == 0:
        return bad_request_response("Must have at least one company name")
    old_companies = Company.query.filter_by(mention_user_id=user.get(USER_ID_TAG)).all()
    old_companies_map = {}
    old_mentions = []
    companies = []

    count = 0
    for company in old_companies:
        old_companies_map[company.name] = count
        count = count + 1

    for name in names:
        if name in old_companies_map:  # Spare existing names from deletion
            del old_companies[old_companies_map[name]]
        company_count = Company.query.filter_by(mention_user_id=user.get(USER_ID_TAG), name=name).count()
        if company_count == 0:  # ensure existing names don't try to get inserted
            companies.append(Company(user.get(USER_ID_TAG), name))

    for company in old_companies:  # Line up mentions for execution
        old_mentions = old_mentions + Mention.query.filter_by(mention_user_id=user.get(USER_ID_TAG),
                                                              company=company.id).all()

    result = delete_rows(old_mentions)
    if result is not True:
        return result
    result = delete_rows(old_companies)
    if result is not True:
        return result
    result = insert_rows(companies)
    if result is not True:
        return result
    return ok_response("Company names updated!")
