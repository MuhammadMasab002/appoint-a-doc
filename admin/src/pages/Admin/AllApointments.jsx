import React from "react";
import { AdminContext } from "../../services/context/AdminContext";
import { useContext } from "react";
import { useEffect } from "react";
import { AppContext } from "../../services/context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const AllApointments = () => {
  const { appointments, backendUrl, authToken, getAllAppointments } =
    useContext(AdminContext);
  const { calculateAge } = useContext(AppContext);

  useEffect(() => {
    if (authToken) {
      getAllAppointments();
    }
  }, [authToken]);

  const handleCancelAppointment = async (id) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/admin/cancel-appointment",
        { appointmentId: id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        },
      );
      if (data.success) {
        getAllAppointments();
        toast.success(data.message || "Appointment cancelled successfully");
      } else {
        toast.error(data.message || "Failed to cancel appointment");
      }
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      toast.error(
        error.response?.data?.message || "Failed to cancel appointment",
      );
    }
  };

  return (
    <section className="w-full">
      <div className="mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
          All Appointments
        </h2>
      </div>

      <div className="w-full bg-white rounded border border-gray-200">
        <div className="w-full overflow-x-auto">
          {/* Table Header */}
          <div className="min-w-[760px] grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col gap-4 px-6 py-4 bg-blue-50 border-b border-gray-200 text-sm font-medium text-gray-700">
            <div>#</div>
            <div>Patient</div>
            <div>Age</div>
            <div>Date & Time</div>
            <div>Doctor</div>
            <div>Fees</div>
            <div className="w-8">Actions</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-100 min-w-[760px]">
            {appointments?.map((appointment, index) => (
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

                {/* Age */}
                <div className="text-gray-600">
                  {calculateAge(appointment.userData.dateOfBirth)} y
                </div>

                {/* Date & Time */}
                <div className="text-gray-600">
                  {appointment.slotDate.split("T")[0] +
                    " - " +
                    appointment.slotTime}
                </div>

                {/* Doctor */}
                <div className="flex items-center gap-3">
                  <img
                    src={appointment.doctorData.profilePicture}
                    alt={appointment.doctorData.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="text-gray-800">
                    {appointment.doctorData.name}
                  </span>
                </div>

                {/* Fees */}
                <div className="text-gray-800 font-medium">
                  ${appointment.amount}
                </div>

                {/* Cancel Button */}
                {!appointment.cancelled ? (
                  <button
                    onClick={() => handleCancelAppointment(appointment._id)}
                    className="w-8 h-8 flex items-center justify-center rounded hover:bg-red-50 transition text-red-400 hover:text-red-600"
                    title="Cancel appointment"
                  >
                    ✕
                  </button>
                ) : (
                  <div
                    className="w-8 h-8 flex items-center justify-center rounded text-red-400"
                    title="Active appointment"
                  >
                    Cancelled
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

export default AllApointments;
