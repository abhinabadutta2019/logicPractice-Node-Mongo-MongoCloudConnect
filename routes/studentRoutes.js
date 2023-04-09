const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/all", async (req, res) => {
  const collection = mongoose.connection.collection("students");

  //to array na add korar jonno kaj korchilo naa
  let allStudents = await collection.find({}).toArray();

  res.send(allStudents);
});

module.exports = router;
