import React, { useState } from "react";
import CustomButton, {
  BUTTON_VARIANTS,
} from "../components/common/buttons/CustomButton";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctor: {
        name: "Dr. Andrew Williams",
        speciality: "Gastroenterologist",
        image: "https://via.placeholder.com/150",
      },
      address: {
        line1: "57th Cross, Richmond",
        line2: "Circle, Ring Road, London",
      },
      dateTime: "7 Mar 2026 | 10:30 AM",
      status: "cancelled",
      showPayment: false,
    },
    {
      id: 2,
      doctor: {
        name: "Dr. Andrew Williams",
        speciality: "Gastroenterologist",
        image: "https://via.placeholder.com/150",
      },
      address: {
        line1: "57th Cross, Richmond",
        line2: "Circle, Ring Road, London",
      },
      dateTime: "5 Mar 2026 | 10:30 AM",
      status: "active",
      showPayment: false,
    },
    {
      id: 3,
      doctor: {
        name: "Dr. Sarah Patel",
        speciality: "Dermatologist",
        image: "https://via.placeholder.com/150",
      },
      address: {
        line1: "37th Cross, Richmond",
        line2: "Circle, Ring Road, London",
      },
      dateTime: "6 Mar 2026 | 11:00 AM",
      status: "active",
      showPayment: false,
    },
  ]);

  const handlePayOnline = (appointmentId) => {
    setAppointments(
      appointments.map((apt) =>
        apt.id === appointmentId ? { ...apt, showPayment: true } : apt,
      ),
    );
  };

  const handleCancelAppointment = (appointmentId) => {
    setAppointments(
      appointments.map((apt) =>
        apt.id === appointmentId ? { ...apt, status: "cancelled" } : apt,
      ),
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            My appointments
          </h1>
        </div>

        {/* Appointments List */}
        <div className="space-y-6">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6 sm:p-8">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Doctor Image */}
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 sm:w-36 sm:h-36 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-xl overflow-hidden">
                      <img
                        src={appointment.doctor.image}
                        alt={appointment.doctor.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Appointment Details */}
                  <div className="flex-1">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                      {appointment.doctor.name}
                    </h2>
                    <p className="text-gray-600 font-medium mb-4">
                      {appointment.doctor.speciality}
                    </p>

                    <div className="space-y-2">
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-1">
                          Address:
                        </p>
                        <p className="text-gray-600 text-sm">
                          {appointment.address.line1}
                        </p>
                        <p className="text-gray-600 text-sm">
                          {appointment.address.line2}
                        </p>
                      </div>

                      <div className="pt-2">
                        <p className="text-sm font-semibold text-gray-700">
                          <span className="text-gray-900">Date & Time:</span>{" "}
                          {appointment.dateTime}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col justify-center gap-3 lg:min-w-[200px]">
                    {appointment.status === "cancelled" ? (
                      <CustomButton
                        text="Appointment cancelled"
                        disabled={true}
                        variant={BUTTON_VARIANTS.OUTLINE}
                        fullWidth={false}
                        className="border-2 border-red-400 text-red-500 cursor-not-allowed px-6"
                      />
                    ) : (
                      <>
                        {!appointment.showPayment ? (
                          <>
                            <CustomButton
                              text="Pay Online"
                              onClick={() => handlePayOnline(appointment.id)}
                              variant={BUTTON_VARIANTS.OUTLINE}
                              fullWidth={false}
                              className="border-2 border-gray-300 text-gray-700 hover:bg-blue-600! hover:text-white hover:border-blue-600 px-6 focus:ring-2 focus:ring-blue-600!"
                            />
                            <CustomButton
                              text="Cancel appointment"
                              onClick={() =>
                                handleCancelAppointment(appointment.id)
                              }
                              variant={BUTTON_VARIANTS.OUTLINE}
                              fullWidth={false}
                              className="border-2 border-gray-300 text-gray-700 hover:bg-red-600 hover:text-white hover:border-red-600 px-6"
                            />
                          </>
                        ) : (
                          <>
                            {/* Payment Options */}
                            <CustomButton
                              text={"stripe"}
                              variant={BUTTON_VARIANTS.OUTLINE}
                              fullWidth={true}
                              className="border-2 border-blue-600! hover:bg-blue-50! px-6 focus:ring-2 focus:ring-blue-600!"
                            />
                            <CustomButton
                              text={"Razor pay"}
                              variant={BUTTON_VARIANTS.OUTLINE}
                              fullWidth={true}
                              className="border-2 border-blue-600! hover:bg-blue-50! px-6 focus:ring-2 focus:ring-blue-600!"
                            />
                            <CustomButton
                              text="Cancel appointment"
                              onClick={() =>
                                handleCancelAppointment(appointment.id)
                              }
                              variant={BUTTON_VARIANTS.OUTLINE}
                              fullWidth={true}
                              className="border-2 border-gray-300 text-gray-700 hover:bg-red-600 hover:text-white hover:border-red-600 px-6 focus:ring-2 focus:ring-red-600"
                            />
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyAppointments;
