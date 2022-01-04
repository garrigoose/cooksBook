// dependencies
const express = require('express')
const app = express()
const recipeController = require('./controllers/recipeController')

// middleware
app.use(express.static('public'))
app.use(express.urlencoded({extended:false}))
app.use('/recipes', recipeController)

app.listen(3000, ()=>console.log(`We're making snacks on port 3000`))