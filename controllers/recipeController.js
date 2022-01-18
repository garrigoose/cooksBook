const express = require("express");
const router = express.Router();
const Recipe = require("../models/recipeSchema");

const authRequired = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    // res.redirect("/session/login");
  }
};

// Index Route - All
router.get("/all_recipes", (req, res, next) => {
  Recipe.find({}).then((recipes) => {
    res.json(recipes);
  });
});

// Recipe Search Route
router.get("/search=:criteria", (req, res) => {
  console.log(req.params);
  Recipe.find({
    $or: [
      { title: new RegExp(req.params.criteria, "i") },
      { tags: new RegExp(req.params.criteria, "i") },
      { description: new RegExp(req.params.criteria, "i") },
      { steps: new RegExp(req.params.criteria, "i") },
      { ingredients: new RegExp(req.params.criteria, "i") },
    ],
  })
    .collation({ locale: "en_US" })
    .then((recipes) => {
      console.log(recipes);
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
router.post(
  "/",
  // authRequired,
  (req, res, next) => {
    Recipe.create(req.body)
      .then((newRecipe) => {
        res.json(newRecipe);
      })
      .catch(next);
  }
);

// Recipe Edit Route
router.put(
  "/:id",
  // authRequired,
  (req, res) => {
    Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
      (err, updatedRecipe) => {
        console.log(err);
        res.json(updatedRecipe);
      }
    );
  }
);

// Recipe Delete Route
router.delete(
  "/:id",
  // authRequired,
  (req, res) => {
    Recipe.findByIdAndRemove(req.params.id, (err, deletedRecipe) => {
      res.redirect("/all_recipes");
    });
  }
);

module.exports = router;
