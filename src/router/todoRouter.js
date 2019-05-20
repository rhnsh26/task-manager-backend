const express = require("express");
const { todoModel } = require("../models/todo");
const auth = require("../middleware/auth");

const router = new express.Router();

router.post("/todo", auth, async (req, res) => {
  const todo = new todoModel({
    ...req.body,
    userId: res.locals.user._id
  });
  try {
    await todo.save();
    res.status(201).send(todo);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/todos", auth, async (req, res) => {
  try {
    await res.locals.user
      .populate({
        path: "mytodos"
      })
      .execPopulate();
    res.status(200).send(res.locals.user.mytodos);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/todos/:id", auth, async (req, res) => {
  try {
    const response = await todoModel.findByIdAndRemove(req.params.id);
    // await res.locals.user.populate({ path: "mytodos" }).execPopulate();
    res.status(200).send(response);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.patch("/todos/:id", auth, async (req, res) => {
  try {
    const response = await todoModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    res.status(200).send(response);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
