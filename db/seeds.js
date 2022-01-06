const mongoose = require('./connection')
const Recipe = require('../models/recipeSchema')
const recipeSeeds = require('./seeds.json');
const router = require('../controllers/recipeController');

// Recipe.deleteMany({})
// .then(()=>{
//     return Recipe.insertMany(recipeSeeds)
// })
// .then(data => console.log(data))
// .catch(err=>console.log(err))
// .finally(()=>{
//     process.exit()
// })

Recipe.create(recipeSeeds, (err, data) => {
    if(err) console.log(err.message);
    console.log('added provided item data')
})

module.exports = router