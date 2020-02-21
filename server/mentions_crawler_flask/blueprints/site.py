from flask import Blueprint
from ..authentication.authenticate import authenticate
from ..models.site import SiteAssociation
from ..db import insert_row, delete_row
from sqlalchemy.exc import IntegrityError
from psycopg2.errorcodes import (FOREIGN_KEY_VIOLATION)
from ..responses import ok_response, bad_request_response

site_bp = Blueprint("sites", __name__, url_prefix="/settings/")


# Used to toggle whether a service is being crawled
@site_bp.route("/site/<string:site_name>", methods=["POST"])
@authenticate()
def site(site_name, user):
    assoc = SiteAssociation.query.filter_by(mention_user_id=user.get("user_id"), site_name=site_name).first()
    if assoc is None:
        assoc = SiteAssociation(user.get("user_id"), site_name)
        result = insert_row(assoc)
        if result is not True:
            return result
    else:
        result = delete_row(assoc)
        if result is not True:
            return result

    return ok_response(site_name + " authorized by " + user.get("email"))
