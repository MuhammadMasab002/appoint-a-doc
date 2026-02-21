import mongoose, { Schema } from "mongoose";

const appontmentSchema = new Schema(
  {
    userId: { type: String, required: true },
    doctorId: { type: String, required: true },
    slotDate: { type: Date, required: true },
    slotTime: { type: String, required: true },
    userData: { type: Object, required: true },
    doctorData: { type: Object, required: true },
    amount: { type: Number, required: true },
    // AppointmentData: { type: String, default: "" },
    payment: { type: Boolean, default: false },
    cancelled: { type: Boolean, default: false },
    isCompleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Appointment = mongoose.model("Appointment", appontmentSchema);

export default Appointment;
