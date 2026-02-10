import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    // Connect to MongoDB and connect to the database
    await mongoose.connect(`${process.env.DB_URI}/${process.env.DB_NAME}`);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("MongoDB connection failed:", error);
    throw error;
  }
};

export default connectDB;
