from ..db import db

REDDIT = "Reddit"
FACEBOOK = "Facebook"
TWITTER = "Twitter"


# Used to associate users with the sites they have toggled
class SiteAssociation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    mention_user_id = db.Column(db.Integer, db.ForeignKey("mention_user.id"), nullable=False)
    site_name = db.Column(db.String(50), db.ForeignKey("site.name"), nullable=False)

    def __init__(self, mention_user_id: int, site_name: str):
        self.mention_user_id = mention_user_id
        self.site_name = site_name


# represents the sites we can crawl
class Site(db.Model):
    name = db.Column(db.String(50), primary_key=True, unique=True, nullable=False)
    
    def __init__(self, name: str):
        self.name = name


# if the sites table is empty it gets populated
def create_sites():
    sites = Site.query.all()
    if len(sites) == 0:
        db.session.add(Site(REDDIT))
        db.session.add(Site(FACEBOOK))
        db.session.add(Site(TWITTER))
        db.session.commit()

