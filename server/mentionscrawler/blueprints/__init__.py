from .user import user_bp
from .session import session_bp
from .reddit import reddit_bp

# array of blueprints to be added to the app
# saves a bit of time on boilerplate code
blueprints = [user_bp, session_bp, reddit_bp]
