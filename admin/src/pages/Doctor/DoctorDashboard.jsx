import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../services/context/DoctorContext";
import { assets } from "../../assets/assets";

const DoctorDashboard = () => {
  const { doctorToken, dashboardData, getDoctorDashboardData } =
    useContext(DoctorContext);

  useEffect(() => {
    if (doctorToken) {
      getDoctorDashboardData();
    }
  }, [doctorToken]);

  const latestAppointments = dashboardData?.latestAppointments || [];

  // handle cancel appointment
  const handleCancelAppointment = (id) => {
    // Implement cancellation logic here
    alert("Cancel appointment with ID: " + id);
  };

  return (
    <section className="w-full">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition">
          <div className="flex items-center gap-4">
            <div
              className={`w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-2xl`}
            >
              {/* 🩺 */}
              <img src={assets.earning_icon} />
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-500">
                ${dashboardData?.earnings || 0}
              </p>
              <p className="text-sm text-gray-600">Earning</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition">
          <div className="flex items-center gap-4">
            <div
              className={`w-14 h-14 bg-green-50 rounded-full flex items-center justify-center text-2xl`}
            >
              <img src={assets.appointments_icon} />
            </div>
            <div>
              <p className="text-2xl font-bold text-green-500">
                {dashboardData?.appointments}
              </p>
              <p className="text-sm text-gray-600">Appointments</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition">
          <div className="flex items-center gap-4">
            <div
              className={`w-14 h-14 bg-purple-50 rounded-full flex items-center justify-center text-2xl`}
            >
              <img src={assets.patients_icon} />
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-500">
                {dashboardData?.patients || 0}
              </p>
              <p className="text-sm text-gray-600">Patients</p>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Appointment Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-6">
          <img src={assets.list_icon} />
          <h2 className="text-lg font-semibold text-gray-800">
            Latest Appointment
          </h2>
        </div>

        <div className="space-y-3">
          {latestAppointments?.map((appointment) => (
            <div
              key={appointment._id}
              className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 rounded px-2 transition"
            >
              <div className="flex items-center gap-3">
                <img
                  src={appointment.userData.profilePicture}
                  alt={appointment.userData.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {appointment.userData.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    Booking on {appointment?.slotDate?.split("T")?.[0] || "-"}{" "}
                    at {appointment.slotTime}
                  </p>
                </div>
              </div>
              {appointment.cancelled ? (
                <div
                  className={`text-[10px] font-medium px-2 py-1 rounded-full text-center bg-gray100 border border-red-600 text-red-600`}
                >
                  Cancelled
                </div>
              ) : appointment.isCompleted ? (
                <div
                  className={`text-[10px] font-medium px-2 py-1 rounded-full text-center bg-gray100 border border-green-600 text-green-600`}
                >
                  Completed
                </div>
              ) : (
                <button
                  onClick={() => handleCancelAppointment(appointment._id)}
                  className="w-8 h-8 pt-1 overflow-hidden flex items-center justify-center rounded-full cursor-pointer transition text-red-400 hover:text-red-600"
                  title="Cancel appointment"
                >
                  <img src={assets.cancel_icon} alt="cancel icon" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {latestAppointments?.length === 0 && (
          <div className="py-12 text-center text-gray-500 text-sm">
            No appointments yet
          </div>
        )}
      </div>
    </section>
  );
};

export default DoctorDashboard;
