from flask import Blueprint, request, jsonify
from models.Ingredient import Ingredient, IngredientSchema
from models.User import User, UserSchema
from models.Cocktail import Cocktail, CocktailSchema, CocktailIngredient
from models.Ingredient import Ingredient
from marshmallow import ValidationError

cocktail_schema = CocktailSchema()
cocktails_schema = CocktailSchema(many=True)

user_schema = UserSchema()
ingredient_schema = IngredientSchema()

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
    ingredients = req_data['ingredients']
    if 'ingredients' in req_data:
        del req_data['ingredients']

    try:
        data = cocktail_schema.load(req_data)
    except ValidationError as error:
        return jsonify({'error': error.messages}), 422

    # req_data = request.get_json()
    # data, errors = cocktail_schema.load(req_data)
    #
    # if errors:
    #     return jsonify({'errors': errors}), 422
    print(data)
    cocktail = Cocktail(data)

    for cocktail_ingredient in ingredients:
        print(cocktail_ingredient)
        ingredient = Ingredient.query.filter_by(name=cocktail_ingredient['name']).first()
        cocktail.ingredients.append(
            CocktailIngredient(
                ingredient_id=ingredient.id,
                amount=cocktail_ingredient['amount']
            )
        )

    cocktail.save()

    return cocktail_schema.jsonify(cocktail), 201


@api.route('/cocktails/<int:id>', methods=['PUT', 'PATCH'])
# @secure_route
def update(id):

    cocktail = Cocktail.query.get(id)

    if not cocktail:
        return jsonify({'message': 'Not found'}), 404

    # req_data = request.get_json()

    try:
        data = cocktail_schema.load(request.get_json())
    except ValidationError as error:
        return jsonify({'error': error.messages}), 422

    # data, error = cocktail_schema.load(req_data)
    #
    # if error:
    #     return jsonify({'error': error}), 422

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
