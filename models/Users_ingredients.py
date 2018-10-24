from app import db, ma
from marshmallow import fields
from sqlalchemy import Table, Column
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

users_ingredients_table = Table('association', Base.metadata,
    Column('user_id', db.Integer, db.ForeignKey('user.id')),
    Column('ingredient_id', db.Integer, db.ForeignKey('ingredient.id'))
)
