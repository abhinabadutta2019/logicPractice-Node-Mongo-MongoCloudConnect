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

//Write a function that takes an array of objects as an argument and returns the number of objects in the array where the 'email' property contains the string 'protonmail' and the 'age' property is greater than 35.

//get request-- test route
router.get("/test", async (req, res) => {
  const collection = mongoose.connection.collection("mongo-students");

  //allStudents array output
  let allStudents = await collection.find({}).toArray();

  let filterArray = [];

  allStudents.filter(function (item) {
    if (item.email.includes("proton") && item.age > 35) {
      //ei line e destructuring and spread both use hocche

      filterArray.push(item);
    }
  });

  //
  console.log(filterArray, "filterArray");

  //output example

  // {
  //   _id: new ObjectId("6433bcfbaf46095e1725266e"),
  //   myid: 51,
  //   name: 'Sharon Battle',
  //   email: 'quam.pellentesque@protonmail.ca',
  //   age: 38,
  //   country: 'Chile'
  // }

  res.send(allStudents);
});

//output

module.exports = router;
