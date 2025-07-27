import React from "react";
import { Link } from "react-router-dom";
import { FaTag, FaStar, FaStore } from "react-icons/fa";
import { useCart } from "./CartContext";

const ProductCard = ({ packageData }) => {
  const { _id, name, title, description, price, image } = packageData;
  // Use name from backend or fallback to title for compatibility
  const displayName = name || title;
  const { addToCart } = useCart();

  // Use a default grocery product image if none is provided
  const imageUrl = image 
    ? (image.startsWith('http') ? image : `http://localhost:3001/public/uploads/${image}`)
    : "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80";

  return (
    <div className="product-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-transform duration-300 transform hover:-translate-y-1 border border-gray-100 dairy-fade-in">
      <div className="relative">
        <img src={imageUrl} alt={displayName} className="w-full h-56 object-cover" />
        <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold fresh-badge">
          100% Organic
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2 dairy-heading">{displayName}</h3>
        <p className="text-gray-600 mt-2 line-clamp-3 mb-4 dairy-text h-20">{description}</p>
        
        <div className="flex items-center text-gray-700 mb-4">
          <FaStore className="text-purple-600 mr-2" />
          <span className="text-sm font-medium">Sold by Grocery Store</span>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <FaTag className="text-purple-600 mr-2" />
            <span className="text-purple-800 font-bold text-xl">Rs.{price}</span>
          </div>
          <div className="flex flex-col gap-2">
          <Link to={`/products/${_id}`} className="dairy-btn bg-blue-800 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition duration-300">
            View Product
          </Link>
            <button
              onClick={() => addToCart(packageData)}
              className="dairy-btn bg-green-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition duration-300 mt-2"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
