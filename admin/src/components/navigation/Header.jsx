import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import CustomFormInput, { INPUT_TYPES } from "../common/inputs/CustomFormInput";

import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";

// import Sidebar from "../layout/Sidebar";
import { NAV_ITEMS } from "../../constants/navigation";
import Sidebar from "./Sidebar";
import { assets } from "../../assets/assets";

const Header = () => {
  const [search, setSearch] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();
  const user = null;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    // logout api call can be added here
    setIsDropdownOpen(false);
    navigate("/signin");
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
                to="/"
                className="text-xl font-bold text-gray-900 hover:text-primary transition"
              >
                <img className="w-40 h-auto" src={assets.logo} alt="Logo" />
                {/* Logo<span className="text-primary">here</span> */}
              </Link>
              <button className="p-1 rounded-full bg-gray-100 hover:bg-primary/10 transition border border-gray-300 cursor-pointer">
                <p className="text-xs font-medium text-gray-700 px-3 py-0.5">
                  Admin
                </p>
              </button>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              {/* Search Mobile */}
              <button className="md:hidden p-2 rounded-full hover:bg-gray-100">
                <SearchIcon />
              </button>

              {/* Profile */}
              <div className="space-x-4">
                <button className="p-1 rounded-full bg-gray-100 hover:bg-primary/10 transition border border-blue-500 cursor-pointer">
                  <p className="text-xs font-medium text-gray-700 px-3 py-0.5">
                    Logout
                  </p>
                </button>
              </div>
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
