// Requiring
const mongoose = require("mongoose");
const User = require("../models/User");
const initdata = require("./data");

// Url Declaration
const MONGO_URL = "mongodb://localhost:27017/email";

// Databases Connection
main()
  .then(() => {
    console.log("connection successfull");
  })
  .catch((err) => {
    console.log("Error occurred at", err);
  });

// Async Function
async function main() {
  await mongoose.connect(MONGO_URL);
}

// initialing the databases
const initDB = async () => {
  await User.deleteMany({});
  initdata.data = initdata.data.map((obj) => ({
    ...obj,
    owner: "6776b7178edf626ea27afd9b",
  }));
  await User.insertMany(initdata.data);
  console.log("Data was saved ...");
};

initDB();
