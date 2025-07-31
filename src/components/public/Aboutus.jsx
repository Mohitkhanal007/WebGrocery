import React from "react";
import Footer from "../../components/common/customer/Footer";
import Navbar from "../../components/common/customer/Navbar";
import { FaLeaf, FaTruck, FaAward, FaUsers } from "react-icons/fa";

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 py-20">
        {/* Hero Section */}
        <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-lg mb-12">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80"
            alt="About Grocery Store"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-70 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-5xl font-bold mb-4">About Grocery Store</h1>
              <p className="text-xl">
                Your trusted partner for fresh, high-quality groceries delivered right to your doorstep.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" 
              alt="Fresh Groceries"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-purple-800 mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              We are committed to delivering the freshest, highest-quality groceries from local farms and trusted suppliers to your family. Our mission is to ensure that every household has access to pure, natural, and healthy food products that promote wellness and convenience.
            </p>
            <h3 className="text-2xl font-bold text-purple-800 mb-3">Why Choose Grocery Store?</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>✅ Fresh products sourced from local farms and trusted suppliers</li>
              <li>✅ Daily delivery to ensure maximum freshness</li>
              <li>✅ Wide variety of grocery essentials</li>
              <li>✅ Commitment to quality and food safety</li>
              <li>✅ 24/7 customer support and flexible ordering</li>
            </ul>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-12">What Makes Us Special</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <FaLeaf className="text-4xl text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-blue-800 mb-2">100% Natural</h3>
              <p className="text-gray-600">No artificial preservatives or additives</p>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <FaTruck className="text-4xl text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-blue-800 mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Same-day delivery for maximum freshness</p>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <FaAward className="text-4xl text-yellow-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-blue-800 mb-2">Quality Assured</h3>
              <p className="text-gray-600">Rigorous quality control standards</p>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <FaUsers className="text-4xl text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-blue-800 mb-2">Local Farmers</h3>
              <p className="text-gray-600">Supporting local dairy farming communities</p>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">Meet Our Team</h2>
          <p className="text-lg text-gray-600 mb-12">
            Our dedicated team of dairy experts is here to ensure you get the best quality products.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80" alt="Sarah Johnson" className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
              <h4 className="text-xl font-semibold text-blue-800">Sarah Johnson</h4>
              <p className="text-gray-600">Quality Control Manager</p>
            </div>
            {/* Team Member 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" alt="Michael Chen" className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
              <h4 className="text-xl font-semibold text-blue-800">Michael Chen</h4>
              <p className="text-gray-600">Operations Director</p>
            </div>
            {/* Team Member 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80" alt="Emily Rodriguez" className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
              <h4 className="text-xl font-semibold text-blue-800">Emily Rodriguez</h4>
              <p className="text-gray-600">Customer Relations</p>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-12">Our Grocery Collection</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=400&q=80" 
                alt="Fresh Fruits"
                className="w-full h-48 object-cover hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <h3 className="text-white font-semibold">Fresh Fruits</h3>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80" 
                alt="Fresh Vegetables"
                className="w-full h-48 object-cover hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <h3 className="text-white font-semibold">Fresh Vegetables</h3>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80" 
                alt="Dairy Products"
                className="w-full h-48 object-cover hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <h3 className="text-white font-semibold">Dairy Products</h3>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80" 
                alt="Organic Products"
                className="w-full h-48 object-cover hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <h3 className="text-white font-semibold">Organic Products</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs; 
