cooksBook
I have built an app called cooksBook. It is a repository of recipes to which registered users may upload recipes, edit existing recipes, and delete recipes as well.

MVP
The MVP consists of a full CRUD application capable of displaying recipe data, taking in data from a form and saving to a database, selecting recipes from the database individually, and editting and deleting them.

Stretch Goals

- Search for recipes based on a keyword which may be available in any text field.
- Allow user auth for edit/upload/delete capabilities.
- Styling done with Bootstrap

Front-end
Most of the front-end manipulation is done with Vanilla JS with a few jQuery commands for bootstrap specific designs. Said design is majority done with the Bootstrap CDN.

List of Mongoose models and their properties
| key | Recipe Model |
|-----|----------------------|
|title| String, required |
|Ingredients|String, required|
|Steps| String |
|Image| String |
|Tags | String |
|Link | String |

| key      | User Model               |
| -------- | ------------------------ |
| Username | String, required, unique |
| Password | String, required         |

|Username
User:
name: String,
password: String,

List of Routes
CRUD for Tweet:

Action Method Path Action
index GET /tweets Read information about all tweets
create POST /tweets Create a new engineer
show GET /tweets/:id Read information about the tweet whose ID is :id
update PUT /tweets/:id Update the existing tweet whose ID is :id with all new content
update PATCH /tweets/:id Update the existing tweet whose ID is :id with partially new content
destroy DELETE /tweets/:id Delete the existing tweet whose ID is :id
User stories
As a User I should be able to log in
As a User I should be able to link my account to Twitter
As a User I should be able to template post I wish to potentially publish
As a User I should be able to pick a template and choose a time I want my app to post it
As a User I should have full CRUD on my template post.
As a User I should be able to cancel Tweets that have not been sent yet

Wireframes
Image
