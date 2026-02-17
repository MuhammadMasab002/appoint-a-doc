import mongoose, { Schema } from "mongoose";

const doctorSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    speciality: { type: String, required: true },
    experience: { type: Number, required: true },
    profilePicture: { type: String, required: true }, // URL to the profile picture
    degree: { type: String, required: true },
    about: { type: String, required: true },
    availability: { type: Boolean, default: true },
    fees: { type: Number, required: true },
    address: { type: Object, default: {line1: "", line2: ""} },
    // dateOfJoining: { type: Date, default: Date.now },
    date: { type: Number, default: Date.now },
    slots_booked: { type: Object, default: {} },
  },
  { minimize: false, timestamps: true },
);

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;
