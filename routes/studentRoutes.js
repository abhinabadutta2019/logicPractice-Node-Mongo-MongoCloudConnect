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
  let mapArray = [];

  allStudents.map(function mapFunc(item) {
    //

    //
    const { _id, name } = item;

    //
    mapArray.push({ _id, name });

    //filterArray.push(item)
    //
  });

  //output
  // {
  //   _id: new ObjectId("6433bcfbaf46095e17252693"),
  //   name: 'Shad Phelps'
  // }

  console.log(mapArray);

  res.send(allStudents);
});

module.exports = router;
