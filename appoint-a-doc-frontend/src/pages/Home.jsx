import React from "react";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";

function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center gap-4 bg-gray-50">
      <div className="text-red-500 text-7xl animate-bounce">
        <HomeRoundedIcon fontSize="inherit" />
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-red-500 transition-all duration-500">
        Welcome to Home Page
      </h1>

      <p className="text-gray-600 text-center max-w-md transition-all duration-700">
        Explore features, manage your account, and enjoy the experience.
      </p>
    </div>
  );
}

export default Home;
