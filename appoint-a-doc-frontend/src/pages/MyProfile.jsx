import React, { useState, useRef } from "react";
import CustomButton from "../components/common/buttons/CustomButton";
import CustomFormInput from "../components/common/inputs/CustomFormInput";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import WcOutlinedIcon from "@mui/icons-material/WcOutlined";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const MyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  const [profileData, setProfileData] = useState({
    name: "Test",
    email: "masab@gmail.com",
    phone: "0000000000",
    address: "",
    gender: "Not Selected",
    birthday: "",
  });

  const [formData, setFormData] = useState({ ...profileData });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setFormData({ ...profileData });
    setPreviewImage(profileImage);
  };

  const handleSave = () => {
    setProfileData({ ...formData });
    setProfileImage(previewImage);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({ ...profileData });
    setPreviewImage(profileImage);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with Edit Button */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              My Profile
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your personal information
            </p>
          </div>
          {!isEditing && (
            <CustomButton
              text="Edit Profile"
              onClick={handleEdit}
              variant="primary"
              fullWidth={false}
              className="px-6 py-2.5 shadow-lg hover:shadow-xl transition-shadow"
              leftIcon={<EditIcon />}
            />
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          {/* Profile Header with Gradient */}
          <div className="bg-gradient-to-r from-indigo-500 to-blue-600 h-32 sm:h-40 relative z-10">
            <div className="absolute inset-0 bg-black opacity-5"></div>
          </div>

          <div className="px-6 sm:px-8 pb-8">
            {/* Profile Picture and Name */}
            <div className="flex flex-col items-center sm:items-start sm:flex-row sm:gap-8 -mt-16 sm:-mt-20 mb-8">
              <div className="relative group z-50">
                <div
                  className={`w-32 h-32 sm:w-40 sm:h-40 rounded-2xl bg-white shadow-2xl border-4 border-white flex items-center justify-center overflow-hidden ${
                    isEditing ? "cursor-pointer" : ""
                  }`}
                  onClick={handleImageClick}
                >
                  {previewImage || profileImage ? (
                    <img
                      src={previewImage || profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-blue-100 flex items-center justify-center">
                      <PersonIcon
                        className="text-indigo-400"
                        style={{ fontSize: 80 }}
                      />
                    </div>
                  )}
                </div>
                {isEditing && (
                  <>
                    <div
                      className="absolute inset-0 w-32 h-32 sm:w-40 sm:h-40 rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-600 bg-opacity-90 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-85 transition-all duration-300"
                      onClick={handleImageClick}
                    >
                      <div className="text-center text-white">
                        <CameraAltIcon style={{ fontSize: 36 }} />
                        <p className="text-sm font-medium mt-2">Change Photo</p>
                      </div>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </>
                )}
              </div>
              <div className="flex-1 text-center sm:text-left mt-4 sm:mt-9 z-50">
                {isEditing ? (
                  <div className="max-w-md mt-12">
                    <CustomFormInput
                      label="Full Name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your name"
                      // className="mt-10"
                    />
                  </div>
                ) : (
                  <div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-black mb-2 truncate">
                      {profileData.name +
                        "my name is masab ashraf, i'm from mian channun"}
                    </h2>
                    <p className="text-indigo-400 font-medium">Patient</p>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                  <EmailOutlinedIcon
                    className="text-indigo-600"
                    fontSize="small"
                  />
                </div>
                <h2 className="text-lg font-bold text-gray-900">
                  Contact Information
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email */}
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 hover:border-indigo-300 transition-colors">
                  <div className="flex items-start gap-3">
                    <EmailOutlinedIcon className="text-indigo-600 mt-1" />
                    <div className="flex-1">
                      <label className="text-sm text-gray-600 font-medium block mb-2">
                        Email Address
                      </label>
                      <p className="text-indigo-600 font-medium break-all">
                        {profileData.email}
                      </p>
                      {isEditing && (
                        <p className="text-xs text-gray-500 mt-1">
                          Email cannot be changed
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 hover:border-indigo-300 transition-colors">
                  <div className="flex items-start gap-3">
                    <PhoneOutlinedIcon className="text-indigo-600 mt-1" />
                    <div className="flex-1">
                      <label className="text-sm text-gray-600 font-medium block mb-2">
                        Phone Number
                      </label>
                      {isEditing ? (
                        <CustomFormInput
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Enter phone number"
                        />
                      ) : (
                        <p className="text-indigo-600 font-medium">
                          {profileData.phone}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 hover:border-indigo-300 transition-colors md:col-span-2">
                  <div className="flex items-start gap-3">
                    <HomeOutlinedIcon className="text-indigo-600 mt-1" />
                    <div className="flex-1">
                      <label className="text-sm text-gray-600 font-medium block mb-2">
                        Address
                      </label>
                      {isEditing ? (
                        <CustomFormInput
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          placeholder="Enter your address"
                        />
                      ) : (
                        <p className="text-gray-700 font-medium">
                          {profileData.address || "Not provided"}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Basic Information Section */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                  <WcOutlinedIcon className="text-blue-600" fontSize="small" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">
                  Personal Information
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Gender */}
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 hover:border-blue-300 transition-colors">
                  <div className="flex items-start gap-3">
                    <WcOutlinedIcon className="text-blue-600 mt-1" />
                    <div className="flex-1">
                      <label className="text-sm text-gray-600 font-medium block mb-2">
                        Gender
                      </label>
                      {isEditing ? (
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all font-medium text-gray-700"
                        >
                          <option value="Not Selected">Not Selected</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      ) : (
                        <p className="text-gray-700 font-medium">
                          {profileData.gender}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Birthday */}
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 hover:border-blue-300 transition-colors">
                  <div className="flex items-start gap-3">
                    <CakeOutlinedIcon className="text-blue-600 mt-1" />
                    <div className="flex-1">
                      <label className="text-sm text-gray-600 font-medium block mb-2">
                        Date of Birth
                      </label>
                      {isEditing ? (
                        <input
                          type="date"
                          name="birthday"
                          value={formData.birthday}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all font-medium text-gray-700"
                          placeholder="mm/dd/yyyy"
                        />
                      ) : (
                        <p className="text-gray-700 font-medium">
                          {profileData.birthday || "Not provided"}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons - Only show when editing */}
            {isEditing && (
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                <CustomButton
                  text="Save Changes"
                  onClick={handleSave}
                  variant="primary"
                  fullWidth={false}
                  className="px-8 py-3 shadow-lg hover:shadow-xl transition-all"
                  leftIcon={<SaveOutlinedIcon />}
                />
                <CustomButton
                  text="Cancel"
                  onClick={handleCancel}
                  variant="outline"
                  fullWidth={false}
                  className="px-8 py-3"
                  leftIcon={<CloseOutlinedIcon />}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
