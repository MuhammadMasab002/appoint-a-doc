import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const calculateAge = (dob) => {
    if (!dob) return 0;

    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();

    return age;
  };

  const value = {
    calculateAge,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
