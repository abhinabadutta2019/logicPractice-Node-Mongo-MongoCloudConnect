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
  // let nameArray = [];

  // for (let student = 0; student < allStudents.length; student++) {
  //   //
  //   const studentAge = allStudents[student].age;
  //   if (studentAge > 34) {
  //     nameArray.push(student);
  //   }
  // }

  // console.log(nameArray, "loop method");
  ///////////////////////////////////////////////////////////////////
  //using map and reduce

  let arraywithMap = allStudents.map((student) => student.age);
  console.log(arraywithMap, "map method");

  // reduce
  let reduceValue = arraywithMap.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  console.log(reduceValue, "reduceValue");

  //////////////////////////////////////////////////////////////////
  //using filter

  // let arrayWithFilter = allStudents.filter((student) => student.age > 35);

  // console.log(arrayWithFilter, "filter method");
  // console.log(arrayWithFilter.length);
  ///////////////////////////////////////////////////////////////////////
  //using reduce

  //
  //
  res.send(allStudents);
});

module.exports = router;
