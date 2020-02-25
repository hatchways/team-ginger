from flask import Blueprint, request, current_app, json
from ..authentication.authenticate import authenticate, enforce_json
from ...mentions_crawler_apis import enqueue
from ...json_constants import SECRET_HASH_TAG, MENTIONS_TAG, USER_ID_TAG, SITE_TAG, SNIPPET_TAG,\
    URL_TAG, HITS_TAG, TITLE_TAG, COMPANY_ID_TAG, DATE_TAG, TOKEN_TAG
from ..responses import bad_request_response, unauthorized_response, ok_response, error_response
from ..models.mention import Mention
from ..models.site import SiteAssociation, Site
from ..authentication.token import generate_token
from ..db import insert_rows

job_bp = Blueprint("jobs", __name__, url_prefix="/jobs")

# TODO add a return value to enqueue/stop_job to see if the task was successfully
#      queued so we can return the appropriate response


@job_bp.route("/requests", methods=["POST"])
@authenticate()
def requests(user):
    sites = Site.query.all()

    token = request.cookies.get(TOKEN_TAG)
    for site in sites:
        assoc = SiteAssociation.query.filter_by(mention_user_id=user.get(USER_ID_TAG), site_name=site.name).first()
        if assoc is None:
            pass
            # stop_job(site.name, user.get("user_id"))
            return "test", 200
        else:
            result = enqueue(site.name, user.get(USER_ID_TAG), token)
            if result is True:
                return ok_response("Task successfully queued up!")
            return error_response("Failed to queue task!", result)


@job_bp.route("/responses", methods=["POST"])
@enforce_json()
@authenticate()
def responses(user):
    body = request.get_json()
    user_id = body.get(USER_ID_TAG)
    site = body.get(SITE_TAG)
    assoc = SiteAssociation.query.filter_by(mention_user_id=user_id, site_name=site).first()
    if assoc is None:
        return bad_request_response("This crawl was disabled while being processed,"
                                    "nothing will be added to the database.")
    else:
        if body.get(MENTIONS_TAG):
            mentions = body.get(MENTIONS_TAG)
            db_mentions = []
            for mention in mentions:
                json_mention = json.loads(mention)
                db_mentions.append(Mention(user_id, json_mention[COMPANY_ID_TAG], site,
                                           json_mention[URL_TAG], json_mention[SNIPPET_TAG], json_mention[HITS_TAG],
                                           json_mention[DATE_TAG], json_mention[TITLE_TAG]))
            result = insert_rows(db_mentions)
            if result is not True:
                return result
            result = enqueue(site, user.get(USER_ID_TAG), request.cookies.get(TOKEN_TAG), False)
            if result is True:
                return ok_response("Mentions added to database! And next crawl queued!")
        else:
            return bad_request_response("Missing fields!")
