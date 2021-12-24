const { mongo } = require('mongoose')
const mongoose = require('../db/connection.js')

const recipeSchema = new mongoose.recipeSchema({
    title: {type: String, required: true},
    description: {type: String},
    ingredients: [{type: String, required: true}],
    steps: [{type: String, required: true}],
    picture: {type: String},
    tags: [{type: String}]
})

const Recipe = mongoose.model('Recipe, recipeSchema')

module.exports = Recipe