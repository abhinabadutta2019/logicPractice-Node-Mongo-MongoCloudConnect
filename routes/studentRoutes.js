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

  //////////////////////////////////////////////////////////////////
  //getting name of each item, with for loop

  // let myArray = [];

  // for (let index = 0; index < allStudents.length; index++) {
  //   //

  //   if (allStudents[index].age >= 37) {
  //     let overThirtySevenName = allStudents[index].name;
  //     //
  //     myArray.push(overThirtySevenName);
  //   }
  // }

  // console.log(myArray, "loop method");

  //////////////////////////////////////////////////////////////////
  //using filter
  let filterArray = [];

  allStudents.filter(function filterFunc(item) {
    if (item.age > 35) {
      filterArray.push(item.age);
    }
  });
  console.log(filterArray);
  ///////////////////////////////////////////////////////////////////
  //using map
  let mapArray = [];

  filterArray.map(function mapFunc(item) {
    item = item + 5;
    mapArray.push(item);
  });
  console.log(mapArray);
  // ///////////////////////////////////////////////////////////////////////
  // // reduce

  let reduceValue = mapArray.reduce(function (accu, current) {
    accu = accu + current;
    return accu;
  });

  console.log(reduceValue);

  res.send(allStudents);
});

module.exports = router;
