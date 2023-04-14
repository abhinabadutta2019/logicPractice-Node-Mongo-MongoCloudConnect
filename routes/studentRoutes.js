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
    if (item.age > 35) {
      //ei line e destructuring and spread both use hocche

      let { email, ...rest } = item;
      //
      let emailArr = email.split(/[.]/);
      // console.log(emailArr);
      // [ 'amet', 'massa@protonmail', 'couk' ]
      let mapEmailArr = [];
      emailArr.map(function (item) {
        item = item.charAt(0).toUpperCase() + item.slice(1);
        mapEmailArr.push(item);
      });
      // console.log(mapEmailArr);
      // [ 'Quam', 'Pellentesque@protonmail', 'Ca' ]
      let newJoinString = mapEmailArr.join(".");

      // console.log(newJoinString);
      //Amet.Massa@protonmail.Couk
      //
      newItem = { newJoinString, ...rest };
      filterArray.push(newItem);
    }
  });

  //
  console.log(filterArray);
  //
  res.send(allStudents);
});

//output

module.exports = router;
