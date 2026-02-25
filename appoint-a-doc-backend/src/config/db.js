import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  const { DB_URI, DB_NAME } = process.env;
  try {
    // Connect to MongoDB and connect to the database
    await mongoose.connect(`${DB_URI}/${DB_NAME}`);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("MongoDB connection failed:", error);
    throw error;
  }
};

export default connectDB;
