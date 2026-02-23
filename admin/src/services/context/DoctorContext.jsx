import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = ({ children }) => {
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

  const [doctorToken, setDoctorToken] = useState(
    localStorage.getItem("doctorToken")
      ? localStorage.getItem("doctorToken")
      : null,
  );

  const [appointments, setAppointments] = useState([]);
  const [dashboardData, setDashboardData] = useState(null);

  // get all doctor appointments and set in state
  const getDoctorAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/doctor/appointments`, {
        headers: {
          Authorization: `Bearer ${doctorToken}`,
        },
      });
      if (data.success) {
        // setAppointments(data.appointments.reverse());
        setAppointments(data.appointments);
      } else {
        toast.error(data.message || "Failed to fetch appointments");
      }
    } catch (error) {
      console.error("Error fetching doctor appointments:", error);
      toast.error(
        error.response?.data?.error ||
          error.message ||
          "Failed to fetch appointments",
      );
    }
  };

  // complete appointment
  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/doctor/complete-appointment`,
        { appointmentId },
        {
          headers: {
            Authorization: `Bearer ${doctorToken}`,
          },
        },
      );
      if (data.success) {
        getDoctorAppointments();
        toast.success(data.message || "Appointment marked as completed");
      } else {
        toast.error(data.message || "Failed to complete appointment");
      }
    } catch (error) {
      console.error("Error completing appointment:", error);
      toast.error(
        error.response?.data?.error ||
          error.message ||
          "Failed to complete appointment",
      );
    }
  };

  // cancel appointment
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/doctor/cancel-appointment`,
        { appointmentId },
        {
          headers: {
            Authorization: `Bearer ${doctorToken}`,
          },
        },
      );
      if (data.success) {
        getDoctorAppointments();
        toast.success(data.message || "Appointment cancelled successfully");
      } else {
        toast.error(data.message || "Failed to cancel appointment");
      }
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      toast.error(
        error.response?.data?.error ||
          error.message ||
          "Failed to cancel appointment",
      );
    }
  };

  // get doctor dashboard data
  const getDoctorDashboardData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/doctor/dashboard`, {
        headers: {
          Authorization: `Bearer ${doctorToken}`,
        },
      });
      if (data.success) {
        setDashboardData(data.dashboardData);
      } else {
        toast.error(data.message || "Failed to fetch dashboard data");
      }
    } catch (error) {
      console.error("Error fetching doctor dashboard data:", error);
      toast.error(
        error.response?.data?.error ||
          error.message ||
          "Failed to fetch dashboard data",
      );
    }
  };

  const value = {
    doctorToken,
    setDoctorToken,
    appointments,
    setAppointments,
    getDoctorAppointments,
    completeAppointment,
    cancelAppointment,
    dashboardData,
    getDoctorDashboardData,
  };
  return (
    <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
