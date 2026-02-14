import express from "express";
import { addDoctor, adminLogin } from "../controllers/admin.controller.js";
import upload from "../middleware/multer.js";
import authAdmin from "../middleware/authAdmin.js";

const adminRoutes = express.Router();

adminRoutes.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);
adminRoutes.post("/login", adminLogin);

export default adminRoutes;
