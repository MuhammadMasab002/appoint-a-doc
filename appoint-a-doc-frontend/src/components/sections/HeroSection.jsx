import React from "react";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { assets } from "../../assets/assets";

const HeroSection = () => {
  return (
    <section className="w-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl overflow-hidden mt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row flex-wrap rounded-lg px-6 md:px-10">
          {/* Left Content */}
          <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[9vw] md:mb-[-30px]">
            <h1 className="text-4xl md:text-5xl text-white font-bold mb-6 leading-tight">
              Book Appointment
              <br />
              With Trusted Doctors
            </h1>

            {/* Doctor Avatars */}
            <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light sm:font-normal">
              <img className="w-28" src={assets.group_profiles} alt="" />
              <p>
                Simply browse through our extensive list of trusted doctors,{" "}
                <br className="hidden sm:block" /> schedule your appointment
                hassle-free.
              </p>
            </div>

            {/* CTA Button */}
            <div className="w-full flex justify-center md:justify-start mt-1 md:mt-2">
              <div
                onClick={() =>
                  scrollTo({
                    top: document.getElementById("TopDoctorsSection").offsetTop,
                    behavior: "smooth",
                  })
                }
                className="inline-flex items-center gap-2 cursor-pointer bg-white px-6 md:px-8 py-3 rounded-full hover:bg-gray-100 transition-colors duration-300"
              >
                <span className="text-sm md:text-base text-blue-600 font-semibold">
                  Book appointment
                </span>
                <ArrowForwardIcon fontSize="small" />
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="md:w-1/2 relative">
            <img
              src={assets.header_img}
              alt="Doctor"
              className="w-full md:absolute bottom-0 h-auto rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
