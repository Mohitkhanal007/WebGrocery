import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaHeart, FaTag, FaInfoCircle, FaCalendarCheck, FaShoppingCart } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../common/customer/Footer";
import Navbar from "../common/customer/Navbar";
import { placeholderProducts } from "./demoProducts";
import { useCart } from "../common/customer/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const token = localStorage.getItem("token");
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await axios.get(`/api/v1/products/${id}`);
        setProductData(res.data);
      } catch (err) {
        // Fallback to demo product if backend fails
        const demoProduct = placeholderProducts.find(p => p._id === id);
        if (demoProduct) {
          setProductData(demoProduct);
          setError("");
        } else {
          setError("Failed to load product details.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [id]);

  if (loading) return <div className="text-center py-20"><div className="dairy-spinner mx-auto"></div></div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 py-20">
        {productData && (
          <>
            {/* Hero Section */}
            <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
              <img
                src={`http://localhost:3001/uploads/${productData.image}`}
                alt={productData.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-70 flex items-center justify-center">
                <h1 className="text-white text-5xl font-bold shadow-lg dairy-heading">{productData.name}</h1>
              </div>
            </div>

            {/* Product Details Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
              {/* Left Side - Details */}
              <div className="bg-blue-50 p-8 rounded-lg shadow-md border border-blue-100">
                <h3 className="text-3xl font-bold text-blue-800 mb-6 flex items-center">
                  <FaInfoCircle className="mr-3" /> Product Details
                </h3>
                <p className="text-lg text-gray-700 mt-4 leading-relaxed">{productData.description}</p>
                 <div className="mt-4">
                    <h4 className="font-semibold">Brand:</h4> <p>{productData.brand}</p>
                    <h4 className="font-semibold">Category:</h4> <p>{productData.category}</p>
                    <h4 className="font-semibold">Unit:</h4> <p>{productData.unit}</p>
                    <h4 className="font-semibold">Organic:</h4> <p>{productData.isOrganic ? 'Yes' : 'No'}</p>
                 </div>
                 <div className="mt-4">
                    <h4 className="text-xl font-bold text-gray-800 mb-2">Nutritional Information</h4>
                    <ul className="list-disc list-inside">
                      <li>Calories: {productData.nutritionalInfo?.calories}</li>
                      <li>Protein: {productData.nutritionalInfo?.protein}g</li>
                      <li>Fat: {productData.nutritionalInfo?.fat}g</li>
                      <li>Carbohydrates: {productData.nutritionalInfo?.carbohydrates}g</li>
                      <li>Calcium: {productData.nutritionalInfo?.calcium}mg</li>
                    </ul>
                 </div>
              </div>

              {/* Right Side - Info & Actions */}
              <div>
                
                <div className="mt-8 space-y-4">
                  <p className="flex items-center text-gray-800 text-2xl">
                    <FaTag className="mr-3 text-blue-600" />
                    <span className="font-semibold">Rs.{productData.price}</span>
                  </p>
                  
                  {/* Best Before Date */}
                  <div className="mt-4">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
                      <FaCalendarCheck className="mr-3 text-green-600" /> Best Before
                    </h3>
                    <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-md font-semibold">
                      {new Date(productData.expiryDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </span>
                  </div>
                </div>

                {/* Order & Wishlist Section */}
                <div className="mt-10 flex flex-col gap-4">
                  <button
                    onClick={() => addToCart(productData)}
                    className="dairy-btn bg-green-600 text-white py-4 px-10 text-xl rounded-lg shadow-lg hover:bg-green-700 transition duration-300 flex items-center"
                  >
                    <FaShoppingCart className="mr-3" />
                    Add to Cart
                  </button>
                  {/* Wishlist Button */}
                  <button className="flex items-center text-lg font-semibold text-gray-800 transition duration-300 hover:text-red-600">
                    <FaHeart className="mr-2 text-2xl text-gray-400" />
                    Add to Wishlist
                  </button>
                  {/* Order Button */}
                  <button
                    onClick={() => navigate(`/checkout/${productData._id}`)}
                    className="dairy-btn bg-blue-800 text-white py-4 px-10 text-xl rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 flex items-center"
                  >
                    <FaShoppingCart className="mr-3" />
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;

