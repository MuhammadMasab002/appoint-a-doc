import { createContext } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useCallback } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const currencySymbol = "$";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : "",
  );

  const [userData, setUserData] = useState("");

  // fetch all doctors data
  const getAllDoctors = useCallback(async () => {
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
  }, [backendUrl]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      getAllDoctors();
    }, 0);

    return () => clearTimeout(timerId);
  }, [backendUrl, getAllDoctors]);

  // fetch user profile data
  const loadUserProfileData = useCallback(async () => {
    try {
      const { data } = await axios.get(backendUrl + "/user/get-profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.success) {
        setUserData(data.user);
      } else {
        toast.error(data.message || "Failed to load user data");
      }
    } catch (error) {
      console.error("Error loading user data:", error);
      toast.error(
        "Error loading user data: " +
          (error.response?.data?.error || error.response?.data?.message),
      );
    }
  }, [backendUrl, token]);

  useEffect(() => {
    if (token) {
      // loadUserProfileData();
      const timerId = setTimeout(() => {
        loadUserProfileData();
      }, 0);

      return () => clearTimeout(timerId);
    }
  }, [token, loadUserProfileData]);

  const value = {
    doctors,
    getAllDoctors,
    currencySymbol,
    backendUrl,
    token,
    setToken,
    userData: token ? userData : "",
    setUserData,
    loadUserProfileData,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
