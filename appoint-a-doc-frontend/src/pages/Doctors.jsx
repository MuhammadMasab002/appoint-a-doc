import React, { useContext, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../services/context/AppContext";
import { specialityData } from "../assets/assets";

const Doctors = () => {
  const { doctors } = useContext(AppContext);
  const { speciality } = useParams();
  const navigate = useNavigate();

  const filteredDoctors = useMemo(() => {
    if (speciality) {
      return doctors.filter((doc) => doc.speciality === speciality);
    }
    return doctors;
  }, [speciality, doctors]);

  return (
    <div className="w-full min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <h1 className="text-3xl font-semibold text-gray-900 mb-10">
          Browse through the doctors specialist.
        </h1>

        <div className="flex md:flex-row flex-col gap-8">
          {/* Sidebar - Specialities Filter */}
          <div className="w-full md:w-48 shrink-0">
            <div className="flex flex-col gap-3">
              {/* All Doctors Button */}
              <button
                onClick={() => {
                  navigate("/doctors");
                }}
                className={`px-4 py-3 rounded-lg font-medium transition-colors text-left ${
                  speciality === undefined
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
                }`}
              >
                All Doctors
              </button>

              {/* Specialities List */}
              {specialityData.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    navigate("/doctors/" + item.speciality);
                  }}
                  className={`px-4 py-3 rounded-lg font-medium transition-colors text-left ${
                    speciality == item.speciality
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {item.speciality}
                </button>
              ))}
            </div>
          </div>

          {/* Doctors Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredDoctors.map((doctor) => (
                <Link
                  key={doctor._id}
                  to={`/appointment/${doctor._id}`}
                  className="group"
                >
                  <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                    {/* Doctor Image */}
                    <div className="bg-blue-100 overflow-hidden">
                      <img
                        src={doctor.profilePicture}
                        alt={doctor.name}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Doctor Info */}
                    <div className="p-4">
                      {/* Available Status */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium text-green-600">
                          Available
                        </span>
                      </div>

                      {/* Doctor Name */}
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {doctor.name}
                      </h3>

                      {/* Speciality */}
                      <p className="text-gray-600 text-sm">
                        {doctor.speciality}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* No Results Message */}
            {filteredDoctors.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600">
                  No doctors found for this speciality.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctors;
