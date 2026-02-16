import { createContext, useState } from "react";

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("adminToken")
      ? localStorage.getItem("adminToken")
      : null,
  );

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const value = {
    authToken,
    setAuthToken,
    backendUrl,
  };
  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export default AdminContextProvider;
