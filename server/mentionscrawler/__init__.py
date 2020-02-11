from flask import Flask
from flask_sqlalchemy import SQLAlchemy

def create_app(test_config=None):
    from mentionscrawler.db import db
    from mentionscrawler.user.blueprint import user_bp
    
    app = Flask(__name__, instance_relative_config=True)

    if test_config is None:
        app.config.from_pyfile('config.py', silent=True)
    else:
        app.config.from_mapping(test_config)
    db.init_app(app)
    app.register_blueprint(user_bp)

    
    return app