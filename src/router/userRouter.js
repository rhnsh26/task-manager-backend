const express = require("express");

const { userModel } = require("../models/user");
const auth = require("../middleware/auth");

const router = new express.Router();

router.post("/user", async (req, res) => {
  req.body.name = req.body.name.trim();
  const user = new userModel(req.body);

  try {
    await user.save();
    const token = await user.genToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/user/login", async (req, res) => {
  try {
    const user = await userModel.findByEmail(req.body.email, req.body.password);
    if (!user) {
      throw new Error("Email Id not registered");
    }
    const token = await user.genToken();
    res.status(200).send({ message: "LOGIN SUCCESSFUL", user, token });
  } catch (e) {
    res.status(404).send(e);
  }
});

router.get("/user/me", auth, async (req, res) => {
  try {
    const userDoc = await userModel.findOne(res.locals.user["_id"]);
    res.status(200).send(`Welcome ${userDoc.name}.You are now logged in`);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/user/logout", auth, async (req, res) => {
  try {
    const userDoc = res.locals.user;
    const token = res.locals.token;
    userDoc.tokens = userDoc.tokens.filter(tokenObj => {
      tokenObj !== token;
    });
    let newUserDoc = await userDoc.save();
    res.send(newUserDoc);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/user/logoutAll", auth, async (req, res) => {
  try {
    const userDoc = res.locals.user;
    userDoc.tokens = [];
    await userDoc.save();
    res.send(` ${userDoc.name} ,you are now Logout from all devices`);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/users", auth, async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).send(users);
  } catch (e) {
    res.status(400).send(user);
  }
});

module.exports = router;
