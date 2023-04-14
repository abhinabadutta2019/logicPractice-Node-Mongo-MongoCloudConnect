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

// 'name' property is formatted to title case

//get request-- test route
router.get("/test", async (req, res) => {
  const collection = mongoose.connection.collection("mongo-students");

  //allStudents array output
  let allStudents = await collection.find({}).toArray();

  let filterArray = [];

  allStudents.filter(function (item) {
    if (item.age > 35) {
      //ei line e destructuring and spread both use hocche
      const { _id, name, ...rest } = item;
      const fullName = `${_id} ${name}`;
      //
      let newItem = { fullName, ...rest };

      // eta korle rest portion ta ekta same object e thakbe, nicher tar moto nested object e noi
      //{
      //   fullName: '6433bcfbaf46095e1725267b Salvador Reeves',
      //   myid: 64,
      //   email: 'semper@yahoo.net',
      //   age: 37,
      //   country: 'Brazil'
      // }

      // eta korle rest portion ta ekta nested object e thakbe
      // let newItem = { fullName, rest };
      // {
      //   fullName: '6433bcfbaf46095e17252653 Lacota Hernandez',
      //   rest: {
      //     myid: 24,
      //     email: 'leo.morbi@icloud.org',
      //     age: 38,
      //     country: 'Italy'
      //   }
      // }
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
