import React, { useState } from "react";
import { doctors } from "../../assets/assets";

const AllApointments = () => {
  // Mock appointments data
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: "Richard James",
      patientImage: doctors[0].image,
      department: "Richard James",
      age: 28,
      dateTime: "24th July, 2024, 10:AM",
      doctor: {
        name: "Dr. Richard James",
        image: doctors[0].image,
      },
      fees: 50,
    },
    {
      id: 2,
      patientName: "Richard James",
      patientImage: doctors[1].image,
      department: "Richard James",
      age: 28,
      dateTime: "24th July, 2024, 10:AM",
      doctor: {
        name: "Dr. Richard James",
        image: doctors[1].image,
      },
      fees: 50,
    },
  ]);

  const handleCancelAppointment = (id) => {
    setAppointments(appointments.filter((app) => app.id !== id));
  };

  return (
    <section className="w-full">
      <div className="mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
          All Appointments
        </h2>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-[auto_1fr_1fr_auto_1.5fr_1fr_auto_auto] gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-700">
          <div>#</div>
          <div>Patient</div>
          <div>Department</div>
          <div>Age</div>
          <div>Date & Time</div>
          <div>Doctor</div>
          <div>Fees</div>
          <div className="w-8"></div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-100">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="grid grid-cols-[auto_1fr_1fr_auto_1.5fr_1fr_auto_auto] gap-4 px-6 py-4 items-center text-sm hover:bg-gray-50 transition"
            >
              {/* # */}
              <div className="text-gray-600">{appointment.id}</div>

              {/* Patient */}
              <div className="flex items-center gap-3">
                <img
                  src={appointment.patientImage}
                  alt={appointment.patientName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="text-gray-800">{appointment.patientName}</span>
              </div>

              {/* Department */}
              <div className="text-gray-600">{appointment.department}</div>

              {/* Age */}
              <div className="text-gray-600">{appointment.age}</div>

              {/* Date & Time */}
              <div className="text-gray-600">{appointment.dateTime}</div>

              {/* Doctor */}
              <div className="flex items-center gap-3">
                <img
                  src={appointment.doctor.image}
                  alt={appointment.doctor.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="text-gray-800">{appointment.doctor.name}</span>
              </div>

              {/* Fees */}
              <div className="text-gray-800 font-medium">
                ${appointment.fees}
              </div>

              {/* Cancel Button */}
              <button
                onClick={() => handleCancelAppointment(appointment.id)}
                className="w-8 h-8 flex items-center justify-center rounded hover:bg-red-50 transition text-red-400 hover:text-red-600"
                title="Cancel appointment"
              >
                ✕
              </button>
            </div>
          ))}
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
