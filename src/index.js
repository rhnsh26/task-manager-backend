const express = require("express");
const cors = require("cors");

const { mongoose } = require("./db/work-db");
const userRouter = require("./router/userRouter");
const todoRouter = require("./router/todoRouter");
const app = express();

app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(todoRouter);

app.listen(8080, () => {
  console.log("SERVER STARTED AT 8080");
});

module.exports = { app };
