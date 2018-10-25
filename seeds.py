from app import app, db
from models.Cocktail import Cocktail, CocktailIngredient
from models.User import User
from models.Ingredient import Ingredient
from flask import jsonify
import requests
import re


with app.app_context():
    db.drop_all()
    db.create_all()

    response = requests.get('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=13427').json()
    print(response['drinks'][0]['strDrink'])

    mojito = Cocktail({
        'name': response['drinks'][0]['strDrink'],
        'method': response['drinks'][0]['strInstructions'],
        'image': response['drinks'][0]['strDrinkThumb'],
    })
    mojito.save()

    all_ingredients = requests.get('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list').json()
    # print(all_ingredients['drinks'])

    def convert_to_snake(name):
        s1 = re.sub('(.)([A-Z][a-z]+)', r'\1_\2', name)
        return re.sub('([a-z0-9])([A-Z])', r'\1_\2', s1).lower()

    for each_ingredient in all_ingredients['drinks']:
        ingredient_name = convert_to_snake(each_ingredient['strIngredient1'])
        # ingredient_name = (ingredient_name[:20]) if len(ingredient_name) > 20 else ingredient_name
        print(each_ingredient['strIngredient1'])
        print(ingredient_name)
        ingredient_name = Ingredient({
            'name': each_ingredient['strIngredient1']
        })
        ingredient_name.save()

    # whiskey = Ingredient({
    #     'name': 'Whiskey'
    # })
    # whiskey.save()
    #
    # gin = Ingredient({
    #     'name': 'Gin'
    # })
    # gin.save()

    old_fashioned = Cocktail({
        'name': 'Old Fashioned',
        'method': 'Place sugar cube in old fashioned glass and saturate with bitters, add a dash of plain water. Muddle until dissolved.\r\nFill the glass with ice cubes and add whiskey.\r\n\r\nGarnish with orange twist, and a cocktail cherry.',
        'image': 'https://www.thecocktaildb.com/images/media/drink/vrwquq1478252802.jpg',
    })

    old_fashioned.ingredients.append(
        CocktailIngredient(
            ingredient_id=whiskey.id,
            amount='lots'
        )
    )

    old_fashioned.save()


    mojito = Cocktail({
        'name': 'mojito',
        'method': 'Muddle mint leaves with sugar and lime juice. Add a splash of soda water and fill the glass with cracked ice. Pour the rum and top with soda water. Garnish and serve with straw.',
        'image': 'https://www.thecocktaildb.com/images/media/drink/rxtqps1478251029.jpg',
    })

    mojito.ingredients.append(
        CocktailIngredient(
            ingredient_id=gin.id,
            amount='lots'
        )
    )
    mojito.ingredients.append(
        CocktailIngredient(
            ingredient_id=whiskey.id,
            amount='a dash'
        )
    )

    mojito.save()

    print('Database successfully seeded, cheers!')

    caoimhe = User({
        'username': 'CC-85',
        'email': 'CC-85@gmail.com',
        'password': 'pass',
        'password_confirmation': 'pass'
    })

    caoimhe.user_ingredients.append(gin)

    caoimhe.save()


# category = Category(name=item)
# session.add(category)
# If you want to add a restaurant and link it to the category, you can append the category to the Restaurant object:
#
# restaurant = Restaurant(restaurant_id = 'ABC123', price_range = 1)
# restaurant.categories.append(category)
# session.add(restaurant)
# session.commit()
