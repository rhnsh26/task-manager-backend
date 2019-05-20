const express = require("express");
const cors = require("cors");

const port = process.env.PORT || 8080;

const { mongoose } = require("./db/work-db");
const userRouter = require("./router/userRouter");
const todoRouter = require("./router/todoRouter");
const app = express();

app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(todoRouter);

app.listen(port, () => {
  console.log("SERVER STARTED AT " + port);
});

module.exports = { app };
