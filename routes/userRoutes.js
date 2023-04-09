const express = require("express");
const User = require("../model/user");
const router = express.Router();

//get route
router.get("/", async (req, res) => {
  //
  const user = await User.find({});
  //
  res.send();
});

//seed route

router.get("/seed", async (req, res) => {
  await User.deleteMany({});

  //
  await User.create([
    { email: "aadmin", password: "1234" },
    { email: "admin1", password: "12345" },
  ]);
  res.send();
});

module.exports = router;
