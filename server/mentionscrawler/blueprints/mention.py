from flask import Blueprint, jsonify
from ..authentication.authenticate import authenticate, enforce_json
from ..responses import ok_response
from ..crawlers import search
from ..models.site import SiteAssociation
from ..models.mention import Mention

mention_bp = Blueprint("mentions", __name__, url_prefix="/")

ID_TAG = "id"
URL_TAG = "url"
SITE_TAG = "site"
TITLE_TAG = "title"
SNIPPET_TAG = "snippet"
HITS_TAG = "hits"


# gets all sites that are toggled for the user, then calls the appropriate search function for the appropriate api
@mention_bp.route("/mentions", methods=["POST"])
# Remove enforce_json since there was no request body
@authenticate()
def set_mentions(user):
    sites = SiteAssociation.query.filter_by(mention_user_id=user.get("user_id"))
    for site in sites:
        search(user, site.site_name)

    return ok_response("Crawl was successful!")


@mention_bp.route("/mentions", methods=["GET"])
@authenticate()
def mention_response(user):
    mentions = Mention.query.filter_by(mention_user_id=user.get("user_id")).limit(10).all()
    output_mentions = []
    for mention in mentions:
        output_mention = {
                            ID_TAG: mention.id,
                            URL_TAG: mention.url,
                            SITE_TAG: mention.site_id,
                            TITLE_TAG: mention.title,
                            SNIPPET_TAG: mention.snippet,
                            HITS_TAG: mention.hits
                         }
        output_mentions.append(output_mention)
    return jsonify(output_mentions), 200
