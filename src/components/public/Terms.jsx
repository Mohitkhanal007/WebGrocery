import React from "react";
import Footer from "../../components/common/customer/Footer";
import Navbar from "../../components/common/customer/Navbar";

const Terms = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 py-20">
        {/* Hero Section */}
        <div className="relative w-full h-[300px] rounded-lg overflow-hidden shadow-lg mb-12">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80"
            alt="Terms and Conditions"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-70 flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-5xl font-bold mb-4">Terms and Conditions</h2>
              <p className="text-xl">
                Please read our terms carefully before using our services
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md space-y-6 text-gray-700 max-w-4xl mx-auto border border-gray-100">
          <p className="text-lg">
            Welcome to Dairy Go! By using our website and purchasing our products, you agree to the following terms and conditions. Please read them carefully.
          </p>

          <h3 className="text-2xl font-semibold text-blue-800 pt-4">1. Orders and Payments</h3>
          <p>
            All orders are subject to acceptance and availability. Full payment must be made at the time of purchase. We accept various payment methods, including credit/debit cards and digital wallets, as detailed during the checkout process. All prices are listed in Rupees (Rs.) and are inclusive of applicable taxes.
          </p>

          <h3 className="text-2xl font-semibold text-blue-800 pt-4">2. Shipping and Delivery</h3>
          <p>
            We are committed to delivering fresh products to your doorstep. Our delivery schedule is specified on our Contact Us page. While we strive to meet the delivery times, delays may occur due to unforeseen circumstances. We are not liable for any delay in delivery. Risk of loss and title for all products pass to you upon our delivery to the carrier.
          </p>

          <h3 className="text-2xl font-semibold text-blue-800 pt-4">3. Returns and Refunds</h3>
          <p>
            Due to the perishable nature of our dairy products, we do not accept returns. However, if you receive a damaged or incorrect product, please contact our customer support within 24 hours of delivery. We may offer a replacement or a refund at our discretion, provided there is sufficient proof of the issue.
          </p>
          
          <h3 className="text-2xl font-semibold text-blue-800 pt-4">4. Product Information</h3>
          <p>
            We make every effort to display as accurately as possible the colors, features, specifications, and details of the products available on the site. However, we do not guarantee that the colors, features, specifications, and details of the products will be accurate, complete, reliable, current, or free of other errors.
          </p>

          <h3 className="text-2xl font-semibold text-blue-800 pt-4">5. Limitation of Liability</h3>
          <p>
            Dairy Go is not liable for any indirect, incidental, or consequential damages arising out of your use of our products or website. Our total liability to you for any damages shall not exceed the amount you paid for the product.
          </p>

          <h3 className="text-2xl font-semibold text-blue-800 pt-4">6. Governing Law</h3>
          <p>
            These terms are governed by the laws of India. Any disputes will be resolved in the courts of New Delhi.
          </p>
        </div>
        <p className="text-gray-700 mt-8 text-center">
          If you have any questions about these Terms, please contact us at{" "}
          <a href="mailto:support@dairygo.com" className="text-blue-800 hover:underline">support@dairygo.com</a>.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default Terms;
