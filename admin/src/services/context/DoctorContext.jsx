import { createContext, useState } from "react";

export const DoctorContext = createContext();

const DoctorContextProvider = ({ children }) => {
  const [doctorToken, setDoctorToken] = useState(
    localStorage.getItem("doctorToken")
      ? localStorage.getItem("doctorToken")
      : null,
  );

  const value = {
    doctorToken,
    setDoctorToken,
  };
  return (
    <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
