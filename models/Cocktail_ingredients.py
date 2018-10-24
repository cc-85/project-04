from app import db, ma
from marshmallow import fields
from sqlalchemy import Table, Column
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

cocktails_ingredients_table = Table('association', Base.metadata,
    Column('ingredient_id', db.Integer, db.ForeignKey('ingredient.id')),
    Column('cocktail_id', db.Integer, db.ForeignKey('cocktail.id')),
    Column('amount', db.String(128))
)
