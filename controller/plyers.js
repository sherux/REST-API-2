const express = require("express");
const route = express.Router();
const model = require("../model/plyersdb");
const { body, validationResult } = require("express-validator");

// getting all data
route.get("/all", async (req, res) => {
  try {
    const stu = await model.find();
    res.json(stu);
  } catch (err) {
    res.json(err.message);
  }
});

// getting one data
route.get("/:id", async (req, res) => {
  try {
    const stu = await model.findById(req.params.id);
    res.json(stu);
  } catch (err) {
    res.json(err.message);
  }
});

// craeteing a data
route.post(
  "/data",
  [
    body("name", "name is invalid").isLength({ min: 5 }),
    body("email", "email is invalid").isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }
    const stu = new model({
      name: req.body.name,
      email: req.body.email,
      course: req.body.course,
    });
    try {
      const s1 = await stu.save();
      res.json(s1);
    } catch (err) {
      res.json(err.message);
    }
  }
);

// updating data
route.patch("/update/:id", async (req, res) => {
  try {
    const stu = {
      course: req.body.course,
    };
    const update = await model.findByIdAndUpdate(req.params.id, stu);
    res.json(update);
  } catch (err) {
    res.json(err.message);
  }
});
// deleting data
route.delete("/delete/:id", async (req, res) => {
  try {
    const delet = await model.findByIdAndDelete(req.params.id);
    res.json(delet);
  } catch (err) {
    res.json(err.message);
  }
});
module.exports = route;
