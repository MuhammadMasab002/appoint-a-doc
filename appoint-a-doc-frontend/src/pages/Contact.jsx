import React from "react";
import { assets } from "../assets/assets";

function Contact() {
  return (
    <div className="w-full">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <h1 className="text-center text-3xl md:text-4xl font-semibold text-gray-700 uppercase">
          <span className="text-gray-500">Contact</span> Us
        </h1>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
          <img
            src={assets.contact_image}
            alt="Contact us"
            className="w-full max-w-md mx-auto md:mx-0 rounded"
          />

          <div className="text-gray-600 space-y-8 leading-8 text-base">
            <div>
              <h2 className="text-2xl font-semibold text-gray-700 uppercase mb-4">
                Our Office
              </h2>
              <p>54709 Willms Station</p>
              <p>Suite 350, Washington, USA</p>

              <div className="mt-6">
                <p>Tel: (415) 555-0132</p>
                <p>Email: appointadoc@gmail.com</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-700 uppercase mb-4">
                Careers at Appoint A Doc
              </h2>
              <p>Learn more about our teams and job openings.</p>

              <button
                type="button"
                className="mt-6 px-8 py-3 border border-gray-400 text-gray-700 hover:bg-gray-100 transition"
              >
                Explore Jobs
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
