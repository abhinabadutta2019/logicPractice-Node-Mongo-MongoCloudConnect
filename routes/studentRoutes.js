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

//Write a function that takes an array of objects as an argument and returns an array of objects where the '_id' and 'name' properties are combined into a single property called 'fullName' and the rest of the properties are included in a nested object called 'details'.

//get request-- test route
router.get("/test", async (req, res) => {
  const collection = mongoose.connection.collection("mongo-students");

  //allStudents array output
  let allStudents = await collection.find({}).toArray();

  let filterArray = [];

  allStudents.filter(function (item) {
    if (item.myid > 95) {
      item.age = item.age * 2;
      item.myid = item.myid / 2;

      let newItem = {
        _id: item._id,
        myid: item.myid,
        age: item.age,
        name: item.name,
      };
      filterArray.push(newItem);
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
