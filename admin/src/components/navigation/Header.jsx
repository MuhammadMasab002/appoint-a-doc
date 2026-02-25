import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

// import Sidebar from "../layout/Sidebar";
import Sidebar from "./Sidebar";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../services/context/AdminContext";
import { DoctorContext } from "../../services/context/DoctorContext";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigate = useNavigate();

  const { authToken, setAuthToken } = useContext(AdminContext);
  const { doctorToken, setDoctorToken, doctorData } = useContext(DoctorContext);
  // const user = null;

  const handleLogout = () => {
    // logout api call for admin
    authToken && setAuthToken(null);
    authToken && localStorage.removeItem("adminToken");

    // logout api call for doctor
    doctorToken && setDoctorToken(null);
    doctorToken && localStorage.removeItem("doctorToken");

    navigate("/");
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Left: Menu + Logo */}
            <div className="flex items-center gap-3">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 rounded-full hover:bg-gray-100 transition"
              >
                <MenuIcon />
              </button>

              {/* Logo */}
              <Link
                to={
                  authToken
                    ? "/admin-dashboard"
                    : doctorToken
                      ? "/doctor-dashboard"
                      : "/"
                }
                className="text-xl font-bold text-gray-900 hover:text-primary transition"
              >
                <img
                  className="w-40 h-auto"
                  src={assets.admin_logo}
                  alt="Logo"
                />
                {/* Logo<span className="text-primary">here</span> */}
              </Link>
              <button className="p-1 rounded-full bg-gray-100 hover:bg-primary/10 transition border border-gray-300 cursor-pointer">
                <p className="text-xs font-medium text-gray-700 px-3 py-0.5">
                  {authToken ? "Admin" : "Doctor"}
                </p>
              </button>
            </div>

            {/* display doctor email if logged in as doctor */}
            {doctorToken && (
              <div className="w-full hidden md:flex flex-col items-end justify-center gap-1 px-4">
                <p className="text-sm text-gray-700">{doctorData?.email}</p>
              </div>
            )}

            {/* Right Actions */}
            <div className="space-x-4">
              <button
                onClick={handleLogout}
                className="p-1 rounded-full bg-gray-100 hover:bg-primary/10 transition border border-blue-500 cursor-pointer"
              >
                <p className="text-xs font-medium text-gray-700 px-3 py-0.5">
                  Logout
                </p>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
};

export default Header;
