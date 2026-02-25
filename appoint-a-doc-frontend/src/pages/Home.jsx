import React from "react";
import HeroSection from "../components/sections/HeroSection";
import SpecialitySection from "../components/sections/SpecialitySection";
import TopDoctorsSection from "../components/sections/TopDoctorsSection";
import CTASection from "../components/sections/CTASection";

function Home() {
  return (
    <div className="w-full bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeroSection />
        <SpecialitySection />
        <TopDoctorsSection />
        <CTASection />
      </div>
    </div>
  );
}

export default Home;
