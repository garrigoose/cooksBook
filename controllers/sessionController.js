const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");

// index
router.get("/all_users", (req, res, next) => {
  User.find({}, (err, users) => {
    res.json(users);
  });
});

// User New Route (Create)
router.post("/register", async (req, res, next) => {
  console.log("req.body: ", req.body);
  try {
    const desiredUsername = req.body.username;
    const userExists = await User.findOne({ username: desiredUsername });
    if (userExists) {
      console.log("username exists");
      req.session.message = "User name is already taken";
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);
      req.body.password = hashedPassword;
      const newUser = {
        username: req.body.username,
        password: req.body.password,
      };
      const createdUser = await User.create(newUser);
      req.session.username = createdUser.username;
      req.session.loggedIn = true;
      res.json({ user: createdUser });
      console.log(req.session);
    }
  } catch (err) {
    next(err);
  }
});

// login route
router.post("/login", async (req, res, next) => {
  try {
    const userToLogin = await User.findOne({ username: req.body.username });
    console.log(userToLogin);
    if (userToLogin) {
      const validPassword = bcrypt.compareSync(
        req.body.password,
        userToLogin.password
      );
      if (validPassword) {
        req.session.username = userToLogin.username;
        req.session.loggedIn = true;
        req.session.message = "good job";
        console.log(req.session);
        res.json(userToLogin);
      } else {
        res.json({
          messsage: "Invalid uername or password",
        });
        req.session.message = "Invalid uername or password";
        console.log(req.session);
      }
    }
  } catch (err) {
    next(err);
  }
});

// logout route
router.get("/logout", (req, res, next) => {
  req.session.destroy();
  console.log(req.session);
  res.json();
});

// User Delete Route
router.delete("/delete/:id", (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, deletedUser) => {
    res.redirect("/all_users");
  });
});

module.exports = router;
