const mongoose = require("../db/connection.js");

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  ingredients: [{ type: String, required: true }],
  ingredientSubset: [{ type: String }],
  steps: [{ type: String }],
  image: { type: String },
  tags: [{ type: String }],
  link: { type: String },
  //   owner: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "User",
  //   },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
