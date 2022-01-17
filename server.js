// dependencies
require("dotenv").config();
const express = require("express");
const app = express();
const methodOverride = require("method-override");
const SESSION_SECRET = process.env.SESSION_SECRET;
app.set("port", process.env.PORT || 3000);
const session = require("express-session");
const recipeController = require("./controllers/recipeController");
const sessionController = require("./controllers/sessionController");

// middleware
const { render } = require("express/lib/response");
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

// session middleware
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use((req, res, next) => {
  res.locals.username = req.session.username;
  res.locals.loggedIn = req.session.loggedIn;
  next();
});

app.use((req, res, next) => {
  res.locals.message = req.session.message;
  req.session.message = "";
  next();
});

const authRequired = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    res.redirect("/session/login");
  }
};

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.use("/recipes", recipeController);
app.use("/session", sessionController);

app.listen(app.get("port"), () =>
  console.log(`We're making snacks on port ${app.get("port")}`)
);
