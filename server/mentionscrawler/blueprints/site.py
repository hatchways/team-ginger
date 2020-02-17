from flask import Blueprint
from ..authentication.authenticate import authenticate, enforce_json
from ..models.site import SiteAssociation
from ..db import insert_row, delete_row

site_bp = Blueprint("sites", __name__, url_prefix="/settings/")


# Used to toggle whether a service is being crawled
@site_bp.route("/site/<string:site_name>")
@authenticate()
def site(site_name, user):
    assoc = SiteAssociation.query.filter_by(mention_user_id=user.get("user_id"), site_name=site_name).first()
    if assoc is None:
        assoc = SiteAssociation(user.get("user_id"), site_name)
        insert_row(assoc)
    else:
        delete_row(assoc)

    return site_name + " authorized by " + user.get("email")
