import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Appointment from "../models/Appointment.model.js";
import Doctor from "../models/doctor.model.js";

const changeAvalibility = async (req, res) => {
  try {
    // const doctorId = req.params.id;
    const { doctorId } = req.body;
    // Find the doctor by ID    const doctor = await Doctor.findById(doctorId);

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }
    // Toggle the availability status    doctor.availability = !doctor.availability;
    await Doctor.findByIdAndUpdate(doctorId, {
      availability: !doctor.availability,
    });
    res.status(200).json({
      success: true,
      message: "Doctor availability updated successfully",
    });
  } catch (error) {
    console.error("Error changing doctor availability:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// doctor list
const doctorList = async (req, res) => {
  try {
    const doctors = await Doctor.find({}).select("-email -password");
    res.status(200).json({
      success: true,
      message: "Doctor list fetched successfully",
      doctors,
    });
  } catch (error) {
    console.error("Error fetching doctor list:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// doctor Login
const doctorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const doctor = await Doctor.findOne({ email });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found!",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, doctor.password);
    if (!isPasswordValid) {
      return res.status(404).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { doctorId: doctor._id },
      process.env.JWT_SECRET_KEY,
    );

    res.status(200).json({
      success: true,
      message: "Doctor logged in successfully",
      token,
    });
  } catch (error) {
    console.error("Error during doctor login:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// api to get all doctor appointments
const doctorAppointments = async (req, res) => {
  try {
    const { doctorId } = req.body;

    if (!doctorId) {
      return res.status(400).json({
        success: false,
        message: "Doctor ID is required",
      });
    }

    const appointments = await Appointment.find({ doctorId });

    if (!appointments || appointments.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No appointments found for this doctor",
        appointments: [],
      });
    }

    res.status(200).json({
      success: true,
      appointments,
    });
  } catch (error) {
    console.error("Error fetching doctor appointments:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// api to complete appointment
const completeAppointment = async (req, res) => {
  try {
    const { doctorId, appointmentId } = req.body;

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

    if (appointment && appointment.doctorId === doctorId) {
      await Appointment.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });

      res.status(200).json({
        success: true,
        message: "Appointment marked as completed",
      });
    } else {
      return res.status(403).json({
        success: false,
        message: "Mark failed: Unauthorized",
      });
    }
  } catch (error) {
    console.error("Error completing appointment:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// api to cancel appointment
const cancelAppointment = async (req, res) => {
  try {
    const { doctorId, appointmentId } = req.body;

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

    if (appointment && appointment.doctorId === doctorId) {
      await Appointment.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });

      res.status(200).json({
        success: true,
        message: "Appointment marked as cancelled",
      });
    } else {
      return res.status(403).json({
        success: false,
        message: "Mark failed: Unauthorized",
      });
    }
  } catch (error) {
    console.error("Error cancelling appointment:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// doctor dashboard apis
const doctorDashboard = async (req, res) => {
  try {
    const { doctorId } = req.body;
    if (!doctorId) {
      return res.status(400).json({
        success: false,
        message: "Doctor ID is required",
      });
    }

    const allAppointments = await Appointment.find({ doctorId });

    let earnings = 0;

    allAppointments?.map((item) => {
      if (item.isCompleted || item.payment) {
        earnings += item.amount;
      }
    });

    let patients = [];

    allAppointments?.map((item) => {
      if (!patients.includes(item.userId)) {
        patients.push(item.userId);
      }
    });

    const dashboardData = {
      earnings,
      appointments: allAppointments.length,
      patients: patients.length,
      latestAppointments: allAppointments.reverse().slice(0, 5),
    };

    res.status(200).json({
      success: true,
      dashboardData,
    });
  } catch (error) {
    console.error("Error in doctor dashboard:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// doctor profile api
const doctorProfile = async (req, res) => {
  try {
    const { doctorId } = req.body;
    if (!doctorId) {
      return res.status(400).json({
        success: false,
        message: "Doctor ID is required",
      });
    }

    const doctor = await Doctor.findById(doctorId).select("-password");

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.status(200).json({
      success: true,
      profileData: doctor,
    });
  } catch (error) {
    console.error("Error fetching doctor profile:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// update doctor profile api
const updateDoctorProfile = async (req, res) => {
  try {
    const { doctorId, availability, fees, address } = req.body;

    if (!doctorId) {
      return res.status(400).json({
        success: false,
        message: "Doctor ID is required",
      });
    }

    await Doctor.findByIdAndUpdate(
      doctorId,
      {
        availability,
        fees,
        address,
      },
      { new: true },
    );

    res.status(200).json({
      success: true,
      message: "Doctor profile updated successfully",
    });
  } catch (error) {
    console.error("Error updating doctor profile:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export {
  changeAvalibility,
  doctorList,
  doctorLogin,
  doctorAppointments,
  completeAppointment,
  cancelAppointment,
  doctorDashboard,
  doctorProfile,
  updateDoctorProfile,
};
