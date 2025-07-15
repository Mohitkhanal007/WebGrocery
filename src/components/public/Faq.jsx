import React, { useState } from "react";
import Footer from "../../components/common/customer/Footer";
import Navbar from "../../components/common/customer/Navbar";
import { FaLeaf, FaTruck, FaClock, FaShieldAlt } from "react-icons/fa";

const faqData = [
  {
    question: "How fresh are your grocery products?",
    answer:
      "All our groceries are sourced fresh from local farms and trusted suppliers, delivered within 24 hours of procurement. We maintain strict quality control to ensure maximum freshness.",
  },
  {
    question: "What are your delivery timings?",
    answer:
      "We offer morning delivery (6:00 AM - 10:00 AM) and afternoon delivery (2:00 PM - 6:00 PM). Same-day delivery is available for orders placed before 2:00 PM.",
  },
  {
    question: "Do you offer bulk orders for businesses?",
    answer:
      "Yes, we provide special pricing and delivery schedules for bulk grocery orders. Contact our business team for custom quotes and arrangements.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept Credit/Debit cards, UPI, Net Banking, digital wallets, and cash on delivery for your convenience.",
  },
  {
    question: "Can I modify or cancel my order?",
    answer:
      "Orders can be modified or cancelled up to 2 hours before the scheduled delivery time. Contact our customer support for assistance.",
  },
  {
    question: "How do you ensure product quality?",
    answer:
      "We work with certified suppliers and conduct regular quality checks. All products undergo rigorous testing for safety and freshness before delivery.",
  },
  {
    question: "Do you deliver on weekends?",
    answer:
      "Yes, we deliver 7 days a week. Weekend delivery timings are slightly different - Saturday (7:00 AM - 6:00 PM) and Sunday (8:00 AM - 4:00 PM).",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-blue-800 mb-6 text-center">Frequently Asked Questions</h2>
        <p className="text-lg text-gray-600 text-center mb-12">
          Find answers to common questions about our grocery products and services
        </p>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-blue-50 p-4 rounded-lg text-center border border-blue-100">
            <FaLeaf className="text-3xl text-green-600 mx-auto mb-2" />
            <h3 className="font-semibold text-blue-800">100% Natural</h3>
            <p className="text-sm text-gray-600">No preservatives</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg text-center border border-blue-100">
            <FaTruck className="text-3xl text-blue-600 mx-auto mb-2" />
            <h3 className="font-semibold text-blue-800">Fast Delivery</h3>
            <p className="text-sm text-gray-600">Same day available</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg text-center border border-blue-100">
            <FaClock className="text-3xl text-orange-600 mx-auto mb-2" />
            <h3 className="font-semibold text-blue-800">24/7 Support</h3>
            <p className="text-sm text-gray-600">Always here to help</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg text-center border border-blue-100">
            <FaShieldAlt className="text-3xl text-purple-600 mx-auto mb-2" />
            <h3 className="font-semibold text-blue-800">Quality Assured</h3>
            <p className="text-sm text-gray-600">Certified products</p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqData.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg mb-4 bg-white shadow-sm">
              <button
                className="w-full flex justify-between items-center py-4 px-6 text-lg font-semibold text-gray-700 focus:outline-none hover:bg-gray-50 transition duration-200"
                onClick={() => toggleFaq(index)}
              >
                {faq.question}
                <span className="text-blue-600 text-2xl transition-transform duration-200">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-gray-700 px-6 pb-4 leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 text-center bg-blue-50 p-8 rounded-lg border border-blue-100">
          <h3 className="text-2xl font-bold text-blue-800 mb-4">Still Have Questions?</h3>
          <p className="text-gray-600 mb-6">
            Can't find the answer you're looking for? Our customer support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-800 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300 font-semibold">
              Contact Support
            </button>
            <button className="bg-white text-blue-800 px-6 py-3 rounded-md border border-blue-800 hover:bg-blue-50 transition duration-300 font-semibold">
              Live Chat
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Faq;
