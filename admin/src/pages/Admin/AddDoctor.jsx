import React, { useContext, useState } from "react";
import { assets, specialityData } from "../../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";
import { AdminContext } from "../../services/context/AdminContext";

const AddDoctor = () => {
  const { authToken, backendUrl } = useContext(AdminContext);

  const [doctorImageFile, setDoctorImageFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    experience: "1 Year",
    fees: "",
    speciality: "General physician",
    degree: "",
    address1: "",
    address2: "",
    about: "",
    availability: true,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDoctorImageFile(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!doctorImageFile) {
        return toast.error("Please upload a doctor image.");
      }
      const newFormData = new FormData();

      // Extract number from experience string (e.g., "6 Years" -> 6)
      const experienceYears = parseInt(formData.experience.match(/\d+/)[0]);

      newFormData.append("image", doctorImageFile);
      newFormData.append("name", formData.name);
      newFormData.append("email", formData.email);
      newFormData.append("password", formData.password);
      newFormData.append("experience", experienceYears);
      newFormData.append("fees", parseInt(formData.fees));
      newFormData.append("speciality", formData.speciality);
      newFormData.append("degree", formData.degree);
      newFormData.append("availability", formData.availability);
      newFormData.append(
        "address",
        JSON.stringify({
          line1: formData.address1,
          line2: formData.address2,
        }),
      );
      newFormData.append("about", formData.about);

      //   Api call
      const { data } = await axios.post(
        backendUrl + "/admin/add-doctor",
        newFormData,
        // {
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //     Authorization: `Bearer ${authToken}`,
        //   },
        // },
      );

      if (data.success) {
        toast.success("Doctor added successfully!");
        setFormData({
          name: "",
          email: "",
          password: "",
          experience: "1 Year",
          fees: "",
          speciality: "General physician",
          degree: "",
          address1: "",
          address2: "",
          about: "",
          availability: true,
        });
        setDoctorImageFile(null);
      } else {
        toast.error(data.message || "Failed to add doctor");
      }
    } catch (error) {
      console.error("Error adding doctor:", error);
      toast.error(
        error.response?.data?.error ||
          error.response?.data?.message ||
          " - Failed to add doctor",
      );
    }
  };

  return (
    <section className="w-full">
      <div className="mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
          Add Doctor
        </h2>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <form onSubmit={handleSubmit}>
          {/* Upload Image */}
          <div className="mb-8">
            <label className="flex items-center gap-4 cursor-pointer w-fit">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                  {doctorImageFile ? (
                    <img
                      src={URL.createObjectURL(doctorImageFile)}
                      alt="Doctor"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={assets.upload_area}
                      alt="Doctor"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Upload doctor picture
                </p>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Doctor name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Doctor name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                required
              />
            </div>

            {/* Speciality */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Speciality
              </label>
              <select
                name="speciality"
                value={formData.speciality}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition appearance-none bg-white"
                required
              >
                {specialityData.map((item) => (
                  <option key={item.speciality} value={item.speciality}>
                    {item.speciality}
                  </option>
                ))}
              </select>
            </div>

            {/* Doctor Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Doctor Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Your email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                required
              />
            </div>

            {/* degree */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Degree
              </label>
              <input
                type="text"
                name="degree"
                placeholder="degree"
                value={formData.degree}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                required
              />
            </div>

            {/* Doctor Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Doctor Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                required
              />
            </div>

            {/* Address 1 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <input
                type="text"
                name="address1"
                placeholder="Address 1"
                value={formData.address1}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                required
              />
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience
              </label>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition appearance-none bg-white"
                required
              >
                <option value="1 Year">1 Year</option>
                <option value="2 Years">2 Years</option>
                <option value="3 Years">3 Years</option>
                <option value="4 Years">4 Years</option>
                <option value="5 Years">5 Years</option>
                <option value="6 Years">6 Years</option>
                <option value="7 Years">7 Years</option>
                <option value="8 Years">8 Years</option>
                <option value="9 Years">9 Years</option>
                <option value="10 Years">10 Years</option>
                <option value="10+ Years">10+ Years</option>
              </select>
            </div>

            {/* Address 2 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address 2
              </label>
              <input
                type="text"
                name="address2"
                placeholder="Address 2"
                value={formData.address2}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
              />
            </div>

            {/* Fees */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fees
              </label>
              <input
                type="number"
                name="fees"
                placeholder="Your fees"
                value={formData.fees}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                required
              />
            </div>
          </div>

          {/* About Me */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              About Doctor
            </label>
            <textarea
              name="about"
              placeholder="write about yourself"
              value={formData.about}
              onChange={handleInputChange}
              rows="5"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition resize-none"
              required
            ></textarea>
          </div>

          {/* Availability */}
          <div className="mb-6 flex items-center gap-3">
            <input
              type="checkbox"
              id="availability"
              name="availability"
              checked={formData.availability}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  availability: e.target.checked,
                }))
              }
              className="w-4 h-4 text-primary rounded focus:ring-2 focus:ring-primary cursor-pointer"
            />
            <label
              htmlFor="availability"
              className="text-sm font-medium text-gray-700 cursor-pointer"
            >
              Available for appointments
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="px-8 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary-dark transition shadow-sm hover:shadow-md"
          >
            Add doctor
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddDoctor;
