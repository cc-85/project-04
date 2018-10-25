from app import app, db
from models.Cocktail import Cocktail, CocktailIngredient
from models.User import User
from models.Ingredient import Ingredient


with app.app_context():
    db.drop_all()
    db.create_all()

    whiskey = Ingredient({
        'name': 'Whiskey'
    })
    whiskey.save()

    gin = Ingredient({
        'name': 'Gin'
    })
    gin.save()

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

    caoimhe.ingredients.append(gin)

    caoimhe.save()


# category = Category(name=item)
# session.add(category)
# If you want to add a restaurant and link it to the category, you can append the category to the Restaurant object:
#
# restaurant = Restaurant(restaurant_id = 'ABC123', price_range = 1)
# restaurant.categories.append(category)
# session.add(restaurant)
# session.commit()
