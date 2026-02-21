import express from "express";
import {
  getUserProfile,
  loginUser,
  registerUser,
  updateUserProfile,
} from "../controllers/user.controller.js";
import authUser from "../middleware/authUser.js";
import upload from "../middleware/multer.js";
import { bookAppointment } from "../controllers/Appoinment.controller.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/get-profile", authUser, getUserProfile);
userRouter.put(
  "/update-profile",
  upload.single("image"),
  authUser,
  updateUserProfile,
);
userRouter.post("/book-appointment", authUser, bookAppointment);

export default userRouter;
