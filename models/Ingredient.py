from app import db, ma
from marshmallow import fields


class Ingredient(db.Model):
    """
    Ingredient model
    """
    __tablename__ = 'ingredients'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False, unique=True)

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


class IngredientSchema(ma.Schema):
    """
    Ingredient schema
    """

    name = fields.String(required=True)

    class Meta:
        model = Ingredient
        fields = (
            'id',
            'name',
        )
