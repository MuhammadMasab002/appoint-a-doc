import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const TopDoctorsSection = ({ doctors }) => {
  const navigate = useNavigate();

  return (
    <section id="TopDoctorsSection" className="w-full py-14 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
            Top Doctors to Book
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Simply browse through our extensive list of trusted doctors.
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
          {doctors && doctors.length > 0 ? (
            doctors?.slice(0, 10).map((doctor) => (
              <Link
                key={doctor._id}
                to={`/appointment/${doctor._id}`}
                className="group cursor-pointer hover:scale-105 transition-transform duration-300"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  {/* Doctor Image */}
                  <div className="bg-blue-100 h-56 overflow-hidden flex items-center justify-center">
                    <img
                      src={doctor.profilePicture}
                      alt={doctor.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  {/* Doctor Info */}
                  <div className="p-4">
                    {/* Available Badge */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-green-600 text-sm font-medium">
                        Available
                      </span>
                    </div>

                    {/* Doctor Name */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {doctor.name}
                    </h3>

                    {/* Specialty */}
                    <p className="text-gray-600 text-sm">{doctor.speciality}</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-600 text-center col-span-full">
              No doctors available at the moment.
            </p>
          )}
        </div>

        {/* Show More Button */}
        {doctors && doctors.length > 0 && (
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => {
                navigate("/doctors");
                scrollTo(0, 0);
              }}
              className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-200 transition-colors duration-300"
            >
              Show More
              <ArrowForwardIcon fontSize="small" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TopDoctorsSection;
