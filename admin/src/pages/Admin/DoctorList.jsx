import React from "react";
import { doctors } from "../../assets/assets";
import VerifiedIcon from "@mui/icons-material/Verified";

const DoctorList = () => {
  const previewDoctors = doctors.slice(0, 20);

  return (
    <section className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
          All Doctors
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {previewDoctors.map((doctor) => (
          <div
            key={doctor._id}
            className="group bg-[#eef3ff] border border-[#dde6ff] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 ease-out cursor-pointer"
          >
            {/* Image Container */}
            <div className="relative bg-white/60 flex items-center justify-center h-40 overflow-hidden">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="h-32 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Content Container */}
            <div className="px-4 py-3 bg-gradient-to-b from-[#eef3ff] to-[#e5f0ff] group-hover:to-[#cbe8ff] transition-all duration-300">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800 group-hover:text-primary transition-colors duration-300">
                    {doctor.name}
                  </p>
                  <p className="text-xs text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                    {doctor.speciality}
                  </p>
                  <div className="mt-2 flex items-center gap-4 text-xs">
                    <span className="text-gray-600">{doctor.experience}</span>
                    <span className="text-gray-600">${doctor.fees}</span>
                  </div>
                </div>
                {/* Verified Badge */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-100 scale-75">
                  <VerifiedIcon
                    className="text-primary"
                    style={{ fontSize: "1rem" }}
                  />
                </div>
              </div>
            </div>

            {/* Bottom accent bar */}
            <div className="h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DoctorList;
