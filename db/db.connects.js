const mongoose = require("mongoose");
require("dotenv").config();

const MongoUri = process.env.MONGODB;

const initialiseDatabase = async () => {
  await mongoose
    .connect(MongoUri)
    .then(() => {
      console.log("Connected to Database");
    })
    .catch((error) => {
      console.log("Error occured in connecting to database!", error);
    });
};

module.exports = initialiseDatabase;
