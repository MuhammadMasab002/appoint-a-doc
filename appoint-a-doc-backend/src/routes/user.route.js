import express from "express";
import {
  bookAppointment,
  cancelAppointment,
  getUserProfile,
  listAppointments,
  loginUser,
  paymentRazorpay,
  registerUser,
  updateUserProfile,
} from "../controllers/user.controller.js";
import authUser from "../middleware/authUser.js";
import upload from "../middleware/multer.js";

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
userRouter.get("/list-appointments", authUser, listAppointments);
userRouter.post("/cancel-appointment", authUser, cancelAppointment);
userRouter.post("/payment-razorpay", authUser, paymentRazorpay);

export default userRouter;
