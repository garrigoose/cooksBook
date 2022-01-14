const express = require("express");
const router = express.Router();
const cors = require("cors");
const Recipe = require("../models/recipeSchema");
const recipeSeeds = require("../db/seeds.json");

// Index Route - All
router.get("/all_recipes", cors(), (req, res, next) => {
  Recipe.find({}).then((recipes) => {
    res.json(recipes);
  });
});

// Recipe Search Route
router.get("/search=:criteria", (req, res) => {
  Recipe.find({
    title: { $in: req.params.criteria },
  }).then((recipes) => {
    res.json(recipes);
  });
});

// Recipe Show Route
router.get("/:id", (req, res) => {
  Recipe.findById(req.params.id).then((recipe) => {
    res.json(recipe);
  });
});

// Recipe New Route (Create)
router.post("/", (req, res, next) => {
  Recipe.create(req.body)
    .then(() => {
      console.log("new recipe created");
    })
    .catch(next);
});

// Recipe Edit Route
router.put("/:id", (req, res) => {
  console.log("this is req.body: ");
  console.log(req.body);
  Recipe.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedRecipe) => {
      console.log("updated recipe" + updatedRecipe);
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
