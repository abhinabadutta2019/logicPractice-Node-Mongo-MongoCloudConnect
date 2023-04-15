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

//Write a function that takes an array of objects as an argument and returns an object with properties 'ageCount' and 'emailCount' where 'ageCount' is the total number of objects in the array where the 'age' property is greater than 35 and 'emailCount' is the total number of objects in the array where the 'email' property contains the string 'protonmail'.

//get request-- test route
router.get("/test", async (req, res) => {
  const collection = mongoose.connection.collection("mongo-students");

  //allStudents array output
  let allStudents = await collection.find({}).toArray();

  let filterArray = [];
  //
  let ageCount = 0;
  //
  let chileCount = 0;

  for (let index = 0; index < allStudents.length; index++) {
    //if age >36
    if (allStudents[index].age > 36) {
      ageCount = ageCount + 1;
      // filterArray.push(allStudents[index]);
    }

    //if country===Chile
    if (allStudents[index].country === "Chile") {
      chileCount = chileCount + 1;
      // filterArray.push(allStudents[index]);
    }
  }

  console.log(ageCount, "ageCount");
  console.log(chileCount, "chileCount");
  // console.log(filterArray.length);

  res.send(allStudents);
});

//output

module.exports = router;
