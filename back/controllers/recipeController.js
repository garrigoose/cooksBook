const express = require("express");
const router = express.Router();
const cors = require("cors");
const Recipe = require("../models/recipeSchema");
const recipeSeeds = require("../db/seeds.json");

// Recipe.create(recipeSeeds, (err, data) => {
//     if(err) console.log(err.message);
//     console.log('added provided item data')
// })

// Recipe.collection.drop()

// Recipe Home Route
// router.get("/", (req, res) => {
//   Recipe.find({}).then((recipes) => {
//     res.json(recipes);
//   });
// });

// Index Route - All
router.get("/all_recipes", cors(), (req, res, next) => {
  Recipe.find({}).then((recipes) => {
    res.json(recipes);
  });
});

// Recipe Index Route (Searched)
// will need to take recipes names and add individual strings as tags to recipe (on create?)
router.get("/:tag", (req, res) => {
  Recipe.find({ tags: req.params.tag }).then((recipes) => {
    res.json(recipes);
  });
});

// Recipe Show Route
router.get("/:id", (req, res) => {
  Recipe.findById(req.params.id).then((recipe) => res.json(recipe));
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
router.put("/:id", (req, res) => {
  Recipe.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedRecipe) => {
      console.log(updatedRecipe);
      res.redirect(`/${req.params.id}`);
    }
  );
});

// Recipe Delete Route
router.delete("/:id", (req, res) => {
  Recipe.findByIdAndRemove(req.params.id, (err, deletedRecipe) => {
    res.redirect("/all_recipes");
  });
});

module.exports = router;
