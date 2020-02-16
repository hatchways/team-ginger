def create_app():
    from flask import Flask
    from flask_cors import CORS

    from .db import db
    from .models.site import create_sites
    from .blueprints import blueprints
    
    app = Flask(__name__, instance_relative_config=True)
    app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql+psycopg2:///mentionscrawler"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["SECRET_KEY"] = "nOtSoSeCrEtKeY!!!"
    CORS(app)
    db.init_app(app)

    # creates any tables that aren't in the database, won't update existing tables if the model changes
    # will populate sites table if it isn't already populated
    with app.app_context():
        db.create_all()
        create_sites()

    # will register all blueprints
    for blueprint in blueprints:
        app.register_blueprint(blueprint)
        
    return app
