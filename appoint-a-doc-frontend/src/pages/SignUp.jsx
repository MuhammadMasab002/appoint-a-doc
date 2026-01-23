import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton, {
  BUTTON_VARIANTS,
} from "../components/common/buttons/CustomButton";
import CustomFormInput, {
  INPUT_TYPES,
} from "../components/common/inputs/CustomFormInput";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear individual field error on change
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validate = () => {
    const { name, email, password } = formData;
    const newErrors = {};

    // Name validation
    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (name.length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    // Email validation
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newErrors.email = "Invalid email format";
      }
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    // DUMMY signup success
    console.log("Signup successfully:", formData);

    // Reset form
    setFormData({
      name: "",
      email: "",
      password: "",
    });

    // Redirect to login
    navigate("/login");
  };

  return (
    <div className="w-full min-h-screen grid grid-cols-1">
      <div className="flex items-center justify-center py-10 px-6">
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-bold text-left text-black mb-8">
            Create an Account
          </h2>
          <p className="text-left text-black mb-6">Enter your details below</p>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 text-black"
          >
            <CustomFormInput
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              type={INPUT_TYPES.TEXT}
              variant={errors.name ? "error" : "default"}
              errorMessage={errors.name}
            />

            <CustomFormInput
              placeholder="Email or Phone Number"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              type={INPUT_TYPES.EMAIL}
              variant={errors.email ? "error" : "default"}
              errorMessage={errors.email}
            />

            <CustomFormInput
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              type={INPUT_TYPES.PASSWORD}
              variant={errors.password ? "error" : "default"}
              errorMessage={errors.password}
            />

            <CustomButton
              text="Create Account"
              type="submit"
              variant={BUTTON_VARIANTS.PRIMARY}
            />

            <CustomButton
              text="Sign up with Google"
              type="button"
              variant={BUTTON_VARIANTS.SECONDARY}
              onClick={() => alert("Sign up with Google clicked")}
            />

            <div className="flex justify-center items-center gap-2 mt-4">
              <p className="text-center text-gray-600">
                Already have an account?
              </p>
              <CustomButton
                text="Login"
                type="button"
                variant={BUTTON_VARIANTS.TEXT_PRIMARY}
                className="!py-0 !px-1"
                fullWidth={false}
                onClick={() => navigate("/login")}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
