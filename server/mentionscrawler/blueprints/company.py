from flask import Blueprint, request
from ..models.company import Company
from ..db import insert_row
from ..responses import bad_request_response, ok_response
from ..authentication.authenticate import authenticate, enforce_json

company_bp = Blueprint("companies", __name__, url_prefix="/")


# Route for updating company names
@company_bp.route("/companies", methods=["PUT"])
@enforce_json()
@authenticate()
def company(user):
    body = request.get_json()
    if body.get("names"):
        names = body.get("names")
        Company.query.delete()
        for name in names:
            insert_row(Company(user.get("user_id"), name))
        return ok_response("Company names updated!")
    return bad_request_response("Invalid request! Missing fields!")
