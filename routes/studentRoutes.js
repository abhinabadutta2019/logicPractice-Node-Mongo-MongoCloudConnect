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

// Write a function that takes an array of objects as an argument and returns a new array of objects where the properties 'myid' and 'age' are swapped.

//get request-- test route
router.get("/test", async (req, res) => {
  const collection = mongoose.connection.collection("mongo-students");

  //allStudents array output
  let allStudents = await collection.find({}).toArray();

  let filterArray = [];

  allStudents.filter(function (item) {
    if (item.age > 35) {
      //
      let swapped = {
        _id: item.email, //swapped
        myid: item.myid,
        name: item.name,
        email: item._id, //swapped
        age: item.age,
        country: item.country,
      };

      filterArray.push(swapped);
    }
  });

  //
  console.log(filterArray);
  //
  res.send(allStudents);
});

//output
// {
//   _id: 'semper@yahoo.net',
//   myid: 64,
//   name: 'Salvador Reeves',
//   email: new ObjectId("6433bcfbaf46095e1725267b"),
//   age: 37,
//   country: 'Brazil'
// }

module.exports = router;
