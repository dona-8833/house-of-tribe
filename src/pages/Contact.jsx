import React from "react";
import Layout from "../components/layout/Layout";
import { Mail, MapPin, Phone, Send } from "lucide-react";

const Contact = () => {
  return (
    <Layout>
      <div className="min-h-[80vh] bg-gradient-to-br from-gray-50 to-blue-50 p-6 md:p-12 flex flex-col md:flex-row gap-8">
        {/* Form Side */}
        <div className="flex-1 bg-white p-8 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl">
          <h2 className="text-3xl font-bold mb-8 text-gray-900 flex items-center gap-2">
            <Mail className="w-8 h-8 text-blue-600" />
            Get in Touch
          </h2>
          <form className="flex flex-col gap-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Your Name"
                required
                className="w-full p-4 border border-gray-200 rounded-lg text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              />
            </div>
            <div className="relative">
              <input
                type="email"
                placeholder="Your Email"
                required
                className="w-full p-4 border border-gray-200 rounded-lg text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              />
            </div>
            <div className="relative">
              <textarea
                placeholder="Your Message"
                rows={5}
                required
                className="w-full p-4 border border-gray-200 rounded-lg text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              />
            </div>
            <button
              type="submit"
              className="p-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-all duration-200 transform hover:scale-105"
            >
              <Send className="w-5 h-5" />
              Send Message
            </button>
          </form>
        </div>

        {/* Info Side */}
        <div className="flex-1 flex flex-col justify-center gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl">
            <h4 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-blue-600" />
              Visit Our Office
            </h4>
            <p className="text-gray-600 mt-3 leading-relaxed">
2-4 Southcoates Lane
HU9 3AB
<br />
United Kingdom            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl">
            <h4 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-blue-600" />
              Visit Our Office
            </h4>
            <p className="text-gray-600 mt-3 leading-relaxed">
              No 14, Harmony Estate, Soka, Ibadan. <br /> Oyo State
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl">
            <h4 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <Phone className="w-6 h-6 text-blue-600" />
              Sales & Support
            </h4>
            <p className="text-gray-600 mt-3">+2348164487941</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl">
            <h4 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <Phone className="w-6 h-6 text-blue-600" />
              General Inquiries
            </h4>
            <p className="text-gray-600 mt-3">+447407676575</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl">
            <h4 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              Return policy
            </h4>
            <p className="text-gray-600 mt-3">Unworn items can be returned within 7 days of delivery</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;