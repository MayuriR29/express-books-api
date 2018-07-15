const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { jwtOptions } = require("../config/passport");
const jwt = require("jsonwebtoken");
/* GET home page. */
router.get("/", (req, res, next) => {
  res.json({ message: "hello express-blog-api" });
});
//signup
router.post("/signup", async (req, res, next) => {
  console.log("in signup", req.body);
  const { username, password } = req.body;
  const user = new User({ username, bio: "some bio" });
  user.setPassword(password);
  try {
    await user.save();
    res.json(user);
  } catch (err) {
    console.err("error in /signup", err);
    next(err);
  }
});
router.get("/users", async (req, res, next) => {
  const users = await User.find();
  res.json(users);
});
router.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });
  if (!user) {
    res.status(401).json({ message: "no such user found" });
  }

  if (user.validPassword(password)) {
    const userId = { id: user.id };
    console.log("user id", userId);
    const token = jwt.sign(userId, jwtOptions.secretOrKey);
    res.json({ message: "ok", token: token });
  } else {
    res.status(401).json({ message: "passwords did not match" });
  }
});

module.exports = router;
