import express from "express";
import {
  addDoctor,
  adminLogin,
  AllDoctors,
  appointmentsAdmin,
} from "../controllers/admin.controller.js";
import upload from "../middleware/multer.js";
import authAdmin from "../middleware/authAdmin.js";
import { changeAvalibility } from "../controllers/doctor.controller.js";

const adminRoutes = express.Router();

adminRoutes.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);
adminRoutes.post("/login", adminLogin);
adminRoutes.get("/all-doctors", authAdmin, AllDoctors);
adminRoutes.put("/change-availability", authAdmin, changeAvalibility);
adminRoutes.get("/appointments", authAdmin, appointmentsAdmin);

export default adminRoutes;
