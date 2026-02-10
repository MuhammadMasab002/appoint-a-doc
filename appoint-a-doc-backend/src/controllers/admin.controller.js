import Doctor from "../models/doctor.model.js";
import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";

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
    availability === undefined ||
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

export { addDoctor };
