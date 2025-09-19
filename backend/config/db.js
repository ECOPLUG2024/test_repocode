import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();


const dbConnection = async () => {
  try {
    await mongoose.connect("mongodb+srv://ppratim625:ashok123@cluster0.ngcxyju.mongodb.net/");
    console.log(" Database connected successfully!");
  } catch (error) {
    console.error(" DB connection error:", error.message);
    process.exit(1);
  }
};

export default dbConnection;
