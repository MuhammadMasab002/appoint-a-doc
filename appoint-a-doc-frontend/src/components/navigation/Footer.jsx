import React from "react";
import { Link } from "react-router-dom";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";

const Footer = () => {
  return (
    <footer className="bg-black text-white mt-10 pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h3 className="text-2xl font-bold">
              <Link to="/">Logo here.</Link>
            </h3>
            <p className="text-gray-400 mt-4">Subscribe</p>
            <p className="text-gray-400 text-sm mb-4">
              lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            </p>

            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 bg-gray-900 text-sm outline-none placeholder-gray-500 rounded-l"
              />
              <button className="bg-red-600 px-4 py-2 rounded-r hover:bg-red-700 transition">
                Subscribe
              </button>
            </div>
          </div>

          <div>
            <h5 className="text-lg font-semibold mb-4">Account</h5>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link to="/my-profile">My Account</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup"> Register</Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-lg font-semibold mb-4">Quick Links</h5>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms-of-use">Terms of Use</Link>
              </li>
              <li>
                <Link to="/faqs">FAQ</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-lg font-semibold mb-4">Download App</h5>
            <p className="text-gray-400 text-sm mb-4">
              Lorem ipsum rerum quaerat ullam ea quis consequuntur eaque quidem
              nobis?
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-5 text-xl text-gray-300">
              <FacebookRoundedIcon
                className="rounded-full bg-red-100 text-red-600 cursor-pointer p-1"
                fontSize="large"
              />
              <InstagramIcon
                className="rounded-full bg-red-100 text-red-600 cursor-pointer p-1"
                fontSize="large"
              />
              <XIcon
                className="rounded-full bg-red-100 text-red-600 cursor-pointer p-1"
                fontSize="large"
              />
              <YouTubeIcon
                className="rounded-full bg-red-100 text-red-600 cursor-pointer p-1"
                fontSize="large"
              />
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 text-center">
          <p className="text-center text-gray-500 mt-10 pt-5 border-t border-gray-700 text-sm">
            © {new Date().getFullYear()}
            <span className="font-medium">
              <Link to="/"> Logo here. </Link>
            </span>
            All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
