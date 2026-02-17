import React, { useState } from "react";
import { doctors } from "../../assets/assets";

const Dashboard = () => {
  // Mock dashboard stats
  const stats = [
    {
      id: 1,
      icon: "👨‍⚕️",
      count: 14,
      label: "Doctors",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-500",
    },
    {
      id: 2,
      icon: "📋",
      count: 2,
      label: "Appointments",
      bgColor: "bg-indigo-50",
      iconColor: "text-indigo-500",
    },
    {
      id: 3,
      icon: "👤",
      count: 5,
      label: "Patients",
      bgColor: "bg-cyan-50",
      iconColor: "text-cyan-500",
    },
  ];

  // Mock latest appointments
  const [latestAppointments, setLatestAppointments] = useState([
    {
      id: 1,
      doctorName: "Dr. Richard James",
      doctorImage: doctors[0].image,
      bookingDate: "24th July, 2024",
    },
    {
      id: 2,
      doctorName: "Dr. Richard James",
      doctorImage: doctors[1].image,
      bookingDate: "24th July, 2024",
    },
    {
      id: 3,
      doctorName: "Dr. Richard James",
      doctorImage: doctors[2].image,
      bookingDate: "24th July, 2024",
    },
    {
      id: 4,
      doctorName: "Dr. Richard James",
      doctorImage: doctors[3].image,
      bookingDate: "24th July, 2024",
    },
    {
      id: 5,
      doctorName: "Dr. Richard James",
      doctorImage: doctors[4].image,
      bookingDate: "24th July, 2024",
    },
  ]);

  const handleCancelAppointment = (id) => {
    setLatestAppointments(
      latestAppointments.filter((appointment) => appointment.id !== id),
    );
  };

  return (
    <section className="w-full">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition"
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-14 h-14 ${stat.bgColor} rounded-full flex items-center justify-center text-2xl`}
              >
                {stat.icon}
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{stat.count}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Latest Appointment Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-indigo-500 text-xl">📋</span>
          <h2 className="text-lg font-semibold text-gray-800">
            Latest Appointment
          </h2>
        </div>

        <div className="space-y-3">
          {latestAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 rounded px-2 transition"
            >
              <div className="flex items-center gap-3">
                <img
                  src={appointment.doctorImage}
                  alt={appointment.doctorName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {appointment.doctorName}
                  </p>
                  <p className="text-xs text-gray-500">
                    Booking on {appointment.bookingDate}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleCancelAppointment(appointment.id)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-50 transition text-red-400 hover:text-red-600"
                title="Cancel appointment"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {latestAppointments.length === 0 && (
          <div className="py-12 text-center text-gray-500 text-sm">
            No appointments yet
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
