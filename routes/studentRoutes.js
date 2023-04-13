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

  // }

  // console.log(myArray, "loop method");

  //////////////////////////////////////////////////////////////////
  //using filter
  let filterArray = [];

  allStudents.filter(function filterFunc(item) {
    if (item.age > 37) {
      filterArray.push(item);
    }
  });
  console.log(filterArray);

  //
  // {
  //   _id: new ObjectId("6433bcfbaf46095e17252693"),
  //   myid: 88,
  //   name: 'Shad Phelps',
  //   email: 'morbi@hotmail.ca',
  //   age: 38,
  //   country: 'Chile'
  // }
  //
  //return new object of array with only _id and name
  let mapArray = filterArray.map(function (item) {
    let _id = item._id;
    let name = item.name;
    //returning a new object with only the _id and name properties
    return { _id, name };
  });

  //
  console.log(mapArray);
  //{
  //   _id: new ObjectId("6433bcfbaf46095e17252693"),
  //   name: 'Shad Phelps'
  // }
  res.send(allStudents);
});

module.exports = router;
