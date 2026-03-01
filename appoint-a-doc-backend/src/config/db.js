import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let connectionPromise = null;

const connectDB = async () => {
  const { DB_URI, DB_NAME } = process.env;

  if (!DB_URI || !DB_NAME) {
    throw new Error("Missing DB_URI or DB_NAME");
  }

  // Prevents multiple connections in serverless.
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  // Prevents duplicate connection attempts.
  if (mongoose.connection.readyState === 2 && connectionPromise) {
    return connectionPromise;
  }

  try {
    if (!connectionPromise) {
      connectionPromise = mongoose.connect(`${DB_URI}/${DB_NAME}`);
    }

    const conn = await connectionPromise;
    console.log("MongoDB connected");
    return conn;
  } catch (error) {
    connectionPromise = null;
    console.log("MongoDB connection failed:", error);
    throw error;
  }
};

export default connectDB;
