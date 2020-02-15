from ..db import db

site_association_table = db.Table('association', db.metadata,
                                  db.Column("mention_user_id", db.Integer, db.ForeignKey("mention_user.id")),
                                  db.Column("site_name", db.String(50), db.ForeignKey("site.name"))
                                  )


class SiteAssociation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    mention_user_id = db.Column(db.Integer, db.ForeignKey("mention_user.id"), nullable=False)
    site_name = db.Column(db.String(50), db.ForeignKey("site.name"), nullable=False)

    def __init__(self, mention_user_id: int, site_name: str):
        self.mention_user_id = mention_user_id
        self.site_name = site_name


class Site(db.Model):
    name = db.Column(db.String(50), primary_key=True, unique=True, nullable=False)
