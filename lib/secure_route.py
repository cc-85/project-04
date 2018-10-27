import jwt
from functools import wraps
from flask import request, jsonify, g
from models.User import User
from config.environment import secret


def secure_route(func):
    """
    Secure route decorator
    """
    @wraps(func)
    def decorated_secure_route(*args, **kwargs):
        if 'Authorization' not in request.headers:
            return jsonify({'message': 'Unauthorized'}), 401

        token = request.headers.get('Authorization').replace('Bearer ', '')
        payload = jwt.decode(token, secret)
        user = User.query.get(payload.get('sub'))

        if not user:
            return jsonify({'message': 'Unauthorized'}), 401

        g.current_user = user

        return func(*args, **kwargs)

    return decorated_secure_route
