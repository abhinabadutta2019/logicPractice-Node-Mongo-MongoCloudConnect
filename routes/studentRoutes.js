const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//get request- to see all data
router.get("/all", async (req, res) => {
  const collection = mongoose.connection.collection("mongo-students");

  //to array na add korar jonno kaj korchilo naa
  let allStudents = await collection.find({}).toArray();

  res.send(allStudents);
});

//added data from a json file-to database-with .insertMany()
router.post("/insert-all", async (req, res) => {
  const collection = mongoose.connection.collection("mongo-students");
  //jodi collection e data thake- eta diye empty kore nite hobe
  // await collection.deleteMany({});

  let testData = require("../playground/test.json");

  let result = await collection.insertMany(testData);

  res.send(result);
});

//get request-- test route
router.get("/test", async (req, res) => {
  const collection = mongoose.connection.collection("mongo-students");

  //allStudents array output
  let allStudents = await collection.find({}).toArray();

  //using filter
  let filterArray = [];

  allStudents.filter(function filterFunc(item) {
    if (item.age > 37) {
      const { name } = item;
      //
      filterArray.push(name);

      //filterArray.push(item)
      //
    }
  });
  //output
  // [
  //   'Shad Phelps',
  //   'Fuller Sullivan',
  //   'Lacota Hernandez',
  //   'Sharon Battle'
  // ]
  console.log(filterArray);

  res.send(allStudents);
});

module.exports = router;
