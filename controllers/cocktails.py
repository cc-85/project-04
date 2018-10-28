from flask import Blueprint, request, jsonify
from models.Ingredient import Ingredient, IngredientSchema
from models.User import User, UserSchema
from models.Cocktail import Cocktail, CocktailSchema, CocktailIngredient
from models.Ingredient import Ingredient
from lib.secure_route import secure_route
from marshmallow import ValidationError

cocktail_schema = CocktailSchema()
cocktails_schema = CocktailSchema(many=True)

user_schema = UserSchema()
ingredient_schema = IngredientSchema()
ingredients_schema = IngredientSchema(many=True)

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
@secure_route
def create():
    req_data = request.get_json()
    ingredients = req_data['ingredients']
    del req_data['ingredients']

    try:
        data = cocktail_schema.load(req_data)
    except ValidationError as error:
        return jsonify({'error': error.messages}), 422

    cocktail = Cocktail(data)
    cocktail.add_ingredients(ingredients)

    cocktail.save()

    return cocktail_schema.jsonify(cocktail), 201


@api.route('/cocktails/<int:id>', methods=['PUT', 'PATCH'])
@secure_route
def update(id):

    cocktail = Cocktail.query.get(id)

    if not cocktail:
        return jsonify({'message': 'Not found'}), 404

    req_data = request.get_json()
    ingredients = req_data['ingredients']
    del req_data['ingredients']

    try:
        data = cocktail_schema.load(req_data)
    except ValidationError as error:
        return jsonify({'error': error.messages}), 422

    cocktail.remove_ingredients()
    cocktail.add_ingredients(ingredients)

    cocktail.update(data)

    return cocktail_schema.jsonify(cocktail)


@api.route('/cocktails/<int:id>', methods=['DELETE'])
@secure_route
def delete(id):
    cocktail = Cocktail.query.get(id)

    if not cocktail:
        return jsonify({'message': 'Not found'}), 404

    cocktail.delete()
    return '', 204


@api.route('/ingredients', methods=['GET'])
def ingredients_index():
    cocktails = Ingredient.query.all()
    return ingredients_schema.jsonify(cocktails)
