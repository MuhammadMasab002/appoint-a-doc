import React, { useContext, useEffect, useState } from "react";
import CustomButton, {
  BUTTON_VARIANTS,
} from "../components/common/buttons/CustomButton";
import axios from "axios";
import { AppContext } from "../services/context/AppContext";

const MyAppointments = () => {
  const { backendUrl, token, currencySymbol } = useContext(AppContext);
  
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(
          backendUrl + "/user/list-appointments",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (data.success) {
          setAppointments(data.data);
        } else {
          console.error(data.message || "Failed to fetch appointments");
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, [backendUrl, token]);

  const parseDoctorAddress = (addressValue) => {
    if (!addressValue) return { line1: "", line2: "" };

    if (typeof addressValue === "object") {
      return {
        line1: addressValue.line1 || "",
        line2: addressValue.line2 || "",
      };
    }

    if (typeof addressValue === "string") {
      try {
        let parsed = JSON.parse(addressValue);

        if (typeof parsed === "string") {
          parsed = JSON.parse(parsed);
        }

        return {
          line1: parsed?.line1 || "",
          line2: parsed?.line2 || "",
        };
      } catch {
        return { line1: addressValue, line2: "" };
      }
    }

    return { line1: "", line2: "" };
  };

  const formatAppointmentDateTime = (slotDate, slotTime) => {
    if (!slotDate) return slotTime || "-";

    const date = new Date(slotDate);
    const formattedDate = Number.isNaN(date.getTime())
      ? slotDate
      : date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });

    return `${formattedDate} | ${slotTime || "-"}`;
  };

  const handlePayOnline = (appointmentId) => {
    setAppointments(
      appointments.map((apt) =>
        apt._id === appointmentId ? { ...apt, showPayment: true } : apt,
      ),
    );
  };

  const handleCancelAppointment = (appointmentId) => {
    setAppointments(
      appointments.map((apt) =>
        apt._id === appointmentId ? { ...apt, cancelled: true } : apt,
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
          {appointments?.map((appointment) => (
            <div
              key={appointment._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6 sm:p-8">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Doctor Image */}
                  <div className="shrink-0">
                    <div className="w-36 h-36 sm:w-44 sm:h-44 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-xl overflow-hidden">
                      <img
                        src={appointment.doctorData?.profilePicture}
                        alt={appointment.doctorData?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Appointment Details */}
                  <div className="flex-1">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                      {appointment.doctorData?.name || "Doctor"}
                    </h2>
                    <p className="text-gray-600 font-medium mb-4">
                      {appointment.doctorData?.speciality || "-"}
                    </p>

                    <div className="space-y-2">
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-1">
                          Address:
                        </p>
                        <p className="text-gray-600 text-sm">
                          {parseDoctorAddress(appointment.doctorData?.address).line1 ||
                            "-"}
                        </p>
                        <p className="text-gray-600 text-sm">
                          {parseDoctorAddress(appointment.doctorData?.address).line2}
                        </p>
                      </div>

                      <div className="pt-2">
                        <p className="text-sm font-semibold text-gray-700">
                          <span className="text-gray-900">Date & Time:</span>{" "}
                          {formatAppointmentDateTime(
                            appointment.slotDate,
                            appointment.slotTime,
                          )}
                        </p>
                        <p className="text-sm font-semibold text-gray-700 mt-1">
                          <span className="text-gray-900">Amount:</span>{" "}
                          {currencySymbol}
                          {appointment.amount}
                        </p>
                        <p className="text-sm font-semibold text-gray-700 mt-1">
                          <span className="text-gray-900">Payment:</span>{" "}
                          {appointment.payment ? "Paid" : "Pending"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col justify-center gap-3 lg:min-w-[200px]">
                    {appointment.cancelled === true ? (
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
                              onClick={() => handlePayOnline(appointment._id)}
                              variant={BUTTON_VARIANTS.OUTLINE}
                              fullWidth={false}
                              className="border-2 border-gray-300 text-gray-700 hover:bg-blue-600! hover:text-white hover:border-blue-600 px-6 focus:ring-2 focus:ring-blue-600!"
                            />
                            <CustomButton
                              text="Cancel appointment"
                              onClick={() =>
                                handleCancelAppointment(appointment._id)
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
                                handleCancelAppointment(appointment._id)
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
