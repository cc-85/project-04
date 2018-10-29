from app import db, ma, bcrypt
from sqlalchemy.ext.hybrid import hybrid_property
from marshmallow import fields, validates_schema, ValidationError
from .Ingredient import Ingredient


class UserIngredient(db.Model):
    __tablename__ = 'users_ingredients'
    user_id = db.Column(
        db.Integer,
        db.ForeignKey('users.id'),
        primary_key=True
    )
    ingredient_id = db.Column(
        db.Integer,
        db.ForeignKey('ingredients.id'),
        primary_key=True
    )


class User(db.Model):
    """
    User model
    """

    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), nullable=False, unique=True)
    email = db.Column(db.String(128), nullable=False, unique=True)
    _password = db.Column(db.String(128))
    profile_image = db.Column(db.String(128))
    ingredients = db.relationship(
        'Ingredient',
        secondary='users_ingredients'
    )

    @hybrid_property
    def password(self):
        return self._password

    @password.setter
    def password(self, plaintext):
        self._password = bcrypt.generate_password_hash(plaintext).decode('utf-8')

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

    def validate_password(self, plaintext):
        return bcrypt.check_password_hash(self._password, plaintext)

    def add_ingredients(self, ingredients):
        for cocktail_ingredient in ingredients:
            ingredient = Ingredient.query.filter_by(name=cocktail_ingredient['name']).first()
            self.ingredients.append(ingredient)

    def remove_ingredients(self):
        while self.ingredients:
            self.ingredients.pop(0)


class UserSchema(ma.Schema):
    """
    User schema
    """

    username = fields.String(required=True)
    email = fields.Email(required=True)
    # password = fields.String(required=False)
    # password_confirmation = fields.String(required=False)
    ingredients = fields.Nested('IngredientSchema', many=True)

    @validates_schema
    def validate_password(self, data):
        print(self)
        if not data.get('password') and not self._password:
            raise ValidationError(
                'Please provide password'
            )
        elif(data.get('password') != data.get('password_confirmation')):
            raise ValidationError(
                'Passwords do not match',
                'password_confirmation'
            )

    # @validates_schema
    # def validate_username(self, data):
    #     if User.query.filter_by(username=data.get('username')).first() is not None:
    #         raise ValidationError(
    #             'That username is already registered',
    #             'username'
    #         )
    #
    # @validates_schema
    # def validate_email(self, data):
    #     if User.query.filter_by(email=data.get('email')).first() is not None:
    #         raise ValidationError(
    #             'That email is already registered',
    #             'email'
    #         )

    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'email',
            'password',
            'password_confirmation',
            'profile_image',
            'ingredients'
        )
        load_only = ('password', )
