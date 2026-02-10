import express from "express";
import cors from "cors";
import connectCloudinary from "./src/config/cloudinary.js";

const app = express();

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// connect to cloudinary
connectCloudinary();

// API ROUTES
app.get("/", (req, res) => {
  res.send("Welcome to Backend API");
});
// app.use("/api");

export default app;
