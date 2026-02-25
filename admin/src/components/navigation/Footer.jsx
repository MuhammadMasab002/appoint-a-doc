import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black/10 text-black mt-10 pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-5">
        <div className="container mx-auto px-4 text-center">
          <p className="text-center text-gray-500 mt-10 pt-5 border-t border-gray-700 text-sm">
            © {new Date().getFullYear()}
            <span className="font-medium hover:*:underline">
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
