from app import db, ma
from marshmallow import fields


class Cocktail(db.Model):
    """
    Cocktail model
    """
    __tablename__ = 'cocktails'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False, unique=True)
    image = db.Column(db.String(128))
    method = db.Column(db.Text, nullable=False)
    cocktail_ingredients = db.relationship('Ingredient', secondary='cocktails_ingredients_table')

    def __init__(self, data):
        for key, item in data.items():
            setattr(self, key, item)

    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self, data):
        for key, item in data.items():
            setattr(self, key, item)

        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()


class CocktailSchema(ma.Schema):
    """
    Cocktail schema
    """

    name = fields.String(required=True)
    method = fields.String(required=True)
    image = fields.String
    cocktail_ingredients = fields.Nested('IngredientSchema', many=True)

    class Meta:
        model = Cocktail
        fields = (
            'id',
            'name',
            'method',
            'image',
            'cocktail_ingredients'
        )
