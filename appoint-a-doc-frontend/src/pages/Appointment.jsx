import React, { useContext, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../services/context/AppContext";
import CustomButton from "../components/common/buttons/CustomButton";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const { doc_id } = useParams();
  const navigate = useNavigate();
  const { doctors, currencySymbol, backendUrl, token, getAllDoctors } =
    useContext(AppContext);

  // Initialize selectedDate with today's date
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  const [selectedTime, setSelectedTime] = useState(null);

  // Find the doctor by ID
  const doctor = doctors.find((doc) => doc._id === doc_id);

  const bookedSlotsForSelectedDate = useMemo(
    () => doctor?.slots_booked?.[selectedDate] || [],
    [doctor, selectedDate],
  );

  const availableTimeSlots = useMemo(() => {
    const timeSlots = [
      "10:00 am",
      "11:00 am",
      "11:30 am",
      "12:00 pm",
      "12:30 pm",
      "01:00 pm",
      "01:30 pm",
      "02:00 pm",
    ];

    return timeSlots.filter(
      (time) => !bookedSlotsForSelectedDate.includes(time),
    );
  }, [bookedSlotsForSelectedDate]);

  const effectiveSelectedTime =
    selectedTime && !bookedSlotsForSelectedDate.includes(selectedTime)
      ? selectedTime
      : null;

  // Generate next 7 days
  const getDaysArray = () => {
    const days = [];
    const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push({
        dayName: dayNames[date.getDay()],
        dayDate: date.getDate(),
        fullDate: date.toISOString().split("T")[0],
      });
    }
    return days;
  };

  const daysArray = getDaysArray();

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Doctor not found
          </h1>
          <button
            onClick={() => navigate("/doctors")}
            className="text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
          >
            Back to Doctors
          </button>
        </div>
      </div>
    );
  }

  const handleBookAppointment = async () => {
    if (!selectedDate || !effectiveSelectedTime) {
      toast.warn("Please select an available date and time");
      return;
    }

    if (!token) {
      toast.warn("Please login to book an appointment");
      navigate("/login");
      return;
    }

    // book appointment api call
    try {
      const { data } = await axios.post(
        backendUrl + "/user/book-appointment",
        {
          doctorId: doctor._id,
          slotDate: selectedDate,
          slotTime: effectiveSelectedTime,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (data.success) {
        toast.success("Appointment booked successfully");
        getAllDoctors(); // Refresh the list of doctors
        navigate("/my-appointments");
      } else {
        toast.error("Failed to book appointment");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast.error(
        "Error booking appointment: " +
          (error.response?.data?.message || error.message),
      );
    }
  };

  const relatedDoctors = doctors.filter(
    (doc) => doc.speciality === doctor.speciality && doc._id !== doctor._id,
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Doctor Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
            {/* Doctor Image */}
            <div className="flex justify-center md:justify-start">
              <div className="bg-blue-100 rounded-lg overflow-hidden w-80 h-80">
                <img
                  src={doctor.profilePicture}
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Doctor Info */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-3xl font-bold text-gray-900">
                  {doctor.name}
                </h1>
                <span className="text-blue-600 text-2xl">✓</span>
              </div>

              <p className="text-lg text-gray-600 mb-2">{doctor.speciality}</p>
              {doctor.experience && (
                <p className="text-gray-600 mb-4">
                  {doctor.experience} Years of Experience
                </p>
              )}

              {/* About Section */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  About
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {doctor.about ||
                    "Dr. " +
                      doctor.name +
                      " has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies."}
                </p>
              </div>

              {/* Appointment Fee */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  Appointment fee:{" "}
                  <span className="text-xl font-bold text-blue-600">
                    ${doctor.fees}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Booking Slots
          </h2>

          {/* Date Selection */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Select Date
            </h3>
            <div className="flex flex-wrap justify-center sm:justify-start gap-3 overflow-x-auto pb-4">
              {daysArray.map((day, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedDate(day.fullDate);
                    setSelectedTime(null);
                  }}
                  className={`flex flex-col items-center justify-center w-16 h-20 rounded-full font-semibold transition-all duration-300 minw-fit ${
                    selectedDate === day.fullDate
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-600"
                  }`}
                >
                  <span className="text-sm">{day.dayName}</span>
                  <span className="text-lg font-bold">{day.dayDate}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Time Selection */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Select Time
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
              {availableTimeSlots.map((time, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedTime(time)}
                  className={`py-3 px-2 text-sm font-semibold rounded-lg transition-all duration-300 ${
                    selectedTime === time
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
            {availableTimeSlots.length === 0 && (
              <p className="text-gray-600 mt-4">
                No available slots for this date. Please select another date.
              </p>
            )}
          </div>

          {/* Selected Details Summary */}
          {selectedDate && effectiveSelectedTime && (
            <div className="bg-blue-50 p-6 rounded-lg mb-8">
              <div className="flex flex-col sm:flex-row gap-8">
                <div className="flex items-center gap-3">
                  <CalendarTodayIcon className="text-blue-600" />
                  <div>
                    <p className="text-gray-600 text-sm">Date</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {selectedDate}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <AccessTimeIcon className="text-blue-600" />
                  <div>
                    <p className="text-gray-600 text-sm">Time</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {effectiveSelectedTime}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Book Appointment Button */}
          <button
            onClick={handleBookAppointment}
            className="w-full bg-blue-600 text-white py-4 px-6 rounded-full font-bold text-lg hover:bg-blue-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!selectedDate || !effectiveSelectedTime}
          >
            Book an appointment
          </button>
        </div>

        {/* Related Doctors Section */}
        <div className="mt-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
              Related Doctors
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Simply browse through our extensive list of trusted doctors.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedDoctors && relatedDoctors.length > 0 ? (
              relatedDoctors.slice(0, 4).map((relatedDoctor) => (
                <button
                  key={relatedDoctor._id}
                  onClick={() => navigate(`/appointment/${relatedDoctor._id}`)}
                  className="group cursor-pointer hover:scale-105 transition-transform duration-300 text-left"
                >
                  <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                    {/* Doctor Image */}
                    <div className="bg-blue-100 h-56 overflow-hidden flex items-center justify-center">
                      <img
                        src={relatedDoctor.profilePicture}
                        alt={relatedDoctor.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>

                    {/* Doctor Info */}
                    <div className="p-4">
                      {/* Available Badge */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-green-600 text-sm font-medium">
                          Available
                        </span>
                      </div>

                      {/* Doctor Name */}
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {relatedDoctor.name}
                      </h3>

                      {/* Specialty */}
                      <p className="text-gray-600 text-sm">
                        {relatedDoctor.speciality}
                      </p>
                    </div>
                  </div>
                </button>
              ))
            ) : (
              <p className="text-gray-600 text-center col-span-full">
                No related doctors available at the moment.
              </p>
            )}
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-16 text-center">
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
