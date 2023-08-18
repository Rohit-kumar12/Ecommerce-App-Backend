const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log("Database Connected Succesfully");
  } catch (error) {
    console.log(`Error in mongodb ${error}`);
  }
};

module.exports = connectDB;
