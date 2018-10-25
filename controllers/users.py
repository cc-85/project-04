from flask import Blueprint, request, jsonify
from models.User import User, UserSchema
from marshmallow import ValidationError

user_schema = UserSchema()
users_schema = UserSchema(many=True)

api = Blueprint('users', __name__)


@api.route('/users/<int:id>', methods=['GET'])
def show(id):
    user = User.query.get(id)

    if not user:
        return jsonify({'message': 'Not found'}), 404

    return user_schema.jsonify(user)


@api.route('/users/<int:id>', methods=['PUT', 'PATCH'])
# @secure_route
def update(id):

    user = User.query.get(id)

    if not user:
        return jsonify({'message': 'Not found'}), 404

    req_data = request.get_json()
    ingredients = req_data['ingredients']
    del req_data['ingredients']

    try:
        data = user_schema.load(req_data)
    except ValidationError as error:
        return jsonify({'error': error.messages}), 422

    user.remove_ingredients()
    user.add_ingredients(ingredients)

    user.update(data)

    return user_schema.jsonify(user)
