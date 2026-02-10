import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectCloudinary from "./src/config/cloudinary.js";
import addminRoutes from "./src/routes/admin.route.js";

dotenv.config();

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
app.use("/api/admin", addminRoutes);

export default app;
