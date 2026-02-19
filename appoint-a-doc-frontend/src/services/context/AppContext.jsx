import { createContext } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const currencySymbol = "$";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : "",
  );

  useEffect(() => {
    const getAllDoctors = async () => {
      try {
        // Fetch doctors from the backend API
        const { data } = await axios.get(backendUrl + "/doctor/list");
        if (data.success) {
          // Update the doctors state with fetched data
          setDoctors(data.doctors);
        } else {
          console.error(data.message || "Failed to fetch doctors");
          toast.error(data.message || "Failed to fetch doctors");
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
        toast.error(
          "Error fetching doctors: " +
            (error.response?.data?.message || error.message),
        );
      }
    };

    getAllDoctors();
  }, [backendUrl]);

  const value = {
    doctors,
    currencySymbol,
    backendUrl,
    token,
    setToken,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
