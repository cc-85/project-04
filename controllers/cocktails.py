from flask import Blueprint, request, jsonify
from models.Cocktail import Cocktail, CocktailSchema
# from models.Ingredient import Ingredient, IngredientSchema

cocktail_schema = CocktailSchema()
cocktails_schema = CocktailSchema(many=True)

api = Blueprint('cocktails', __name__)


@api.route('/cocktails', methods=['GET'])
def index():
    cocktails = Cocktail.query.all()
    return cocktails_schema.jsonify(cocktails)


@api.route('/cocktails/<int:id>', methods=['GET'])
def show(id):
    cocktail = Cocktail.query.get(id)

    if not cocktail:
        return jsonify({'message': 'Not found'}), 404

    return cocktail_schema.jsonify(cocktail)


@api.route('/cocktails', methods=['POST'])
# @secure_route
def create():
    req_data = request.get_json()
    data, errors = cocktail_schema.load(req_data)

    if errors:
        return jsonify({'errors': errors}), 422

    cocktail = Cocktail(data)
    cocktail.save()

    return cocktail_schema.jsonify(cocktail), 201


@api.route('/cocktails/<int:id>', methods=['PUT', 'PATCH'])
# @secure_route
def update(id):
    cocktail = Cocktail.query.get(id)

    if not cocktail:
        return jsonify({'message': 'Not found'}), 404

    req_data = request.get_json()
    data, error = cocktail_schema.load(req_data)

    if error:
        return jsonify({'error': error}), 422

    cocktail.update(data)

    return cocktail_schema.jsonify(cocktail)


@api.route('/cocktails/<int:id>', methods=['DELETE'])
# @secure_route
def delete(id):
    cocktail = Cocktail.query.get(id)

    if not cocktail:
        return jsonify({'message': 'Not found'}), 404

    cocktail.delete()
    return '', 204
