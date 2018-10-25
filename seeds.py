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

    # response = requests.get('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=13427').json()
    # print(response['drinks'][0]['strDrink'])
    #
    # mojito = Cocktail({
    #     'name': response['drinks'][0]['strDrink'],
    #     'method': response['drinks'][0]['strInstructions'],
    #     'image': response['drinks'][0]['strDrinkThumb'],
    # })
    # mojito.save()

    all_ingredients = requests.get('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list').json()
    # print(all_ingredients['drinks'])

    for each_ingredient in all_ingredients['drinks']:
        ingredient_name = each_ingredient['strIngredient1'].replace(" ", "_")
        print(ingredient_name)
        ingredient_name = Ingredient({
            'name': each_ingredient['strIngredient1']
        })
        ingredient_name.save()

    # old_fashioned = Cocktail({
    #     'name': 'Old Fashioned',
    #     'method': 'Place sugar cube in old fashioned glass and saturate with bitters, add a dash of plain water. Muddle until dissolved.\r\nFill the glass with ice cubes and add whiskey.\r\n\r\nGarnish with orange twist, and a cocktail cherry.',
    #     'image': 'https://www.thecocktaildb.com/images/media/drink/vrwquq1478252802.jpg',
    # })
    # ingredients = [{"amount": "a dash", "name": "Whiskey"}, {"amount": "lots of", "name": "Gin"}]
    #
    # old_fashioned.add_ingredients(ingredients)
    #
    # old_fashioned.save()

    all_cocktails = requests.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic').json()
    # print(all_cocktails['drinks'])

    for each_cocktail in all_cocktails['drinks']:
        print(each_cocktail['strDrink'] + ' ' + each_cocktail['idDrink'])

        one_cocktail = requests.get(
            'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i={}'.format(each_cocktail['idDrink'])
        ).json()
        cocktail_name = each_cocktail['strDrink'].replace(" ", "_")

        cocktail_name = Cocktail({
            'name': one_cocktail['drinks'][0]['strDrink'],
            'method': one_cocktail['drinks'][0]['strInstructions'],
            'image': one_cocktail['drinks'][0]['strDrinkThumb'],
        })
        cocktail_name.save()
        #     'name': each_ingredient['strIngredient1']
        # })
        # ingredient_name.save()

    # response = requests.get('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=13427').json()
    # print(response['drinks'][0]['strDrink'])
    #
    # mojito = Cocktail({
    #     'name': response['drinks'][0]['strDrink'],
    #     'method': response['drinks'][0]['strInstructions'],
    #     'image': response['drinks'][0]['strDrinkThumb'],
    # })
    # mojito.save()

    # print('Database successfully seeded, cheers!')
    #
    # caoimhe = User({
    #     'username': 'CC-85',
    #     'email': 'CC-85@gmail.com',
    #     'password': 'pass',
    #     'password_confirmation': 'pass'
    # })
    #
    # caoimhe.user_ingredients.append(gin)
    #
    # caoimhe.save()


# category = Category(name=item)
# session.add(category)
# If you want to add a restaurant and link it to the category, you can append the category to the Restaurant object:
#
# restaurant = Restaurant(restaurant_id = 'ABC123', price_range = 1)
# restaurant.categories.append(category)
# session.add(restaurant)
# session.commit()
