const mongoose = require("./connection");
const Recipe = require("../models/recipeSchema");
const recipeSeeds = require("./seeds.json");
const router = require("../controllers/userController");

Recipe.deleteMany({})
  .then(() => {
    return Recipe.insertMany(recipeSeeds);
  })
  .then((data) => console.log(data))
  .catch((err) => console.log(err))
  .finally(() => {
    process.exit();
  });
