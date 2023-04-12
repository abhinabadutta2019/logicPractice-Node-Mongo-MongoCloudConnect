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
  ///////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////

  //using filter
  const filterArray = [];
  //
  allStudents.filter(function filterFunc(index) {
    // console.log(index.myid, "aa");
    if (!(index.myid > 5)) {
      filterArray.push(index.age);
    }

    // return allStudents[index];
  });

  console.log(filterArray);
  ///////////////////////////////////////////////////////////////////////
  // reduce
  let reduceValue = filterArray.reduce(function reduceFunc(
    accumulator,
    curretValue
  ) {
    return accumulator + curretValue;
  },
  1.3);
  // acctualy accumulator er value 0 hoi, icche kore , 1.33 diyechi

  console.log(reduceValue);
  //using map

  res.send();
});

module.exports = router;
