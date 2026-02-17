import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton, {
  BUTTON_VARIANTS,
} from "../components/common/buttons/CustomButton";
import CustomFormInput, {
  INPUT_TYPES,
} from "../components/common/inputs/CustomFormInput";
import axios from "axios";
import { AdminContext } from "../services/context/AdminContext";
import { toast } from "react-toastify";

const SignIn = () => {
  const navigate = useNavigate();

  const { setAuthToken, backendUrl } = useContext(AdminContext);

  // state for admin login / doctor login
  const [isAdminLogin, setIsAdminLogin] = useState(true);

  const [formData, setFormData] = useState({
    email: "admin@admin.com",
    password: "admin1234",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const { email, password } = formData;

    try {
      if (isAdminLogin) {
        const { data } = await axios.post(`${backendUrl}/admin/login`, {
          email,
          password,
        });
        console.log("Admin login response:", data);
        if (data.success) {
          console.log("Admin login response:", data);
          localStorage.setItem("adminToken", data.token);
          setAuthToken(data.token);
          // navigate("/dashboard");
          navigate("/");
        }
      }
    } catch (err) {
      console.error("Admin login error:", err);
      toast.error(err.response?.data?.message || "Admin login failed");
      setErrors({ ...errors, password: "Invalid email or password" });
    }
  };

  return (
    <div className="w-full min-h-screen">
      <div className="flex justify-center mt-20">
        <div className="w-full max-w-sm  py-10 px-8 shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold text-center text-black mb-5 sm:mb-8">
            <span className="text-blue-600 ">
              {isAdminLogin ? "Admin" : "Doctor"}
            </span>{" "}
            Login
          </h2>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 text-black"
          >
            <CustomFormInput
              placeholder="Email"
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

            <div className="flex justify-center items-center gap-2">
              <p className="text-center text-gray-600">
                {!isAdminLogin ? "Admin" : "Doctor"} Login?
              </p>
              <CustomButton
                text="click here"
                type="button"
                variant={BUTTON_VARIANTS.TEXT_PRIMARY}
                className="!py-0 !px-1"
                fullWidth={false}
                onClick={() => setIsAdminLogin(!isAdminLogin)}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
