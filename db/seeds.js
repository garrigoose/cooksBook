const mongoose = require("./connection");
const Recipe = require("../models/recipeSchema");
const recipeSeeds = require("./seeds.json");
const router = require("../controllers/userController");

// Recipe.deleteMany({})
//   .then(() => {
//     return Recipe.insertMany(recipeSeeds);
//   })
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err))
//   .finally(() => {
//     process.exit();
//   });

Recipe.find({}, (err, recipes) => {
  recipes.forEach((recipe) => {
    let title = recipe.title;
    let lowerTitle = title.toLowerCase();
    let titleArray = lowerTitle.split(" ");
    let tags = recipe.tags;
    let newTags = tags.concat(titleArray);
    Recipe.updateOne(
      { title: `${recipe.title}` },
      { $push: { tags: newTags } }
    );
    console.log(recipe.tags);
  });

  //   recipes.forEach((recipe) => {
  //     let title = recipe.title;
  //     let lowerTitle = title.toLowerCase();
  //     let titleArray = lowerTitle.split(" ");
  //     let tags = recipe.tags;
  //     console.log(recipe.tags);
  //     titleArray.forEach((word) => tags.push(word));
  //     console.log(tags);
  //     recipe.tags = tags;
  //   });
});
