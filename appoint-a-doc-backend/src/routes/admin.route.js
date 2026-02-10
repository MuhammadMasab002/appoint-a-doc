import express from "express";
import { addDoctor } from "../controllers/admin.controller.js";
import upload from "../middleware/multer.js";

const addminRoutes = express.Router();

addminRoutes.post("/add-doctor", upload.single("image"), addDoctor);

export default addminRoutes;
