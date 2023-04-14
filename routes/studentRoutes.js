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

// Write a function that takes an array of objects as an argument and returns an object that has the properties '_id' and 'name' as its own properties and the rest of the properties from the objects in the array as properties of a nested object called 'rest'

//get request-- test route
router.get("/test", async (req, res) => {
  const collection = mongoose.connection.collection("mongo-students");

  //allStudents array output
  let allStudents = await collection.find({}).toArray();

  let filterArray = [];

  allStudents.filter(function (item) {
    if (item.age > 35) {
      filterArray.push(item.email.toUpperCase());
    }
  });

  //
  console.log(filterArray);
  //
  res.send(allStudents);
});

//output
// [
//   'AMET.MASSA@PROTONMAIL.COUK',
//   'DONEC.FELIS@AOL.CA',
//   'SEM.EGET.MASSA@ICLOUD.COM',
//   'TINCIDUNT.ORCI@ICLOUD.EDU',
//   'MORBI@HOTMAIL.CA',
//   'MORBI.QUIS.URNA@YAHOO.COM',
//   'NONUMMY.AC@YAHOO.COM',
//   'VELIT.EGESTAS.LACINIA@GOOGLE.COUK',
//   'LEO.MORBI@ICLOUD.ORG',
//   'QUAM.PELLENTESQUE@PROTONMAIL.CA',
//   'SEMPER@YAHOO.NET'
// ]

module.exports = router;
