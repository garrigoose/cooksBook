const mongoose = require("mongoose");

const MONGODB_URI =
  process.env.NODE_ENV === "production"
    ? process.env.MONGODB_URI
    : "mongodb://localhost:27017/recipes";
//   process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((inst) => console.log(`Connected   to db: ${inst.connections[0].name}`))
  .catch((err) => console.error(err));

module.exports = mongoose;
