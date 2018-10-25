from app import db, ma
from marshmallow import fields, post_dump
from .Ingredient import Ingredient


class CocktailIngredient(db.Model):
    __tablename__ = 'cocktails_ingredients'
    cocktail_id = db.Column(
        db.Integer,
        db.ForeignKey('cocktails.id'),
        primary_key=True
    )
    cocktail = db.relationship('Cocktail')
    ingredient_id = db.Column(
        db.Integer,
        db.ForeignKey('ingredients.id'),
        primary_key=True
    )
    name = db.relationship('Ingredient')
    amount = db.Column(db.String(128))


class CocktailIngredientSchema(ma.Schema):
    amount = fields.String()
    name = fields.Nested('IngredientSchema')

    @post_dump
    def remove_ingredient_key(self, data):
        return {
            'name': data.get('name').get('name'),
            'amount': data.get('amount')
        }

    class Meta:
        model = CocktailIngredient
        fields = (
            'name',
            'amount'
        )


class Cocktail(db.Model):
    """
    Cocktail model
    """
    __tablename__ = 'cocktails'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False, unique=True)
    image = db.Column(db.String(128))
    method = db.Column(db.Text, nullable=False)
    ingredients = db.relationship(
        'CocktailIngredient',
        cascade='all, delete-orphan'
    )

    def __init__(self, data):
        for key, item in data.items():
            setattr(self, key, item)

    def save(self):
        db.session.add(self)
        db.session.commit()

        # remove the Ingredient
        # save the ingredients as Cocktail Ingredient
        # looping over each ingredient and appending

    def update(self, data):
        for key, item in data.items():
            setattr(self, key, item)

        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def add_ingredients(self, ingredients):
        for cocktail_ingredient in ingredients:
            ingredient = Ingredient.query.filter_by(name=cocktail_ingredient['name']).first()
            self.ingredients.append(
                CocktailIngredient(
                    ingredient_id=ingredient.id,
                    amount=cocktail_ingredient['amount']
                )
            )

    def remove_ingredients(self):
        while self.ingredients:
            self.ingredients.pop(0)


class CocktailSchema(ma.Schema):
    """
    Cocktail schema
    """

    name = fields.String(required=True)
    method = fields.String(required=True)
    image = fields.String()
    ingredients = fields.Nested('CocktailIngredientSchema', many=True)

    class Meta:
        model = Cocktail
        fields = (
            'id',
            'name',
            'method',
            'image',
            'ingredients'
        )
        dump_only = ('ingredients', )
