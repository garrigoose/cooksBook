const { mongo } = require('mongoose')
const mongoose = require('../db/connection.js')

const recipeSchema = new mongoose.recipeSchema({
    title: {type: String},
    description: {type: String},
    ingredients: [{type: String}],
    steps: [{type: String}],
    picture: {type: String},
})

const Recipe = mongoose.model('Recipe, recipeSchema')

module.exports = Recipe