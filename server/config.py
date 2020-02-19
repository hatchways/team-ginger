import os
TEAM_NAME = os.environ['TEAM_NAME']
SQLALCHEMY_DATABASE_URI = "postgresql+psycopg2:///mentionscrawler"
SQLALCHEMY_TRACK_MODIFICATIONS = False
SECRET_KEY = "nOtSoSeCrEtKeY!!!"