const express = require("express");
const mongoose = require("mongoose");
const app = express();

// const route = require("./controller/plyers");


app.use(express.json());
const route = require("./controller/plyers");

app.use("/api", route);
mongoose
  .connect("mongodb://localhost:27017/School", {})
  .then(() => {
    console.log("connect the databse");
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(8000, () => {
  console.log("server is on...");
});