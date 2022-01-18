# cooksBook

I have built an app called cooksBook. It is a repository of recipes to which registered users may upload recipes, edit existing recipes, and delete recipes as well.

## Approach

The MVP consists of a full CRUD application capable of displaying recipe data, taking in data from a form and saving to a database, selecting recipes from the database individually, and editting and deleting them.

This data manipulation is implemented in a modal-focused design. Instead of a layout rendering pages, the DOM is used to swap visual information.

## Technologies Used

- Frontend - HTML, CSS, JavaScript, Bootstrap
- Dom Manipulation - Vanilla JS and jQuery
- Data-handling - AJAX
- Backend - Mongoose, Express

## Stretch Goals

- Search for recipes based on a keyword which may be available in any text field.
- Allow user auth for edit/upload/delete capabilities.
- Styling done with Bootstrap

## Mongoose models and their properties

| key         | Recipe Model     |
| ----------- | ---------------- |
| title       | String, required |
| Ingredients | String, required |
| Steps       | String           |
| Image       | String           |
| Tags        | String           |
| Link        | String           |

| key      | User Model               |
| -------- | ------------------------ |
| Username | String, required, unique |
| Password | String, required         |

## List of Routes

| Action  | Method | Path                      | Action                                                                      |
| ------- | ------ | ------------------------- | --------------------------------------------------------------------------- |
| index   | GET    | /recipes/all_recipes      | Read information about all recipes                                          |
| index   | GET    | /recipes/search=:criteria | Read information about recipes matching search creiteria                    |
| create  | POST   | /recipes/new              | Create a new recipe                                                         |
| show    | GET    | /recipes/:id              | Read information about one recipes whose ID is :id                          |
| update  | PUT    | /recipes/:id              | Update information of one recipe whose ID is :id with partially new content |
| destroy | DELETE | /recipes/:id              | Delete existing recipe whose ID is :id                                      |
| index   | POST   | /session/register         | Create a new User                                                           |
| create  | POST   | /session/login            | Create a session for an existing user                                       |
| destroy | GET    | /session/delete:id        | Delete an existing session whose ID is :id                                  |

## Wireframes

![landing page](https://media.git.generalassemb.ly/user/38981/files/17d8d180-6358-11ec-9ca0-b67e97aac2eb)
![recipe layout](https://media.git.generalassemb.ly/user/38981/files/18716800-6358-11ec-9471-4a39a2df14f4)
![modal design](https://media.git.generalassemb.ly/user/38981/files/1909fe80-6358-11ec-8068-c5015f037fbf)

Image
