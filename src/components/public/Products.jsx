import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../common/customer/Navbar";
import Footer from "../common/customer/Footer";
import ProductCard from "../common/customer/ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Placeholder grocery products data
  const placeholderProducts = [
    { _id: "1", title: "Fresh Apples", description: "Crisp, juicy apples perfect for snacking.", price: 120, image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=400&q=80" },
    { _id: "2", title: "Organic Bananas", description: "Sweet organic bananas, rich in potassium.", price: 80, image: "https://images.unsplash.com/photo-1574226516831-e1dff420e8f8?auto=format&fit=crop&w=400&q=80" },
    { _id: "3", title: "Fresh Tomatoes", description: "Vine-ripened tomatoes, great for salads.", price: 60, image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80" },
    { _id: "4", title: "Whole Wheat Bread", description: "Soft, healthy whole wheat bread loaf.", price: 50, image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80" },
    { _id: "5", title: "Fresh Spinach", description: "Leafy green spinach, packed with nutrients.", price: 40, image: "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80" },
    { _id: "6", title: "Brown Eggs (12 pack)", description: "Farm-fresh brown eggs, dozen pack.", price: 150, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80" },
    { _id: "7", title: "Potatoes (1kg)", description: "Fresh potatoes, perfect for any meal.", price: 35, image: "https://images.unsplash.com/photo-1506089676908-3592f7389d4d?auto=format&fit=crop&w=400&q=80" },
    { _id: "8", title: "Carrots (500g)", description: "Crunchy carrots, great for snacking and cooking.", price: 30, image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80" },
    { _id: "9", title: "Fresh Oranges", description: "Juicy oranges, full of vitamin C.", price: 100, image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80" }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/v1/products");
        setProducts(res.data);
        setError(null);
      } catch (err) {
        console.log("Backend not available, using placeholder data for products page");
        setProducts(placeholderProducts);
        setError("Demo Mode: Showing sample dairy products. Connect your backend to see real products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold text-center text-purple-800 mb-6 grocery-heading">
          Our Grocery Products
        </h1>
        <p className="text-lg text-center text-gray-600 mb-12 max-w-2xl mx-auto grocery-text">
          Browse our wide selection of fresh, high-quality grocery items, delivered straight to your door.
        </p>

        {error && (
          <div className="text-center mb-10 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800 font-medium">Demo Mode: Showing sample dairy products</p>
            <p className="text-blue-600 text-sm mt-1">Connect your backend to see real products</p>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="dairy-spinner mx-auto mb-4"></div>
            <p className="text-gray-600">Loading fresh grocery products...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} packageData={{
                ...product,
                title: product.name, // for compatibility with ProductCard
                image: product.image,
                price: product.price,
                description: product.description
              }} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Products; 