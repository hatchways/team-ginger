from flask import Blueprint
from ..authentication.authenticate import authenticate, enforce_json
from ..crawlers import search
from ..models.site import SiteAssociation

mention_bp = Blueprint("mentions", __name__, url_prefix="/")


@mention_bp.route("/mentions")
@authenticate()
def mentions(user):
    sites = SiteAssociation.query.filter_by(mention_user_id=user.get("user_id"))
    for site in sites:
        search(user, site.site_name)
    return "Success!"
