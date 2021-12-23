const mongoose = require('mongoose')

const mongoURI = 'mongodb://localhost:27017/recipes'

    mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
})
.then((inst) => console.log(`Connected   to db: ${inst.connections[0].name}`))
.catch((err) => console.error(err));

module.exports = mongoose