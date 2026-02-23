import express from "express";
import { doctorList, doctorLogin } from "../controllers/doctor.controller.js";

const doctorRouter = express.Router();

doctorRouter.get("/list", doctorList);
doctorRouter.post("/login", doctorLogin);

export default doctorRouter;
