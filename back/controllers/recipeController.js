const express = require("express");
const router = express.Router();
const Recipe = require("../models/recipeSchema");
const recipeSeeds = require("../db/seeds.json");
const { application } = require("express");

// Recipe.create(recipeSeeds, (err, data) => {
//     if(err) console.log(err.message);
//     console.log('added provided item data')
// })

// Recipe.collection.drop()

// Recipe Home Route
router.get("/", (req, res) => {
  Recipe.find({}).then((recipes) => {
    res.json(recipes);
  });
});

// Index Route - All
router.get("/all_recipes", (req, res) => {
  Recipe.find(
    {}.then((recipes) => {
      res.json(recipes);
    })
  );
});

// Recipe Index Route (Searched)
// will need to take recipes names and add individual words as tags to recipe (on create?)
router.get("/:tags", (req, res) => {
  Recipe.find({ tags: req.params.title }).then((recipes) => {
    res.json(recipes);
  });
});

// Recipe Show Route
router.get("/:name", (req, res) => {
  Recipe.find({ name: req.params.name }).then((recipe) => res.json(recipe));
});

// Recipe New Route (Create)
router.post("/", (req, res) => {
  Recipe.create(req.body).then((recipe) => {
    return Recipe.find({}).then((recipes) => {
      return res.json(recipes);
    });
  });
});

// Recipe Edit Route

// Recipe Delete Route

module.exports = router;
