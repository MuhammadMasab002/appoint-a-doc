import React from "react";
import { DoctorContext } from "../../services/context/DoctorContext";
import { useContext } from "react";
import { useEffect } from "react";
import { AppContext } from "../../services/context/AppContext";
import { assets } from "../../assets/assets";

const DoctorAppointments = () => {
  const {
    doctorToken,
    appointments,
    getDoctorAppointments,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);
  const { calculateAge } = useContext(AppContext);

  useEffect(() => {
    if (doctorToken) {
      getDoctorAppointments();
    }
  }, [doctorToken]);

  const handleCancelAppointment = async (appointmentId) => {
    await cancelAppointment(appointmentId);
  };

  const handleCompleteAppointment = async (appointmentId) => {
    await completeAppointment(appointmentId);
  };

  return (
    <section className="w-full">
      <div className="mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
          Doctor's Appointments
        </h2>
      </div>

      <div className="w-full bg-white rounded border border-gray-200">
        <div className="w-full overflow-x-auto">
          {/* Table Header */}
          <div className="min-w-190 grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col gap-4 px-6 py-4 bg-blue-50 border-b border-gray-200 text-sm font-medium text-gray-700">
            <div>#</div>
            <div>Patient</div>
            <div>Payment</div>
            <div>Age</div>
            <div>Date & Time</div>
            <div>Fees</div>
            <div className="w-8">Actions</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-100 min-w-190">
            {appointments?.reverse().map((appointment, index) => (
              <div
                key={appointment._id}
                className="grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] gap-4 px-6 py-4 items-center text-sm hover:bg-gray-50 transition"
              >
                {/* # */}
                <div className="text-gray-600">{index + 1}</div>

                {/* Patient */}
                <div className="flex items-center gap-3">
                  <img
                    src={appointment.userData.profilePicture}
                    alt={appointment.userData.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="text-gray-800">
                    {appointment.userData.name}
                  </span>
                </div>
                {/* payment */}
                <div className="flex">
                  <div
                    className={`text-[10px] font-medium px-2 py-1 rounded-full text-center ${
                      appointment.payment
                        ? "bg-gray100 border border-green-600"
                        : "bg-gray100 border border-red-600"
                    }`}
                  >
                    {appointment.payment ? "ONLINE" : "CASH"}
                  </div>
                </div>

                {/* Age */}
                <div className="text-gray-600">
                  {calculateAge(appointment.userData.dateOfBirth)}y
                </div>

                {/* Date & Time */}
                <div className="text-gray-600">
                  {appointment.slotDate.split("T")[0] +
                    " - " +
                    appointment.slotTime}
                </div>

                {/* Fees */}
                <div className="text-gray-800 font-medium">
                  ${appointment.amount}
                </div>

                {/* Cancel Button */}
                {appointment.cancelled ? (
                  <div
                    className="w-8 h-8 flex items-center justify-center rounded text-red-400"
                    title="Active appointment"
                  >
                    Cancelled
                  </div>
                ) : appointment.isCompleted ? (
                  <div
                    className="w-8 h-8 flex items-center justify-center rounded text-green-400"
                    title="Completed"
                  >
                    Completed
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCancelAppointment(appointment._id)}
                      className="w-8 h-8 pt-1 overflow-hidden flex items-center justify-center rounded-full cursor-pointer transition text-red-400 hover:text-red-600"
                      title="Cancel appointment"
                    >
                      <img src={assets.cancel_icon} alt="cancel icon" />
                    </button>

                    <button
                      onClick={() => handleCompleteAppointment(appointment._id)}
                      className="w-8 h-8 pt-1 overflow-hidden flex items-center justify-center rounded-full cursor-pointer transition text-green-400 hover:text-green-600"
                      title="Complete appointment"
                    >
                      <img src={assets.tick_icon} alt="tick icon" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {appointments.length === 0 && (
          <div className="px-6 py-12 text-center text-gray-500">
            No appointments found
          </div>
        )}
      </div>
    </section>
  );
};

export default DoctorAppointments;
