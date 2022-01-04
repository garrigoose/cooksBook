const mongoose = require('../db/connection.js')

const recipeSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String},
    ingredients: [{type: String, required: true}],
    ingredientSubset: [{type: String}],
    steps: [{type: String}],
    image: {type: String},
    tags: [{type: String}],
    link: {type: String}
})

const Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = Recipe