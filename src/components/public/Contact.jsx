import React from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaClock, FaTruck } from "react-icons/fa";
import Footer from "../../components/common/customer/Footer";
import Navbar from "../../components/common/customer/Navbar";

const Contact = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 py-20">
        {/* Hero Section */}
        <div className="relative w-full h-[300px] rounded-lg overflow-hidden shadow-lg mb-12">
          <img
            src="https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=1200&q=80"
            alt="Contact Us"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-70 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
              <p className="text-xl">
                Have questions about our grocery products? We'd love to hear from you.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-12">
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
            <div className="flex justify-center mb-4">
              <FaPhone className="text-blue-800 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-blue-800">Phone</h3>
            <p className="text-gray-700 mt-2">+977 9847034098</p>
            <p className="text-sm text-gray-500 mt-1">24/7 Customer Support</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
            <div className="flex justify-center mb-4">
              <FaEnvelope className="text-blue-800 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-blue-800">Email</h3>
            <p className="text-gray-700 mt-2">mohitkhanal567@gmail.com</p>
            <p className="text-sm text-gray-500 mt-1">Primary Contact</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
            <div className="flex justify-center mb-4">
              <FaMapMarkerAlt className="text-blue-800 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-blue-800">Address</h3>
            <p className="text-gray-700 mt-2">Kathmandu</p>
            <p className="text-sm text-gray-500 mt-1">Nepal</p>
          </div>
        </div>

        {/* Business Hours & Delivery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-green-50 p-6 rounded-lg border border-green-100">
            <div className="flex items-center mb-4">
              <FaClock className="text-green-600 text-2xl mr-3" />
              <h3 className="text-xl font-semibold text-green-800">Business Hours</h3>
            </div>
            <div className="space-y-2 text-gray-700">
              <p><strong>Monday - Friday:</strong> 6:00 AM - 8:00 PM</p>
              <p><strong>Saturday:</strong> 7:00 AM - 6:00 PM</p>
              <p><strong>Sunday:</strong> 8:00 AM - 4:00 PM</p>
            </div>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
            <div className="flex items-center mb-4">
              <FaTruck className="text-blue-600 text-2xl mr-3" />
              <h3 className="text-xl font-semibold text-blue-800">Delivery Schedule</h3>
            </div>
            <div className="space-y-2 text-gray-700">
              <p><strong>Morning Delivery:</strong> 6:00 AM - 10:00 AM</p>
              <p><strong>Afternoon Delivery:</strong> 2:00 PM - 6:00 PM</p>
              <p><strong>Same Day Orders:</strong> Before 2:00 PM</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="mt-12 bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto border border-gray-100">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4 text-center">
            Send Us a Message
          </h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-gray-800 font-semibold mb-2">Full Name</label>
                <input type="text" id="name" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400" />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-800 font-semibold mb-2">Email Address</label>
                <input type="email" id="email" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400" />
              </div>
            </div>
            <div>
              <label htmlFor="phone" className="block text-gray-800 font-semibold mb-2">Phone Number</label>
              <input type="tel" id="phone" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400" />
            </div>
            <div>
              <label htmlFor="subject" className="block text-gray-800 font-semibold mb-2">Subject</label>
              <select id="subject" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400">
                <option value="">Select a subject</option>
                <option value="order">Order Inquiry</option>
                <option value="delivery">Delivery Question</option>
                <option value="quality">Product Quality</option>
                <option value="bulk">Bulk Order</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-800 font-semibold mb-2">Message</label>
              <textarea id="message" rows="5" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400" placeholder="Tell us how we can help you..."></textarea>
            </div>
            <button type="submit" className="w-full bg-blue-800 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition duration-300 font-semibold">
              Send Message
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact; 
