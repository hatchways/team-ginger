from flask import Blueprint, request, current_app
from werkzeug.security import generate_password_hash, check_password_hash
from ..authentication.authenticate import authenticate, enforce_json
from ..crawlers import SECRET_HASH_TAG, MENTIONS_TAG, enqueue
from ..responses import bad_request_response, unauthorized_response, ok_response
from ..models.mention import Mention
from ..models.site import SiteAssociation
from ..models.company import Company
from ..db import insert_rows

job_bp = Blueprint("jobs", __name__, "/mentions")


@job_bp.route("/requests", methods=["POST"])
@enforce_json()
@authenticate()
def requests(user):
    sites = SiteAssociation.query.filter_by(mention_user_id=user.get("user_id"))
    companies = Company.query.filter_by(mention_user_id=user.get("user_id"))
    company_ids = []
    for company in companies:
        company_ids.append(company.id)

    secret_key_hash = generate_password_hash(current_app.config.get("SECRET"))
    for site in sites:
        enqueue(site.site_name, user.get("user_id"), company_ids, secret_key_hash)


@job_bp.route("/responses", methods=["POST"])
@enforce_json()
def responses():
    body = request.get_json()
    if body.get(SECRET_HASH_TAG) and body.get(MENTIONS_TAG):
        if check_password_hash(body.get(SECRET_HASH_TAG), current_app.config.get("SECRET_KEY")):
            mentions = body.get(MENTIONS_TAG)
            db_mentions = []
            for mention in mentions:
                db_mentions.append(Mention(mention.user_id, mention.company_id, mention.site_id,
                                           mention.url, mention.snippet, mention.hits, mention.date, mention.title))
            result = insert_rows(db_mentions)
            if result is not True:
                return result
            return ok_response("Mentions added to database!")
        else:
            return unauthorized_response("Hash did not match!")
    else:
        return bad_request_response("Missing fields!")