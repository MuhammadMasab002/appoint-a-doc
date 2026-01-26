import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CustomFormInput, { INPUT_TYPES } from "../common/inputs/CustomFormInput";

import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";

// import Sidebar from "../layout/Sidebar";
import { NAV_ITEMS } from "../../constants/navigation";
import Sidebar from "./Sidebar";
import { assets } from "../../assets/assets";
import { logout } from "../../services/store/slices/authSlice";

const Header = () => {
  const [search, setSearch] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

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
    dispatch(logout());
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
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end
                  className={({ isActive }) =>
                    `text-sm font-medium transition
                    ${
                      isActive
                        ? "text-primary"
                        : "text-gray-700 hover:text-primary"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              {/* Search Desktop */}
              <div className="hidden md:block w-64">
                <CustomFormInput
                  placeholder="Search products..."
                  name="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type={INPUT_TYPES.SEARCH}
                  leftIcon={<SearchIcon fontSize="small" />}
                />
              </div>

              {/* Search Mobile */}
              <button className="md:hidden p-2 rounded-full hover:bg-gray-100">
                <SearchIcon />
              </button>

              {/* Profile */}
              <div ref={dropdownRef} className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="p-1 rounded-full bg-gray-100 hover:bg-primary/10 transition border border-transparent hover:border-blue-500 cursor-pointer"
                >
                  <img
                    className="w-9 h-9 rounded-full"
                    src={assets.profile_pic}
                    alt="profile pic"
                  />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 top-12 w-56 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-50">
                    {/* User Email */}
                    {user?.email && (
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-xs text-gray-500">Logged in as</p>
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {user.email}
                        </p>
                      </div>
                    )}

                    {/* Menu Items */}
                    <Link
                      to="/my-profile"
                      onClick={() => setIsDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                    >
                      My Profile
                    </Link>

                    <Link
                      to="/my-appointments"
                      onClick={() => setIsDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                    >
                      My Appointments
                    </Link>

                    {/* Logout */}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition flex items-center gap-2 border-t border-gray-100"
                    >
                      <LogoutIcon fontSize="small" />
                      Logout
                    </button>
                  </div>
                )}
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
