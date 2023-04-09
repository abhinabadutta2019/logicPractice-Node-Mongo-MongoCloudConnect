const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/all", async (req, res) => {
  const collection = mongoose.connection.collection("students");

  //to array na add korar jonno kaj korchilo naa
  let allStudents = await collection.find({}).toArray();

  res.send(allStudents);
});

//added data from a json file-to database-with .insertMany()
router.post("/insert-all", async (req, res) => {
  const collection = mongoose.connection.collection("mongo-students");

  let testData = require("../playground/test.json");

  let result = await collection.insertMany(testData);

  res.send(result);
});

module.exports = router;
