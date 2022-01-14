const express = require("express");
const router = express.Router();
const cors = require("cors");
const User = require("../models/userSchema");

// Index Route - All
router.get("/all_users", cors(), (req, res, next) => {
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
router.post("/", (req, res, next) => {
  User.create(req.body)
    .then(() => console.log("new user created"))
    .catch(next);
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
