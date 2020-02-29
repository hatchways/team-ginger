from flask_socketio import SocketIO

socketio = SocketIO(cors_allowed_origins="*")
connections = {}
connections_by_sid = {}
