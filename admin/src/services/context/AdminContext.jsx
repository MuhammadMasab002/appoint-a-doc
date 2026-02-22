import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("adminToken")
      ? localStorage.getItem("adminToken")
      : null,
  );

  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getAllDoctors = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/admin/all-doctors", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (data.success) {
        setDoctors(data.doctors); // Update the doctors state with fetched data
      } else {
        toast.error(data.message || "Failed to fetch doctors");
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
      toast.error(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Failed to fetch doctors",
      );
    }
  };

  const changeDoctorAvailability = async (doctorId) => {
    try {
      const { data } = await axios.put(
        backendUrl + "/admin/change-availability",
        { doctorId },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      );
      if (data.success) {
        toast.success(
          data.message || "Doctor availability updated successfully",
        );
        getAllDoctors(); // Refresh the list of doctors after updating availability
      } else {
        toast.error(data.message || "Failed to update doctor availability");
      }
    } catch (error) {
      console.error("Error changing doctor availability:", error);
      toast.error(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Failed to change doctor availability",
      );
    }
  };

  // get all appointments for admin
  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/admin/appointments", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (data.success) {
        setAppointments(data.appointments);
      } else {
        toast.error(data.message || "Failed to fetch appointments");
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Failed to fetch appointments",
      );
    }
  };

  const value = {
    authToken,
    setAuthToken,
    backendUrl,
    doctors,
    getAllDoctors,
    changeDoctorAvailability,
    appointments,
    setAppointments,
    getAllAppointments,
  };
  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export default AdminContextProvider;
