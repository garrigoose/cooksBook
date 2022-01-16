const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  res.send("Session controller works");
});

// Index Route - All
router.get("/all_users", (req, res, next) => {
  User.find({})
    .then((users) => res.json(users))
    .catch(next);
});

// User Show Route
router.get("/:id", (req, res) => {
  User.findById(req.params.id).then((user) => {
    res.json(user);
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
      // req.session.message = "User name is already taken";
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);
      req.body.password = hashedPassword;
      const createdUser = await User.create(req.body, (err, newUser) => {
        console.log(newUser);
        req.session.username = newUser.username;
      });
      console.log(req.session.username);
      // req.session.username = createdUser.username;
      console.log(createdUser);
      console.log(req.session);
      // req.session.loggedIn = true;
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
        req.session.loggedOn = true;
        res.redirect("/recipes");
      }
    } else {
      req.session.message = "Invalid uername or password";
    }
  } catch (err) {
    next(err);
  }
});

// User Edit Route
router.put("/:id", (req, res) => {
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
router.delete("/:id", (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, deletedUser) => {
    res.redirect("/all_users");
  });
});

module.exports = router;
