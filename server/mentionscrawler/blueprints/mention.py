from flask import Blueprint, jsonify
from ..authentication.authenticate import authenticate, enforce_json
from ..responses import ok_response, bad_request_response
from ..crawlers import search
from ..models.site import SiteAssociation
from ..models.mention import Mention
from ..db import insert_rows
from sqlalchemy.exc import IntegrityError, DataError

mention_bp = Blueprint("mentions", __name__, url_prefix="/")

URL_TAG = "url"
SITE_TAG = "site"
TITLE_TAG = "title"
SNIPPET_TAG = "snippet"
HITS_TAG = "hits"


# gets all sites that are toggled for the user, then calls the appropriate search function for the appropriate api
@mention_bp.route("/mentions", methods=["POST"])
@authenticate()
def set_mentions(user):
    sites = SiteAssociation.query.filter_by(mention_user_id=user.get("user_id"))
    mentions = []
    for site in sites:
        mentions = mentions + search(user, site.site_name)
    try:
        insert_rows(mentions)
    except IntegrityError as e:
        return bad_request_response("Integrity Error!")
    except DataError as e:
        return bad_request_response("Data Error!")

    return ok_response("Crawl was successful!")


@mention_bp.route("/mentions", methods=["GET"])
@authenticate()
def mention_response(user):
    mentions = Mention.query.filter_by(mention_user_id=user.get("user_id")).limit(10).all()
    output_mentions = []
    for mention in mentions:
        output_mention = {
                            URL_TAG: mention.url,
                            SITE_TAG: mention.site_id,
                            TITLE_TAG: mention.title,
                            SNIPPET_TAG: mention.snippet,
                            HITS_TAG: mention.hits
                         }
        output_mentions.append(output_mention)
    return jsonify(output_mentions), 200
