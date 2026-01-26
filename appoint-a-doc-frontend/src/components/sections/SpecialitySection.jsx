import React from "react";
import { specialityData } from "../../assets/assets";

const SpecialitySection = () => {
  return (
    <section className="w-full py-14 md:py-16">
      <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
          Find by Speciality
        </h2>
        <p className="text-gray-600 sm:max-w-xl mx-auto mb-10">
          Simply browse through our extensive list of trusted doctors, schedule
          your appointment hassle-free.
        </p>

        <div className="flex justify-center flex-wrap gap-6 md:gap8 items-start">
          {specialityData.map((item) => (
            <div
              key={item.speciality}
              className="flex flex-col items-center gap-1 hover:scale-105 transition-transform cursor-pointer"
            >
              <div className="w-16 sm:w-24 rounded-full bg-gray-100 flex items-center justify-center shadow-sm">
                <img
                  src={item.image}
                  alt={item.speciality}
                  className="w-full h-auto"
                />
              </div>
              <p className="text-xs font-medium text-gray-800 text-center leading-snug">
                {item.speciality}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialitySection;
