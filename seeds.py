from app import app, db
from models.Cocktail import Cocktail
# from models.User import User
# from models.Ingredient import Ingredient
# from flask import jsonify
import requests


with app.app_context():
    db.drop_all()
    db.create_all()

    # all_ingredients = requests.get('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list').json()
    # # print(all_ingredients['drinks'])
    #
    # for each_ingredient in all_ingredients['drinks']:
    #     ingredient_name = each_ingredient['strIngredient1'].replace(" ", "_")
    #     print(ingredient_name)
    #     ingredient_name = Ingredient({
    #         'name': each_ingredient['strIngredient1']
    #     })
    #     ingredient_name.save()

    blueberry_smash = Cocktail({
        'name': 'Blueberry Smash',
        'method': 'Fill a glass with ice. Add the blueberry thyme syrup, followed by the Gin, and top with the lemon-lime soda. Stir gently to combine, then garnish with fresh blueberries, thyme sprigs, and a slice of fresh lime. Enjoy responsibly.',
        'image': 'https://i.postimg.cc/j5vBYfj7/Easy-Cocktail-Recipes-Blueberry-Thyme-Smash-7.jpg',
    })
    ingredients = [{"amount": "2 Tbsp", "name": "Blueberry thyme syrup"}, {"amount": "2 oz", "name": "Gin"}, {"amount": "5 oz", "name": "Sprite"}]

    blueberry_smash.add_ingredients(ingredients)

    blueberry_smash.save()

    # TEST SEEDS:
    # all_cocktails = requests.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Egg').json()

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

        i = 1
        while i < 15:
            # print(one_cocktail['drinks'][0]['strIngredient{}'.format(i)])

            if (one_cocktail['drinks'][0]['strIngredient{}'.format(i)] != '' and one_cocktail['drinks'][0]['strIngredient{}'.format(i)] is not None):

                ingr_type = one_cocktail['drinks'][0]['strIngredient{}'.format(i)]
                ingr_amount = one_cocktail['drinks'][0]['strMeasure{}'.format(i)]
                print(ingr_type)
                cocktail_name.add_ingredients([{"amount": ingr_amount, "name": ingr_type}])
            else:
                print('this cocktail has no {}th ingredient'.format(i))

            i += 1

        cocktail_name.save()
