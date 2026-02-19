import React from "react";
import { Link, NavLink } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { NAV_ITEMS } from "../../constants/navigation";
import { assets } from "../../assets/assets";
import { useContext } from "react";
import { AppContext } from "../../services/context/AppContext";

const Sidebar = ({ isOpen, onClose }) => {
  const { token } = useContext(AppContext);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity
        ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50
        transform transition-transform duration-300 overflow-y-auto
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 h-16 border-b sticky top-0 bg-white">
          <h2 className="text-lg font-bold">
            <Link to="/" onClick={onClose}>
              <img className="w-40 h-auto" src={assets.logo} alt="Logo" />
            </Link>
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col p-4 gap-2">
          {NAV_ITEMS?.map((item) =>
            !token || item.label !== "Sign Up" ? (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-lg text-sm font-medium transition
                ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-gray-700 hover:bg-gray-100"
                }`
                }
              >
                {item.label}
              </NavLink>
            ) : null,
          )}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
