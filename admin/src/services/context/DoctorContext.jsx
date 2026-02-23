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

  // get all doctor appointments and set in state
  const getDoctorAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/doctor/appointments`, {
        headers: {
          Authorization: `Bearer ${doctorToken}`,
        },
      });
      if (data.success) {
        setAppointments(data.appointments.reverse());
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

  const value = {
    doctorToken,
    setDoctorToken,
    appointments,
    setAppointments,
    getDoctorAppointments,
  };
  return (
    <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
