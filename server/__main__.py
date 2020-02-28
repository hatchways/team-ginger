from flask import Flask, request
from flask_cors import CORS

from server.mentions_crawler_flask.db import db
from server.mentions_crawler_flask.models.site import create_sites
from server.mentions_crawler_flask.responses import error_response
from server.mentions_crawler_flask.blueprints import blueprints
from server.sockets import socketio, connections
import os

app = Flask(__name__, instance_relative_config=True)


@socketio.on("hi")
def hi():
    print("hi!!!!")


@socketio.on("register")
def register(email: str):
    connections[email] = request.sid
    print("Registered: "+email)


@socketio.on("logout")
def disconnect(email: str):
    if connections.get(email) is not None:
        del connections[email]
    print(email+" has disconnected!")


@app.errorhandler(500)
def unknown_error(e):
    return error_response("Something went wrong!", e)


if __name__ == "__main__":
    directory_name = os.path.dirname(__file__)
    configfile = "./config.py"
    config_path = os.path.join(directory_name, configfile)
    app.config.from_pyfile(config_path, silent=False)
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

    socketio.init_app(app)
    socketio.run(app)

