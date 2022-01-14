// dependencies
const express = require("express");
const app = express();

app.set("port", process.env.PORT || 3000);
const recipeController = require("./controllers/recipeController");
const sessionController = require("./controllers/sessionController");

const cors = require("cors");
const { render } = require("express/lib/response");
const Logger = require("nodemon/lib/utils/log");
const methodOverride = require("method-override");

// middleware
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(cors());
app.use("/recipes", recipeController);
app.use("/users", sessionController);

app.get("/", (req, res) => {
  console.log("test");
  res.render("index.ejs");
});

app.listen(app.get("port"), () =>
  console.log(`We're making snacks on port ${app.get("port")}`)
);
