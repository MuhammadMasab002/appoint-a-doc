import React from "react";
import { assets } from "../assets/assets";

function About() {
  return (
    <div className="w-full">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <h1 className="text-center text-3xl md:text-4xl font-semibold text-gray-700 uppercase">
          <span className="text-gray-500">About</span> Us
        </h1>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-start">
          <img
            src={assets.about_image}
            alt="Doctors"
            className="w-full max-w-md mx-auto md:mx-0 rounded"
          />

          <div className="text-gray-600 space-y-6 leading-8 text-base">
            <p>
              Welcome to AppointAdoc, your trusted partner in managing your
              healthcare needs conveniently and efficiently. At Appoint A Doc,
              we understand the challenges individuals face when it comes to
              scheduling doctor appointments and managing their health records.
            </p>

            <p>
              AppointAdoc is committed to excellence in healthcare technology.
              We continuously strive to enhance our platform, integrating the
              latest advancements to improve user experience and deliver
              superior service. Whether you&apos;re booking your first
              appointment or managing ongoing care, AppointAdoc is here to
              support you every step of the way.
            </p>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Our Vision
              </h2>
              <p>
                Our vision at AppointAdoc is to create a seamless healthcare
                experience for every user. We aim to bridge the gap between
                patients and healthcare providers, making it easier for you to
                access the care you need, when you need it.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 md:pb-14">
        <h2 className="text-2xl md:text-3xl font-semibold uppercase text-gray-700 mb-8">
          Why Choose Us
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 border border-gray-300">
          <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-gray-300">
            <h3 className="text-lg font-semibold uppercase text-gray-800 mb-5">
              Efficiency:
            </h3>
            <p className="text-gray-600 leading-8">
              Streamlined appointment scheduling that fits into your busy
              lifestyle.
            </p>
          </div>

          <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-gray-300">
            <h3 className="text-lg font-semibold uppercase text-gray-800 mb-5">
              Convenience:
            </h3>
            <p className="text-gray-600 leading-8">
              Access to a network of trusted healthcare professionals in your
              area.
            </p>
          </div>

          <div className="p-8 md:p-10">
            <h3 className="text-lg font-semibold uppercase text-gray-800 mb-5">
              Personalization:
            </h3>
            <p className="text-gray-600 leading-8">
              Tailored recommendations and reminders to help you stay on top of
              your health.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
