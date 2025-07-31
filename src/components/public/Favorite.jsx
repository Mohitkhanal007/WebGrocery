import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaTrash, FaHeart } from "react-icons/fa";
import Footer from "../../components/common/customer/Footer";
import Navbar from "../../components/common/customer/Navbar";
import { Link } from "react-router-dom";

const Favorite = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem("token"); 
        const response = await axios.get("/api/v1/wishlist", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("API Response:", response.data); // Debug API response

        if (response.data && response.data.success) {
          const products = response.data.wishlist?.products || [];
          setFavorites(products);
        } else {
          console.error("Unexpected API response format:", response.data);
          setFavorites([]); 
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
        setFavorites([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const removeFavorite = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to manage your wishlist");
        return;
      }

      const response = await axios.delete(`/api/v1/wishlist/remove/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (response.data && response.data.success) {
        // Update UI by filtering out the removed product
        setFavorites((prevFavorites) => prevFavorites.filter((product) => product._id !== id));
        alert("Removed from wishlist ❤️");
      } else {
        alert(response.data?.message || "Failed to remove from wishlist");
      }
    } catch (error) {
      console.error("Error removing wishlist item:", error);
      alert("Failed to remove from wishlist. Please try again.");
    }
  };
  

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 py-25 h-[500px]">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Your Wishlist ❤️</h1>

        {loading ? (
          <p className="text-center text-gray-800 text-lg">Loading favorites...</p>
        ) : favorites.length === 0 ? (
          <p className="text-center text-gray-800 text-lg">No products in your wishlist yet.</p>
        ) : (
          <div className="flex flex-col gap-6">
            {favorites.map((product) => (
              <div key={product._id} className="bg-white shadow-lg rounded-lg flex items-center p-4">
                <img 
                  src={product.image ? (product.image.startsWith('http') ? product.image : `http://localhost:3001/uploads/${product.image}`) : "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80"} 
                  alt={product.name || product.title} 
                  className="w-32 h-32 object-cover rounded-md" 
                />
                <div className="ml-6 flex-grow">
                  <h3 className="text-2xl font-bold text-gray-800">{product.name || product.title}</h3>
                  <p className="text-gray-800 mt-1">{product.description}</p>
                  <p className="text-lg font-semibold text-red-800 mt-2">₹{product.price}</p>
                </div>
                <div className="flex gap-2">
                  <Link 
                    to={`/products/${product._id}`} 
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                  >
                    View Product
                  </Link>
                  <button
                    onClick={() => removeFavorite(product._id)}
                    className="bg-red-800 text-white py-2 px-4 rounded-lg hover:bg-red-700 flex items-center gap-2"
                  >
                    <FaTrash /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
    
  );
};

export default Favorite; 
