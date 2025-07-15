import React from "react";
import Navbar from "../common/customer/Navbar";
import Footer from "../common/customer/Footer";
import ProductCard from "../common/customer/ProductCard";
import { placeholderProducts } from "./demoProducts";

const Products = () => {
  const products = placeholderProducts;
  const [showScroll, setShowScroll] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 py-20" style={{ minHeight: "2000px" }}>
        <h1 className="text-4xl font-bold text-center text-purple-800 mb-6 grocery-heading">
          Our Grocery Products
        </h1>
        <p className="text-lg text-center text-gray-600 mb-12 max-w-2xl mx-auto grocery-text">
          Browse our wide selection of fresh, high-quality grocery items, delivered straight to your door.
        </p>
        <div className="text-center mb-10 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800 font-medium">Demo Mode: Showing sample grocery products</p>
          <p className="text-blue-600 text-sm mt-1">Connect your backend to see real products</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 10 }).map((_, i) => (
            <div className="product-card" key={i} style={{height: '200px', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', zIndex: 50, position: 'relative'}}>
              <a href={`/products/${i+1}`}>View Product</a>
            </div>
          ))}
        </div>
        <div style={{ height: '3000px' }}></div>
      </div>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 bg-blue-700 text-white p-3 rounded-full shadow-lg hover:bg-blue-800 transition duration-300 cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </svg>
      </button>
      <Footer />
    </>
  );
};

export default Products; 