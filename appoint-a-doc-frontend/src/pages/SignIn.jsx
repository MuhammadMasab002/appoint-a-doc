import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton, {
  BUTTON_VARIANTS,
} from "../components/common/buttons/CustomButton";
import CustomFormInput, {
  INPUT_TYPES,
} from "../components/common/inputs/CustomFormInput";

const SignIn = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear field-specific error
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validate = () => {
    const { email, password } = formData;
    const newErrors = {};

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

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    // Fake login check
    const { email, password } = formData;
    if (email === "admin@example.com" && password === "12345678") {
      setFormData({ email: "", password: "" });
      navigate("/");
    } else {
      setErrors({ ...errors, password: "Invalid email or password" });
    }
  };

  return (
    <div className="w-full min-h-screen grid grid-cols-1">
      <div className="flex items-center justify-center py-10 px-6">
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-bold text-left text-black mb-8">
            Login to Website name.
          </h2>

          <p className="text-left text-black mb-6">Enter your details below</p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 text-black"
          >
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
              text="Login"
              type="submit"
              variant={BUTTON_VARIANTS.PRIMARY}
            />

            <CustomButton
              text="Forget Password?"
              type="button"
              variant={BUTTON_VARIANTS.TEXT_PRIMARY}
              onClick={() => alert("Forget Password clicked")}
              fullWidth={false}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
