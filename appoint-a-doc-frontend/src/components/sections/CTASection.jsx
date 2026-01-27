import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";

const CTASection = () => {
  const navigate = useNavigate();
  return (
    <section className="w-full mt-6">
      <div className="relative bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between py-10 lg:py-0 gap-8 relative">
            {/* Left Content */}
            <div className="md:w-1/2 flex flex-col items-start justify-center gap-4">
              <h2 className="text-2xl md:text-4xl xl:text-5xl text-white font-bold leading-tight">
                Book Appointment
                <br />
                With 100+ Trusted Doctors
              </h2>

              {/* CTA Button */}
              <button
                onClick={() => {
                  navigate("/signup");
                  scrollTo(0, 0);
                }}
                className="inline-block bg-white text-blue-600 text-sm md:text-base px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 mt-2"
              >
                Create Account
              </button>
            </div>

            {/* Right Image */}
            <div className="md:w-1/2 h-full hidden md:flex items-start justify-end relative overflow-visible">
              <img
                src={assets.appointment_img}
                alt="Doctor"
                className="w-sm h-auto object-contain relative bottom-0 right-0"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
