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

export { changeAvalibility };
