from . import reddit
from ..models.site import REDDIT, FACEBOOK, TWITTER

search_dict = {REDDIT: reddit.search}


def search(user, site: str):
    search_dict[site](user)
