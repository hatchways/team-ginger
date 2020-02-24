from . import reddit
from .constants import REDDIT

enqueue_dict = {REDDIT: reddit.enqueue}
# stop_job_dict = {REDDIT: reddit.stop_job}


# def stop_job(site: str, user_id: int):
#     stop_job_dict[site](user_id)


def enqueue(site: str, user_id: int, companies: list, key: str, first_run=True):
    return enqueue_dict[site](user_id, companies, key, first_run)
