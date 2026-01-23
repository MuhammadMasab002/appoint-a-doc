import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import CustomFormInput, { INPUT_TYPES } from "../common/inputs/CustomFormInput";

import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MenuIcon from "@mui/icons-material/Menu";

// import Sidebar from "../layout/Sidebar";
import { NAV_ITEMS } from "../../constants/navigation";
import Sidebar from "./Sidebar";

const Header = () => {
  const [search, setSearch] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur border-b">
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
                Logo<span className="text-primary">here</span>
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
              <Link
                to="/my-profile"
                className="p-2 rounded-full bg-gray-100 hover:bg-primary/10"
              >
                <PersonOutlineIcon />
              </Link>
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
