// dependencies
require("dotenv").config();
const express = require("express");
const app = express();
const session = require("express-session");
const SESSION_SECRET = "e7143fa59dc178165998e0f2281a74c67d7a1e7f";
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

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.listen(app.get("port"), () =>
  console.log(`We're making snacks on port ${app.get("port")}`)
);
