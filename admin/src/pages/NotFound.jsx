import React from "react";
import { useNavigate } from "react-router-dom";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";

import CustomButton, {
  BUTTON_VARIANTS,
} from "../components/common/buttons/CustomButton";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-500">Home</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900">404 Error</span>
        </div>
      </div>

      {/* Error Content */}
      <div className="flex flex-1 flex-col items-center justify-center px-4 text-center">
        {/* Icon */}
        <div className="text-red-500 text-7xl mb-6 animate-pulse">
          <ErrorOutlineRoundedIcon fontSize="inherit" />
        </div>

        {/* Title */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold mb-4">404</h1>

        {/* Subtitle */}
        <p className="text-xl sm:text-2xl font-medium mb-4">Page Not Found</p>

        {/* Description */}
        <p className="text-gray-600 mb-10 max-w-md">
          Oops! The page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* Action */}
        <CustomButton
          text="Back to Home"
          variant={BUTTON_VARIANTS.PRIMARY}
          fullWidth={false}
          onClick={() => navigate("/")}
        />
      </div>
    </div>
  );
};

export default NotFound;
