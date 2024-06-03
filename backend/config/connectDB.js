const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://vishnupandey92580:CRLIfPi8XPvS6D06@cluster0.kwtsjk4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log(`Connected to MongoDB successfully`.bgGreen.white);
  } catch (error) {
    console.log(`MongoDB Error: ${error}`.bgRed.white);
  }
};


module.exports = connectDB;
