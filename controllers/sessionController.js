const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");

// User New Route (Create)
router.post("/register", async (req, res, next) => {
  console.log("req.body: ", req.body);
  try {
    if (req.body.password === req.body.verifyPassword) {
      const desiredUsername = req.body.username;
      const userExists = await User.findOne({ username: desiredUsername });
      if (userExists) {
        console.log("username exists");
        req.session.message = "User name is already taken";
      } else {
        console.log(req.body);
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);
        req.body.password = hashedPassword;
        const createdUser = await User.create(req.body, (err, newUser) => {
          req.session.username = newUser.username;
        });
        req.session.username = createdUser.username;
        res.json(createdUser);
        console.log("new user created:  " + req.session.username);
        req.session.loggedIn = true;
      }
    } else {
      req.session.message = "Passwords must match";
      res.redirect("/session/register");
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
      }
    } else {
      console.log("invalid username or password");
      req.session.message = "Invalid uername or password";
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

// User Edit Route
router.put("/edit/:id", (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedUser) => {
      console.log("updated user" + updatedUser);
    }
  );
});

// User Delete Route
router.delete("/delete/:id", (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, deletedUser) => {
    res.redirect("/all_users");
  });
});

module.exports = router;
