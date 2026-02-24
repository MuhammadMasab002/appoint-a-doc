import React, { useContext, useEffect, useMemo, useState } from "react";
import { DoctorContext } from "../../services/context/DoctorContext";

const DoctorProfile = () => {
  const {
    doctorToken,
    doctorData,
    getDoctorProfileData,
    updateDoctorProfileData,
  } = useContext(DoctorContext);

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    fees: 0,
    availability: true,
    address: {
      line1: "",
      line2: "",
    },
  });

  useEffect(() => {
    if (doctorToken) {
      getDoctorProfileData();
    }
  }, [doctorToken]);

  useEffect(() => {
    if (doctorData && !isEditing) {
      setFormData({
        fees: doctorData.fees ?? 0,
        availability: doctorData.availability ?? true,
        address: {
          line1: doctorData.address?.line1 || "",
          line2: doctorData.address?.line2 || "",
        },
      });
    }
  }, [doctorData, isEditing]);

  const doctorInitials = useMemo(() => {
    if (!doctorData?.name) return "DR";
    const parts = doctorData.name.split(" ").filter(Boolean);
    return (parts[0]?.[0] || "D") + (parts[1]?.[0] || "R");
  }, [doctorData?.name]);

  const handleEdit = () => {
    setFormData({
      fees: doctorData?.fees ?? 0,
      availability: doctorData?.availability ?? true,
      address: {
        line1: doctorData?.address?.line1 || "",
        line2: doctorData?.address?.line2 || "",
      },
    });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      fees: doctorData?.fees ?? 0,
      availability: doctorData?.availability ?? true,
      address: {
        line1: doctorData?.address?.line1 || "",
        line2: doctorData?.address?.line2 || "",
      },
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    const isUpdated = await updateDoctorProfileData({
      fees: Number(formData.fees || doctorData?.fees || 0),
      availability: formData.availability,
      address: {
        line1: formData.address?.line1 || "",
        line2: formData.address?.line2 || "",
      },
    });
    setIsSaving(false);

    if (isUpdated) {
      setIsEditing(false);
    }
  };

  return (
    <section className="w-full max-w-4xl">
      <div className="mb-4">
        {doctorData?.profilePicture ? (
          <img
            src={doctorData.profilePicture}
            alt={doctorData?.name || "Doctor profile"}
            className="w-52 h-52 rounded-xl object-cover bg-indigo-400"
          />
        ) : (
          <div className="w-52 h-52 rounded-xl bg-indigo-400 text-white text-5xl font-semibold flex items-center justify-center">
            {doctorInitials.toUpperCase()}
          </div>
        )}
      </div>

      <div className="bg-white border border-gray-200 rounded p-6 sm:p-8 text-gray-700">
        <h1 className="text-4xl font-semibold text-gray-800 mb-2">
          {doctorData?.name || "--------"}
        </h1>

        <div className="flex flex-wrap items-center gap-2 text-gray-600 mb-5">
          <p className="text-lg">
            {doctorData?.degree} - {doctorData?.speciality}
          </p>
          <span className="text-xs px-2 py-0.5 border border-gray-300 rounded-full">
            {doctorData?.experience} Years
          </span>
        </div>

        <div className="mb-5">
          <p className="font-medium text-gray-800 mb-1">About:</p>
          <p className="text-gray-600 leading-7">
            {doctorData?.about || "No information available"}
          </p>
        </div>

        <div className="mb-4">
          <p className="text-lg font-medium text-gray-800">
            Appointment fee: $&nbsp;
            {isEditing ? (
              <input
                type="number"
                min="0"
                value={formData.fees}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, fees: e.target.value }))
                }
                className="w-28 px-2 py-1 border border-gray-300 rounded outline-none text-base"
              />
            ) : (
              <span>{doctorData?.fees}</span>
            )}
          </p>
        </div>

        <div className="mb-5">
          <p className="text-lg font-medium text-gray-800 mb-1">Address:</p>
          {isEditing ? (
            <div className="space-y-2 max-w-sm">
              <input
                type="text"
                value={formData.address.line1}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    address: {
                      ...prev.address,
                      line1: e.target.value,
                    },
                  }))
                }
                placeholder="Address line 1"
                className="w-full px-3 py-2 border border-gray-300 rounded outline-none"
              />
              <input
                type="text"
                value={formData.address.line2}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    address: {
                      ...prev.address,
                      line2: e.target.value,
                    },
                  }))
                }
                placeholder="Address line 2"
                className="w-full px-3 py-2 border border-gray-300 rounded outline-none"
              />
            </div>
          ) : (
            <div className="text-gray-600 leading-7">
              <p>{doctorData?.address?.line1}</p>
              <p>{doctorData?.address?.line2}</p>
            </div>
          )}
        </div>

        <div>
          <label className="inline-flex items-center gap-2 mb-6 cursor-pointer">
            <input
              type="checkbox"
              checked={
                isEditing
                  ? formData.availability
                  : (doctorData?.availability ?? true)
              }
              disabled={!isEditing}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  availability: e.target.checked,
                }))
              }
              className="w-4 h-4"
            />
            <span className="text-2xl text-gray-800">Available</span>
          </label>
        </div>

        {!isEditing ? (
          <button
            onClick={handleEdit}
            className="px-6 py-2 border border-gray-400 rounded-full text-gray-700 hover:bg-gray-50 transition cursor-pointer"
          >
            Edit
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-2 bg-primary text-white rounded-full hover:opacity-90 transition disabled:opacity-60 cursor-pointer"
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
            <button
              onClick={handleCancel}
              className="px-6 py-2 border border-gray-400 rounded-full text-gray-700 hover:bg-gray-50 transition cursor-pointer"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default DoctorProfile;
