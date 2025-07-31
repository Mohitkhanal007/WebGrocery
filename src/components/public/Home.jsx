import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import Footer from "../../components/common/customer/Footer";
import Hero from "../../components/common/customer/Hero";
import Navbar from "../../components/common/customer/Navbar";
import ProductCard from "../common/customer/ProductCard";

const Home = () => {
  const [showScroll, setShowScroll] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const productsRef = useRef(null);

  // Placeholder grocery products data
  const placeholderProducts = [
    {
      _id: "1",
      title: "Fresh Whole Milk",
      description: "Pure, fresh whole milk sourced from local farms. Rich in calcium and essential nutrients.",
      price: 45,
      image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80' // Milk
    },
    {
      _id: "2", 
      title: "Organic Greek Yogurt",
      description: "Creamy organic Greek yogurt made with traditional methods. High in protein and probiotics.",
      price: 65,
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80' // Yogurt
    },
    {
      _id: "3",
      title: "Aged Cheddar Cheese",
      description: "Premium aged cheddar cheese with rich, sharp flavor. Perfect for cooking and snacking.",
      price: 120,
      image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=400&q=80' // Cheese
    },
    {
      _id: "4",
      title: "Fresh Butter",
      description: "Pure, unsalted butter made from fresh cream. Ideal for baking and cooking.",
      price: 85,
      image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80' // Butter
    },
    {
      _id: "5",
      title: "Homemade Paneer",
      description: "Fresh homemade paneer, perfect for Indian cuisine. High in protein and calcium.",
      price: 95,
      image: 'https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80' // Paneer
    },
    {
      _id: "6",
      title: "Fresh Cream",
      description: "Rich, fresh cream perfect for desserts and coffee. Sourced from premium dairy farms.",
      price: 55,
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80' // Cream
    }
  ];

  // Show scroll-to-top after scrolling
  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch grocery products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/v1/products");
        setProducts(response.data);
        setError(null);
      } catch (err) {
        console.log("Backend not available, using placeholder data");
        setProducts(placeholderProducts);
        setError("Demo Mode: Showing sample grocery products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Navbar scrollToProducts={scrollToProducts} />
      <Hero />

      {/* Features Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Why Choose Our Grocery Store?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=400&q=80" 
                alt="Fresh Products"
                className="w-24 h-24 mx-auto mb-4 rounded-full object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Fresh Products</h3>
              <p className="text-gray-600">Sourced directly from local farms and trusted suppliers</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80" 
                alt="Fast Delivery"
                className="w-24 h-24 mx-auto mb-4 rounded-full object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Same-day delivery to ensure maximum freshness</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80" 
                alt="Quality Assured"
                className="w-24 h-24 mx-auto mb-4 rounded-full object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Quality Assured</h3>
              <p className="text-gray-600">Rigorous quality control and safety standards</p>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div ref={productsRef} className="container mx-auto py-10">
        <h2 className="text-3xl font-bold text-black text-center mb-6">
          Fresh Grocery Products
        </h2>
        
        {error && (
          <div className="text-center mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-black font-medium">{error.replace(/dairy/gi, 'grocery')}</p>
            <p className="text-gray-600 text-sm mt-1">Connect your backend to see real products</p>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="grocery-spinner mx-auto mb-4"></div>
            <p className="text-gray-600">Loading fresh grocery products...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} packageData={product} />
            ))}
          </div>
        )}
      </div>

      {/* Testimonials Section */}
      <div className="bg-blue-50 py-16">
        <div className="container mx-auto px-6">
                      <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
              What Our Users Say
            </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=100&q=80" 
                  alt="Customer 1"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">Sarah Johnson</h4>
                  <p className="text-sm text-gray-600">Regular User</p>
                </div>
              </div>
              <p className="text-gray-700">"The quality of their grocery products is outstanding. Fresh delivery every time!"</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" 
                  alt="Customer 2"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">Michael Chen</h4>
                  <p className="text-sm text-gray-600">Business User</p>
                </div>
              </div>
              <p className="text-gray-700">"Perfect for our restaurant. Bulk orders are always on time and fresh."</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80" 
                  alt="Customer 3"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">Emily Rodriguez</h4>
                  <p className="text-sm text-gray-600">Home Chef</p>
                </div>
              </div>
              <p className="text-gray-700">"Love their organic selection. The vegetables are always crisp and fresh!"</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Scroll to Top Button */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-blue-700 text-white p-3 rounded-full shadow-lg hover:bg-blue-800 transition duration-300 cursor-pointer"
        >
          <FaArrowUp size={20} />
        </button>
      )}
    </>
  );
};

export default Home;
