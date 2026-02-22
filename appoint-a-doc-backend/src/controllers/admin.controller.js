import Doctor from "../models/doctor.model.js";
import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import Appointment from "../models/Appointment.model.js";

// api for adding doctor
const addDoctor = async (req, res) => {
  const {
    name,
    email,
    password,
    speciality,
    experience,
    // profilePicture,
    degree,
    about,
    availability,
    fees,
    address,
    // date,
    // slots_booked,
  } = req.body;

  const imageFile = req.file ? req.file.path : null;

  // check if all required fields are present
  if (
    !name ||
    !email ||
    !password ||
    !speciality ||
    !experience ||
    !degree ||
    !about ||
    // availability === undefined ||
    !fees ||
    !address
  ) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
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

    // hashing doctor password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // upload image to cloudinary
    let profilePictureUrl = null;
    if (imageFile) {
      const imageUploaded = await cloudinary.uploader.upload(imageFile, {
        resource_type: "image",
      });
      profilePictureUrl = imageUploaded.secure_url;
    }
    const doctorData = {
      name,
      email,
      password: hashedPassword,
      speciality,
      experience,
      degree,
      about,
      availability,
      fees,
      address,
      profilePicture: profilePictureUrl,
      // address: JSON.parse(address),
      // data: Date.now();
    };

    // create doctor in db
    const doctor = new Doctor(doctorData);
    await doctor.save();

    res.status(200).json({
      success: true,
      message: "Doctor added successfully",
    });
  } catch (error) {
    console.error("Error adding doctor:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get all doctors list form admin panel
const AllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({})
      .select("-password")
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      doctors,
    });
  } catch (error) {
    console.error("Error fetching all doctors:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// login admin api
const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  // check if email and password are provided
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email and password are required" });
  }
  try {
    // validate email format
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter a valid email" });
    }
    // check if email and password match the admin credentials
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      // generate a token
      const token = jwt.sign(
        email + password,
        process.env.JWT_SECRET_KEY,
        // {expiresIn: "1d"}
      );

      return res.status(200).json({
        success: true,
        message: "Admin logged in successfully",
        token: token,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    console.error("Error during admin login:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// get all appointments for admin
const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await Appointment.find({}).sort({ createdAt: -1 });

    if (!appointments || appointments.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No appointments found",
      });
    }

    res.status(200).json({
      success: true,
      appointments,
    });
  } catch (error) {
    console.error("Error fetching appointments for admin:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// cancel appointment
const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    if (!appointmentId) {
      return res.status(400).json({
        success: false,
        message: "Appointment ID is required",
      });
    }

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    await Appointment.findByIdAndUpdate(appointmentId, { cancelled: true });

    const { doctorId, slotDate, slotTime } = appointment;

    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    const slots_booked = doctor.slots_booked || {};

    const appointmentDate =
      slotDate instanceof Date ? slotDate : new Date(slotDate);

    const normalizedSlotDate = !Number.isNaN(appointmentDate.getTime())
      ? appointmentDate.toISOString().split("T")[0]
      : String(slotDate);

    const rawSlotDateKey =
      typeof slotDate === "string" ? slotDate : String(slotDate);

    const slotDateKey = Array.isArray(slots_booked[normalizedSlotDate])
      ? normalizedSlotDate
      : rawSlotDateKey;

    const existingSlots = Array.isArray(slots_booked[slotDateKey])
      ? slots_booked[slotDateKey]
      : [];

    slots_booked[slotDateKey] = existingSlots.filter(
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

export { addDoctor, adminLogin, AllDoctors, appointmentsAdmin, appointmentCancel };
