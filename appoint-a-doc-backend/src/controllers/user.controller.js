import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";

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

    const imageFile = req.file;

    if (!name || !email || !phone || !dateOfBirth || !gender) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const user = await User.findByIdAndUpdate(userId, {
      name,
      email,
      phone,
      // address: JSON.parse(address),
      address,
      dateOfBirth,
      gender,
    });

    if (imageFile) {
      // upload image to cloudinary and get the url
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });

      const imageUrl = imageUpload.secure_url;

      await User.findByIdAndUpdate(userId, { profileImage: imageUrl });
    }

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

export { registerUser, loginUser, getUserProfile, updateUserProfile };
