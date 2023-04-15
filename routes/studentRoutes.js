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

  let age35filterArray = [];

  //
  let arrayMailWithYahoo = [];

  allStudents.filter(function (item) {
    if (item.age > 36) {
      age35filterArray.push(item);
    }
  });

  //
  console.log(age35filterArray.length, "age35filterArray");

  //output example

  allStudents.filter(function (item) {
    if (item.email.includes("yahoo")) {
      arrayMailWithYahoo.push(item);
    }
  });
  console.log(arrayMailWithYahoo.length, "arrayMailWithYahoo");

  res.send(allStudents);
});

//output
// 5 age35filterArray
// 24 arrayMailWithYahoo
module.exports = router;
