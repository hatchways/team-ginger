from flask import Blueprint, request, json
from ..authentication.authenticate import authenticate, enforce_json
from ...mentions_crawler_apis import enqueue
from ...json_constants import MENTIONS_TAG, USER_ID_TAG, SITE_TAG, SNIPPET_TAG,\
    URL_TAG, HITS_TAG, TITLE_TAG, COMPANY_ID_TAG, DATE_TAG, TOKEN_TAG
from ..responses import bad_request_response, ok_response, error_response
from ..models.mention import Mention
from ..models.site import SiteAssociation, Site
from ..db import insert_rows
from celery.result import AsyncResult
from textblob import TextBlob

job_bp = Blueprint("jobs", __name__, url_prefix="/jobs")

# TODO add a return value to enqueue/stop_job to see if the task was successfully
#      queued so we can return the appropriate response

tasks = {}


def get_tasks_id(site: str, user_id: int):
    return str(user_id)+":"+site


@job_bp.route("/requests/<string:site_name>", methods=["POST"])
@authenticate()
def requests(user, site_name: str):
    sites = Site.query.all()
    user_id = user.get(USER_ID_TAG)
    token = request.cookies.get(TOKEN_TAG)
    print(sites)
    assoc = SiteAssociation.query.filter_by(mention_user_id=user_id, site_name=site_name).first()
    if assoc is None:
        if tasks.get(get_tasks_id(site_name, user_id)) is not None:
            tasks[get_tasks_id(site_name, user_id)].revoke()  # cancel job
            del tasks[get_tasks_id(site_name, user_id)]
        return ok_response("Task successfully cancelled!")

    else:
        result = enqueue(site_name, user_id, token)
        if isinstance(result, AsyncResult):
            tasks[get_tasks_id(site_name, user_id)] = result
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
                mention_count = Mention.query.filter_by(mention_user_id=user_id, url=json_mention[URL_TAG],
                                                        date=json_mention[DATE_TAG]).count()
                if mention_count == 0:
                    sentiment = TextBlob(json_mention[SNIPPET_TAG]).sentiment.polarity
                    db_mentions.append(Mention(user_id, json_mention[COMPANY_ID_TAG], site,
                                               json_mention[URL_TAG], json_mention[SNIPPET_TAG], json_mention[HITS_TAG],
                                               json_mention[DATE_TAG], sentiment, json_mention[TITLE_TAG]))

            result = insert_rows(db_mentions)
            if result is not True:
                return result
            result = enqueue(site, user.get(USER_ID_TAG), request.cookies.get(TOKEN_TAG), False)
            if tasks.get(get_tasks_id(site, user_id)) is not None:
                del tasks[get_tasks_id(site, user_id)]
            if isinstance(result, AsyncResult):
                tasks[get_tasks_id(site, user_id)] = result
                return ok_response("Mentions added to database! And next crawl queued!")
        else:
            return bad_request_response("Missing fields!")
