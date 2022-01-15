// dependencies
const express = require("express");
const app = express();

app.set("port", process.env.PORT || 3000);
const recipeController = require("./controllers/recipeController");
const sessionController = require("./controllers/sessionController");

const { render } = require("express/lib/response");
const methodOverride = require("method-override");

// middleware
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use("/recipes", recipeController);
app.use("/session", sessionController);

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.listen(app.get("port"), () =>
  console.log(`We're making snacks on port ${app.get("port")}`)
);
