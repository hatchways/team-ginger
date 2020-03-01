from flask import Blueprint, request
from ...json_constants import USER_ID_TAG, COMPANY_ID_TAG, COMPANY_NAME_TAG, COMPANIES_TAG
from ..models.company import Company
from ..models.mention import Mention
from ..db import insert_rows, delete_rows
from ..responses import ok_response, bad_request_response, data_response
from ..authentication.authenticate import authenticate, enforce_json

company_bp = Blueprint("companies", __name__, url_prefix="/")


# TODO update workers to crawl for updated names
# TODO reimplement composite key to prevent users from having duplicate companies

# Route for updating company names
@company_bp.route("/companies", methods=["PUT"])
@enforce_json()
@authenticate()
def update_companies(user):
    body = request.get_json()
    if not body.get(COMPANIES_TAG):
        return bad_request_response("Invalid fields")
    names = body.get(COMPANIES_TAG) 
    uid = user.get(USER_ID_TAG)  
    if len(names) == 0:
        return bad_request_response("Must have at least one company name")
    old_companies = Company.query.filter_by(mention_user_id=uid).all()
    
    old_names = []
    scraped_companies = []
    new_companies = []
    old_mentions = []

    for company in old_companies:
        if company.name not in names:
            scraped_companies.append(company)
            old_mentions.extend(Mention.query.filter_by(mention_user_id=uid, company=company.id).all())
        old_names.append(company.name)
    for name in names:
        if name not in old_names:
            new_companies.append(Company(uid, name))

    result = delete_rows(old_mentions)
    if result is not True:
        return result
    result = delete_rows(scraped_companies)
    if result is not True:
        return result
    result = insert_rows(new_companies)
    if result is not True:
        return result
    return ok_response("Company names updated!")


@company_bp.route("/companies", methods=["GET"])
@authenticate()
def get_companies(user):
    companies = Company.query.filter_by(mention_user_id=user.get(USER_ID_TAG))
    company_dicts = []
    for company in companies:
        company_dicts.append({COMPANY_ID_TAG: company.id, COMPANY_NAME_TAG: company.name})

    return data_response({COMPANIES_TAG: company_dicts})
