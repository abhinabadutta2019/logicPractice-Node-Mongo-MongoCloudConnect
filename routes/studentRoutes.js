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

// 'email' property is formatted to title case, "." er por
// from this 'sem.eget.massa@icloud.com' to this ---'Sem.Eget.Massa@icloud.Com'

//get request-- test route
router.get("/test", async (req, res) => {
  const collection = mongoose.connection.collection("mongo-students");

  //allStudents array output
  let allStudents = await collection.find({}).toArray();

  let filterArray = [];

  allStudents.filter(function (item) {
    if (item.myid > 95) {
      //ei line e destructuring and spread both use hocche

      filterArray.push(item);
    }
  });

  //
  console.log(filterArray, "filterArray");

  // writing sort function

  //method 1
  // function compare(a, b) {
  //   if (a.country < b.country) {
  //     return -1;
  //   }
  //   if (a.country > b.country) {
  //     return 1;
  //   }
  //   return 0;
  // }
  //method 2
  function compare(a, b) {
    let comparisonResult = 0;
    if (a.country < b.country) {
      comparisonResult = -1;
    } else if (a.country > b.country) {
      comparisonResult = 1;
    }
    return comparisonResult;
  }
  //
  let sorted = filterArray.sort(compare);
  console.log(sorted, "sorted");
  //

  res.send(allStudents);
});

//output

module.exports = router;
