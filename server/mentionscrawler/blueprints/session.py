from flask import Blueprint, request, jsonify
from werkzeug.security import check_password_hash
from ..models.user import MentionUser
from ..models.company import Company
from ..models.site import SiteAssociation, Site
from ..responses import token_response, bad_request_response, logout_response, TOKEN_TAG
from ..authentication.authenticate import enforce_json

session_bp = Blueprint("session", __name__, url_prefix="/")


@session_bp.route("/login", methods=["POST"])
@enforce_json()
def login():
    body = request.get_json()
    if body.get("email") and body.get("password"):
        user = MentionUser.query.filter_by(email=body.get("email")).first()
        if user is not None:
            if check_password_hash(user.password, body.get("password")):

                companies = Company.query.filter_by(mention_user_id=user.id).all()
                company_names = []
                for company in companies:
                    company_names.append(company.name)
                sites = Site.query.all()
                sites_output = {}

                # Build dictionary of all sites we support
                for site in sites:
                    sites_output[site.name] = False
                site_associations = SiteAssociation.query.filter_by(mention_user_id=user.id).all()

                # Set the sites associated with the user to true
                for site_association in site_associations:
                    sites_output[site_association.site_name] = True
                return token_response("Successfully validated "+body.get("email"),
                                      user.email, company_names, user.id, sites_output)
        return bad_request_response("Either email or password was incorrect!")


@session_bp.route("/logout", methods=["POST"])
def logout():
    if request.cookies.get(TOKEN_TAG) is None:
        return bad_request_response("No one is logged in!")
    return logout_response("Successfully logged out!")
