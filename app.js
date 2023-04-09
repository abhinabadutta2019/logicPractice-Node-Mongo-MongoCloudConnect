const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
//
const studentRoutes = require("./routes/studentRoutes");
const dotenv = require("dotenv");
//
const app = express();

app.use(express.json());
//config
dotenv.config();

//mongodb.net/mynew-database

//creating uri with username , password

let uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.te788iv.mongodb.net/data-10-april?retryWrites=true&w=majority`;

//example uri
//mongoose.connect(mongodb+srv://clusterAnything.mongodb.net/test?retryWrites=true&w=majority, { user: process.env.MONGO_USER, pass: process.env.MONGO_PASSWORD, useNewUrlParser: true, useUnifiedTopology: true })

// Connect to MongoDB
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//
app.listen(process.env.PORT, () => {
  console.log(`Server Started at ${process.env.PORT}`);
});

//
app.use("/", userRoutes);
app.use("/", studentRoutes);
