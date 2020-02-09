import json
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from api.ping_handler import ping_handler
from api.home_handler import home_handler


app = Flask(__name__)
# username & password: postgres
# db name: mentionscrawler
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@localhost/mentionscrawler'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(256), nullable=False)
    email = db.Column(db.String(256), unique=True, nullable=False)
    password = db.Column(db.String(256), nullable=False)

    def __init__(self, name, email, password):
        self.name = name
        self.email = email
        self.password = password

    def __repr__(self):
        return "id: {}, name: {}, email: {}".format(self.id, self.name, self.email)


app.register_blueprint(home_handler)
app.register_blueprint(ping_handler)


@app.route('/')
def getAllUsers():
    result = ''
    if len(User.query.all()) != 0:
        for customer in User.query.all():
            result += repr(customer) + '<br>'
    else:
        result = "No users found in database"
    return result


@app.route('/user/add', methods=['POST'])
def addUser():
    if request.method == 'POST':
        body = json.loads(request.get_data())
        if 'name' in body and 'email' in body and 'password' in body:
            try:
                new_user = User(body['name'], body['email'], body['password'])
                db.session.add(new_user)
                db.session.commit()
            except:
                return jsonify({'response': "User not added"}), 400
            return jsonify({'response': "User added"}), 200
        else:
            return jsonify({'response': "Invalid User"}), 400
