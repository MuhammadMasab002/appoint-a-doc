import React, { useContext } from "react";
import { Link } from "react-router-dom";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { assets } from "../../assets/assets";
import { AppContext } from "../../services/context/AppContext";

const Footer = () => {
  const { token } = useContext(AppContext);
  return (
    <footer className="bg-black/10 text-black mt-10 pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h3 className="text-2xl font-bold">
              <Link to="/">
                <img className="w-40 h-auto" src={assets.logo} alt="Logo" />
              </Link>
            </h3>
            <p className="text-gray-500 text-sm my-4">
              Welcome to AppointAdoc, your trusted partner in managing your
              healthcare needs conveniently and efficiently.
            </p>

            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 bg-gray-900 text-white text-sm outline-none placeholder-gray-500 rounded-l"
              />
              <button className="bg-blue-600  text-white px-4 py-2 rounded-r hover:bg-blue-700 transition">
                Subscribe
              </button>
            </div>
          </div>

          <div>
            <h5 className="text-lg font-semibold mb-4">Account</h5>
            <ul className="space-y-2 text-gray-500 text-sm">
              {token ? (
                <>
                  <li>
                    <Link to="/my-profile">My Account</Link>
                  </li>
                  <li>
                    <Link to="/my-appointments">My Appointments</Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/signup"> Register</Link>
                  </li>
                </>
              )}
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-lg font-semibold mb-4">Quick Links</h5>
            <ul className="space-y-2 text-gray-500 text-sm">
              <li>
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms-of-use">Terms of Use</Link>
              </li>
              <li>
                <Link to="/faqs">FAQ</Link>
              </li>
            </ul>
          </div>

          <div>
            {/* social links */}
            <h5 className="text-lg font-semibold mb-4">Follow Us</h5>
            <p className="text-gray-500 text-sm mb-4">
              Stay connected with us on social media for the latest updates and
              health tips.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-5 text-xl">
              <FacebookRoundedIcon
                className="rounded-full cursor-pointer p-1"
                fontSize="large"
              />
              <InstagramIcon
                className="rounded-full cursor-pointer p-1"
                fontSize="large"
              />
              <XIcon
                className="rounded-full cursor-pointer p-1"
                fontSize="large"
              />
              <YouTubeIcon
                className="rounded-full cursor-pointer p-1"
                fontSize="large"
              />
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 text-center">
          <p className="text-center text-gray-500 mt-10 pt-5 border-t border-gray-700 text-sm">
            © {new Date().getFullYear()}
            <span className="font-medium hover:underline">
              <Link to="/"> AppointAdoc. </Link>
            </span>
            All Rights Reserved.
          </p>
          {/* made by */}
          <p className="text-center text-gray-500 mt-2 text-sm">
            Made with ❤️ by{" "}
            <a
              href="https://github.com/MuhammadMasab002"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Masab Ashraf
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
