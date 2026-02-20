import React, { useState, useRef, useContext } from "react";
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
import { AppContext } from "../services/context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const MyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  const { userData, backendUrl, token, loadUserProfileData } =
    useContext(AppContext);

  const formatDateOnly = (value) => {
    if (!value) return "";
    return String(value).split("T")[0];
  };

  const buildFormDataFromUser = (user = {}) => ({
    ...user,
    dateOfBirth: formatDateOnly(user?.dateOfBirth),
    address: {
      line1: user?.address?.line1 || "",
      line2: user?.address?.line2 || "",
    },
  });

  const [formData, setFormData] = useState(buildFormDataFromUser(userData));

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "addressLine1" || name === "addressLine2") {
      const field = name === "addressLine1" ? "line1" : "line2";
      setFormData((prev) => ({
        ...prev,
        address: {
          ...(prev.address || {}),
          [field]: value,
        },
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImageFile(file);
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
    setFormData(buildFormDataFromUser(userData));
    setPreviewImage(userData?.profilePicture || null);
    setSelectedImageFile(null);
  };

  const updateUserProfile = async () => {
    try {
      const newFormData = new FormData();

      newFormData.append("name", formData.name);
      newFormData.append("email", formData.email);
      newFormData.append("phone", formData.phone);
      newFormData.append("dateOfBirth", formData.dateOfBirth);
      newFormData.append("gender", formData.gender);

      newFormData.append(
        "address",
        JSON.stringify({
          line1: formData.address?.line1 || "",
          line2: formData.address?.line2 || "",
        }),
      );

      if (selectedImageFile) {
        newFormData.append("image", selectedImageFile);
      }

      const { data } = await axios.put(
        `${backendUrl}/user/update-profile`,
        newFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (data.success) {
        await loadUserProfileData();

        setIsEditing(false);
        setSelectedImageFile(null);
        setPreviewImage(null);
        toast.success(data.message || "Profile updated successfully");
      } else {
        toast.error(data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating user profile: ", error);
      toast.error(
        error.response?.data?.error ||
          error.message ||
          "Failed to update profile. Please try again.",
      );
    }
  };

  const handleCancel = () => {
    setFormData(buildFormDataFromUser(userData));
    setPreviewImage(userData?.profilePicture || null);
    setSelectedImageFile(null);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-blue-50 py-8 sm:px-6 lg:px-8">
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
              className="text-sm shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
              leftIcon={<EditIcon />}
            />
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          {/* Profile Header with Gradient */}
          <div className="bg-linear-to-r from-indigo-400 to-blue-600 h-32 sm:h-40 relative z-10">
            <div className="absolute inset-0 bg-black opacity-5"></div>
          </div>

          <div className="px-6 sm:px-8 pb-8">
            {/* Profile Picture and Name */}
            <div className="flex flex-col items-center sm:items-start sm:flex-row sm:gap-8 -mt-16 sm:-mt-20 mb-8">
              <div className="relative group z-10">
                <div
                  className={`w-32 h-32 sm:w-40 sm:h-40 rounded-2xl bg-white shadow-2xl border-4 border-white flex items-center justify-center overflow-hidden ${
                    isEditing ? "cursor-pointer" : ""
                  }`}
                  onClick={handleImageClick}
                >
                  {previewImage || userData?.profilePicture ? (
                    <img
                      src={previewImage || userData?.profilePicture}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-linear-to-br from-indigo-100 to-blue-100 flex items-center justify-center">
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
                      className="absolute inset-0 w-32 h-32 sm:w-40 sm:h-40 rounded-2xl bg-linear-to-br from-indigo-600 to-blue-600 bg-opacity-90 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-85 transition-all duration-300"
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
              <div className="flex-1 text-center sm:text-left mt-4 sm:mt-9 z-10">
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
                    <h2 className="text-3xl sm:text-4xl font-bold text-black mb-2">
                      {userData.name ?? "Anonymous User"}
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
                        {userData.email ?? "No email available"}
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
                          {userData.phone ?? "Not provided"}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 hover:border-indigo-300 transition-colors md:col-span-2">
                  <div className="flex sm:flexrow items-center gap-3">
                    <HomeOutlinedIcon className="text-indigo-600 mt-1" />
                    {/* <div className="flex-1"> */}
                    <label className="text-sm text-gray-600 font-medium block">
                      Address
                    </label>
                    {/* </div> */}
                    <div className="w-full flex flex-col sm:flex-row items-center justify-evenly sm:gap-4 gap-1">
                      {isEditing ? (
                        <>
                          <CustomFormInput
                            type="text"
                            name="addressLine1"
                            value={formData.address?.line1}
                            onChange={handleInputChange}
                            placeholder="Enter your address"
                          />
                          <CustomFormInput
                            type="text"
                            name="addressLine2"
                            value={formData.address?.line2}
                            onChange={handleInputChange}
                            placeholder="Enter your address"
                          />
                        </>
                      ) : (
                        <>
                          <p className="text-gray-700 font-medium">
                            {userData.address?.line1 || "Not provided"}
                          </p>
                          <p className="text-gray-700 font-medium">
                            {userData.address?.line2 || "Not provided"}
                          </p>
                        </>
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
                          {userData.gender}
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
                          name="dateOfBirth"
                          value={formatDateOnly(formData.dateOfBirth)}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all font-medium text-gray-700"
                          placeholder="mm/dd/yyyy"
                        />
                      ) : (
                        <p className="text-gray-700 font-medium">
                          {formatDateOnly(userData.dateOfBirth) ||
                            "Not provided"}
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
                  onClick={updateUserProfile}
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
