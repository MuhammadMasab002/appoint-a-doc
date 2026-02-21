import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import Appointment from "../models/Appointment.model.js";
import Doctor from "../models/doctor.model.js";
import User from "../models/user.model.js";

// register user

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // check if all required fields are present
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    // validate email format
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter a valid email" });
    }
    // validate strong password
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "please enter a strong password",
      });
    }
    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    // save new user to database
    const savedUser = await User.create(userData);

    // generate token for new user
    const token = jwt.sign(
      { userId: savedUser._id },
      process.env.JWT_SECRET_KEY,
      //   { expiresIn: "1d" },
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: savedUser,
    });
  } catch (error) {
    console.log("Error in registerUser controller: ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check if all required fields are present
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    // validate email format
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter a valid email" });
    }
    // find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    // compare password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    // generate token for logged in user
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET_KEY,
      //   { expiresIn: "1d" },
    );
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token,
      user,
    });
  } catch (error) {
    console.log("Error in loginUser controller: ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Api to user profile details
const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Login again...",
      });
    }

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log("Error in getUserProfile controller: ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Update user profile details
const updateUserProfile = async (req, res) => {
  try {
    const { userId, name, email, phone, address, dateOfBirth, gender } =
      req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Login again",
      });
    }

    const imageFile = req.file;

    if (!name || !email || !phone || !dateOfBirth || !gender) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    let parsedAddress = address;
    if (typeof address === "string") {
      try {
        parsedAddress = JSON.parse(address);
      } catch (parseError) {
        return res.status(400).json({
          success: false,
          message: "Invalid address format",
          error: parseError.message,
        });
      }
    }

    const updateData = {
      name,
      email,
      phone,
      address: {
        line1: parsedAddress?.line1 || "",
        line2: parsedAddress?.line2 || "",
      },
      dateOfBirth,
      gender,
    };

    let imageUrl = null;
    if (imageFile) {
      // upload image to cloudinary and get the url
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });

      imageUrl = imageUpload.secure_url;
    }

    await User.findByIdAndUpdate(
      userId,
      { ...updateData, profilePicture: imageUrl },
      {
        new: true,
      },
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "User profile updated successfully",
    });
  } catch (error) {
    console.log("Error in updateUserProfile controller: ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Book appointment
const bookAppointment = async (req, res) => {
  try {
    const { userId, doctorId, slotDate, slotTime } = req.body;

    if (!userId || !doctorId || !slotDate || !slotTime) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }
    // check if doctor is available or not
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    if (!doctor.availability) {
      return res.status(400).json({
        success: false,
        message: "Doctor is not available",
      });
    }

    const slots_booked = doctor.slots_booked;
    // checking for slot availability
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.status(400).json({
          success: false,
          message: "Slot not available",
        });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    // user data
    const user = await User.findById(userId).select("-password");

    // delete slots_booked history form doctor data to update it
    delete doctor.slots_booked;

    // create appointment object
    const appointmentData = {
      userId,
      doctorId,
      userData: user,
      doctorData: doctor,
      slotDate,
      slotTime,
      amount: doctor.fees,
      //   date: Date.now(),
    };

    // create appointment
    await Appointment.create(appointmentData);

    // update doctor slot_booked
    await Doctor.findByIdAndUpdate(doctorId, { slots_booked });

    res.status(200).json({
      success: true,
      message: "Appointment booked successfully",
    });
  } catch (error) {
    console.log("Error in bookAppointment controller: ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// get user appointments
const listAppointments = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Login again",
      });
    }

    const appointments = await Appointment.find({ userId });

    if (appointments.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No appointments found",
      });
    }

    res.status(200).json({
      success: true,
      data: appointments,
    });
  } catch (error) {
    console.log("Error in list Appointments controller: ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// cancel appointment
const cancelAppointment = async (req, res) => {
  try {
    const { userId, appointmentId } = req.body;

    if (!userId || !appointmentId) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    if (appointment.userId !== userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: You can only cancel your own appointments",
      });
    }

    await Appointment.findByIdAndUpdate(appointmentId, { cancelled: true });

    const { doctorId, slotDate, slotTime } = appointment;

    const doctor = await Doctor.findById(doctorId);

    let slots_booked = doctor.slots_booked;
    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (time) => time !== slotTime,
    );

    await Doctor.findByIdAndUpdate(doctorId, { slots_booked });

    res.status(200).json({
      success: true,
      message: "Appointment cancelled successfully",
    });
  } catch (error) {
    console.log("Error in cancel Appointment controller: ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  bookAppointment,
  listAppointments,
  cancelAppointment,
};
