from flask import Blueprint, request, current_app, json
from werkzeug.security import generate_password_hash, check_password_hash
from ..authentication.authenticate import authenticate, enforce_json
from server.mentions_crawler_apis import enqueue
from server.mentions_crawler_apis.constants import SECRET_HASH_TAG, MENTIONS_TAG
from ..responses import bad_request_response, unauthorized_response, ok_response, error_response
from ..models.mention import Mention
from ..models.site import SiteAssociation, Site
from ..models.company import Company
from ..db import insert_rows

job_bp = Blueprint("jobs", __name__, url_prefix="/jobs")

# TODO add a return value to enqueue/stop_job to see if the task was successfully
#      queued so we can return the appropriate response


@job_bp.route("/requests", methods=["POST"])
@authenticate()
def requests(user):
    sites = Site.query.all()
    companies = Company.query.filter_by(mention_user_id=user.get("user_id"))
    company_dicts = []
    for company in companies:
        company_dicts.append({"company_id": company.id, "company_name": company.name})

    secret_key_hash = generate_password_hash(current_app.config.get("SECRET_KEY"))
    for site in sites:
        assoc = SiteAssociation.query.filter_by(mention_user_id=user.get("user_id"), site_name=site.name).first()
        if assoc is None:
            pass
            # stop_job(site.name, user.get("user_id"))
            return "test", 200
        else:
            result = enqueue(site.name, user.get("user_id"), company_dicts, secret_key_hash)
            if result is True:
                return ok_response("Task successfully queued up!")
            return error_response("Failed to queue task!", result)


@job_bp.route("/responses", methods=["POST"])
@enforce_json()
def responses():
    body = request.get_json()
    assoc = SiteAssociation.query.filter_by(mention_user_id=user.get("user_id"), site_name=site.name).first()
    if body.get(SECRET_HASH_TAG) and body.get(MENTIONS_TAG):
        if check_password_hash(body.get(SECRET_HASH_TAG), current_app.config.get("SECRET_KEY")):
            mentions = body.get(MENTIONS_TAG)
            db_mentions = []
            for mention in mentions:
                json_mention = json.loads(mention)
                db_mentions.append(Mention(json_mention["user_id"], json_mention["company_id"], json_mention["site_id"],
                                           json_mention["url"], json_mention["snippet"], json_mention["hits"],
                                           json_mention["date"], json_mention["title"]))
            result = insert_rows(db_mentions)
            if result is not True:
                return result

            return ok_response("Mentions added to database!")
        else:
            return unauthorized_response("Hash did not match!")
    else:
        return bad_request_response("Missing fields!")
