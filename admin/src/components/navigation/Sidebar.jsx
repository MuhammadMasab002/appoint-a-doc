import React from "react";
import { NavLink } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { ADMIN_NAV_ITEMS, DOCTOR_NAV_ITEMS } from "../../constants/navigation";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../services/context/AdminContext";
import { useContext } from "react";
import { DoctorContext } from "../../services/context/DoctorContext";

const Sidebar = ({ isOpen = false, onClose, variant = "mobile" }) => {
  const { authToken } = useContext(AdminContext);
  const { doctorToken, doctorData } = useContext(DoctorContext);

  const isDesktop = variant === "desktop";
  const isVisible = isDesktop ? true : isOpen;

  return (
    <>
      {/* Overlay */}
      {!isDesktop && (
        <div
          onClick={onClose}
          className={`fixed inset-0 bg-black/40 z-40 transition-opacity
          ${isVisible ? "opacity-100 visible" : "opacity-0 invisible"}`}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${
          isDesktop
            ? "sticky top-20 h-[calc(100vh-4rem)] w-72"
            : "fixed top-0 left-0 h-full w-72 z-50"
        } bg-white border-r border-blue-400 shadow-sm overflow-y-auto
        transform transition-transform duration-300
        ${isVisible ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        {!isDesktop && (
          <div className="flex items-center justify-between px-4 h-16 border-b z-10 sticky top-0 bg-white">
            {/* <Link to="/" onClick={onClose}> */}
            <div className="w-40 h-10">
              <img
                className="w-full h-full object-contain"
                src={assets.admin_logo}
                alt="Logo"
              />
            </div>
            {/* </Link> */}
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <CloseIcon />
            </button>
          </div>
        )}

        {/* Navigation */}
        {authToken && (
          <nav className="flex flex-col p-4 gap-2">
            {ADMIN_NAV_ITEMS?.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `relative px-4 py-3 rounded-lg text-sm font-medium transition
                ${
                  isActive
                    ? "bg-primary/10 text-primary border-l-4 border-primary pl-3"
                    : "text-gray-700 hover:bg-gray-100"
                }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        )}
        {doctorToken && (
          <nav className="flex flex-col p-4 gap-2">
            {DOCTOR_NAV_ITEMS?.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `relative px-4 py-3 rounded-lg text-sm font-medium transition
                ${
                  isActive
                    ? "bg-primary/10 text-primary border-l-4 border-primary pl-3"
                    : "text-gray-700 hover:bg-gray-100"
                }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        )}

        <div className="h-3/5 flex items-end pb-2 lg:hidden">
          {doctorToken && (
            <div className="w-full py-2 px-4 flex flex-col items-start justify-center gap-1">
              <p className="text-sm text-gray-700">{doctorData?.email}</p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
