# WDI-Project4
# General Assembly Project 4 : A Full Stack App

## Goal: To create a cocktails app

## Technologies used

* HTML5/CSS/JS
* SASS
* Flask
* Python
* SQLAlchemy
* React
* Heroku
* Bulma

## My Platform - Tippled

### Platform overview
A cocktails app where users can enter ingredients they have to see what they can make.

### Platform Instructions
1. When a user first arrives on to the homepage, they will see a search bar where they can search by individual cocktail names or ingredients. Below this is a list of all the cocktails in the database, organised alphabetically by name. If a user types into the search bar the list of products will automatically update. At the very top of the page is a prompt for the user to sign in or register to access the full benefits of the site.

<img width="1164" alt="screen shot 2018-09-20 at 13 55 10" src="https://user-images.githubusercontent.com/32750083/48950010-b261f400-ef31-11e8-82b0-5b93513f8a2a.png">

2. To create an account, users will need to fill out their name, email and password. Upon typing in their name, a randomly generated avatar image will appear at the top, this profile image can be amended by the user once they are logged in. Once they have registered they will be taken back to the homepage as a logged in user.

![register](https://user-images.githubusercontent.com/32750083/48980317-47462800-f0bf-11e8-8a18-47fc88c2ca05.png)

3. When a user is logged in, they can add or delete ingredients that they own in the 'My ingredients' section at the top of the homepage. The page will automatically update, showing them one tick against cocktails they have most of the ingredients for and three ticks against cocktails they have all of the ingredients for.

![logged-in-homepage](https://user-images.githubusercontent.com/32750083/48980297-0817d700-f0bf-11e8-8b85-f43f0965b536.png)

4. If a user clicks on one of the cocktail listings, they are taken to the cocktail show page, which gives them the full list of ingredients with measurements for that particular cocktail and the method for making the cocktail. It also shows a tick against the ingredients the user has and an empty circle against the ingredients they don't have.

![cocktail-show-page](https://user-images.githubusercontent.com/32750083/48980326-55944400-f0bf-11e8-8adb-6758a574be37.png)

5. A logged in user can edit their information by clicking on the 'Edit profile' link from the homepage. On this page they can edit their name, email address or update their profile image, changing the randomly generated avatar that was assigned to them when they registered.

![edit-profile](https://user-images.githubusercontent.com/32750083/48980415-77da9180-f0c0-11e8-88c3-4d81e1a5f89d.png)

### Process

I worked collaboratively with one other developer for this project. After we found an API we wanted to use to populate our app with cocktail information, our first task was to map out our database so we knew how information would flow in our app. We needed to be very clear on this especially as this was our first time using a SQL database. Once we had completed this, we drew out some wireframes, so that we knew what the main function of each page should be and what each should look like.

We decided to use Trello so that we could stay on top of our tasks. This was very effective as it meant we could clearly label and prioritise each task and divide work between the two of us. It also meant that when one of us finished a piece of work, it would be easy to see what needed to be worked on next.

After we had the starter code in place, I began working on the user model while James began creating a seeds file to pull in data from the API. as this was our first project using Python we experienced quite a lot of difficulties when getting the back end to work properly so for a lot of the back end code we would pair program. I feel this was much more effective that if we'd had to struggle through these problems on our own.

Once the back end code was up an running, we began coding the front end with React. At this point it was easier to work solo as we were more confident using React than we were Python. We split the work so that James would work on the edit account page and login/registration pages and I worked on the cocktail show page and index page as well as the navbar, which changed depending on whether or not a user was logged in.

Another of my main areas of focus on the front end was the search functionality. We wanted the list of cocktails to be sorted alphabetically by cocktail name but in addition to this, I created functionality that, once the user was logged in, would also sort the cocktails by the ratio of ingredients that the user already owned.

Lastly, we styled the app using Bulma and some of our own CSS.

### Challenges
This application was made with Python, and so we had to work with a number of tools we were not yet familiar with, including Flask and SQLAlchemy. While challenging, it was also fascinating to work with Python and to see how it differed from JavaScript. From my perspective, adjusting from a NoSQL to an SQL database was one of the most challenging parts of this project.

### Wins

I think James and I worked very well as a team. Every morning we would go though what work needed to be prioritised that day and how we were going to achieve each part, whether that meant working on things individually or by pair programming. We agreed that it was important to utilise our individual strengths, whilst also giving each other enough time and space to work through difficult patches on our own, if there were particular areas we wanted to practise or improve.

Overall the work for this project took longer than on my previous project, because the difficulties adjusting to Python and a SQL database, but despite this, I'm really happy with what my group achieved.

Aside from my work on the search functionality, I am proud of the avatar API I incorporated into the app, which randomly generates an avatar for the user when they register an account. As well as this, I’m very proud of the the overall look my group achieved after styling the app.

## Future features

I would like to add functionality that enables users to add each other as friends, and view ingredients that friends own (and are willing to share), so that they can then view cocktails that they can make with their combined ingredients.
