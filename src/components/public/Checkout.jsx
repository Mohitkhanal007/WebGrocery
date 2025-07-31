import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../../components/common/customer/Footer";
import Navbar from "../../components/common/customer/Navbar";

const Checkout = () => {
  const { id } = useParams(); // Get product ID from URL
  const navigate = useNavigate();
  const [productData, setProductData] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    quantity: 1,
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "Nepal"
    },
    paymentMethod: "cod",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please login to place an order");
      setLoading(false);
      return;
    }

    const fetchProductDetails = async () => {
      try {
        const res = await axios.get(`/api/v1/products/${id}`);
        setProductData(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleChange = (e) => {
    if (e.target.name.startsWith('address.')) {
      const field = e.target.name.split('.')[1];
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [field]: e.target.value
        }
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Place Order Function
  const placeOrder = async () => {
    try {
      console.log("Placing order...");
      
      // Get user ID from localStorage
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("Please login to place an order");
        return;
      }

      // Create order data
      const orderData = {
        userId,
        items: [{
          productId: productData._id,
          title: productData.name || productData.title,
          price: productData.price,
          quantity: parseInt(formData.quantity),
          image: productData.image
        }],
        address: formData.address,
        total: productData.price * parseInt(formData.quantity),
        paymentMethod: formData.paymentMethod,
        paymentId: formData.paymentMethod === "cod" ? "cod-" + Date.now() : "card-" + Date.now()
      };

      console.log("Order data:", orderData);

      // Save order to backend
      const orderResponse = await axios.post("/api/v1/orders", orderData);
      
      if (orderResponse.data.success) {
        alert("Order placed successfully! 🎉");
        navigate("/mybooking");
      } else {
        console.error("Order creation failed:", orderResponse.data);
        alert("Failed to place order. Please try again.");
      }
    } catch (err) {
      console.error("Error creating order:", err);
      alert("Failed to place order. Please try again.");
    }
  };

  const handlePayment = () => {
    if (!localStorage.getItem("token")) {
      alert("Please login to place an order");
      navigate("/login");
      return;
    }

    if (!formData.fullName || !formData.email || !formData.phone) {
      alert("Please fill in all required fields");
      return;
    }

    placeOrder();
  };

  if (loading) return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 py-20">
        <p className="text-center py-10 text-lg">Loading checkout details...</p>
      </div>
    </>
  );
  
  if (error) return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 py-20">
        <div className="text-center">
          <p className="text-red-600 py-10 text-lg">{error}</p>
          {error.includes("login") && (
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Go to Login
            </button>
          )}
        </div>
      </div>
    </>
  );

  if (!productData) return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 py-20">
        <p className="text-center py-10">Product not found.</p>
      </div>
    </>
  );

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">🛒 Checkout</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Product Summary */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">📦 Order Summary</h3>
            <div className="flex flex-col items-center">
              <img 
                src={productData.image ? (productData.image.startsWith('http') ? productData.image : `http://localhost:3001/uploads/${productData.image}`) : "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80"} 
                alt={productData.name || productData.title} 
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
              <div className="mt-4 w-full">
                <h4 className="text-xl font-semibold text-gray-700">{productData.name || productData.title}</h4>
                <p className="text-gray-600">{productData.description}</p>
                <p className="text-gray-800 font-bold mt-2 text-lg">₹{productData.price} / unit</p>
                <p className="text-gray-600 mt-2">Quantity: {formData.quantity}</p>
                <p className="text-gray-800 font-bold mt-2 text-xl">Total: ₹{productData.price * parseInt(formData.quantity)}</p>
              </div>
            </div>
          </div>

          {/* Order Form */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">📝 Delivery Details</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-800 font-semibold mb-2">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-800 font-semibold mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-800 font-semibold mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-800 font-semibold mb-2">Quantity *</label>
                <input
                  type="number"
                  name="quantity"
                  placeholder="Quantity"
                  value={formData.quantity}
                  min="1"
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              {/* Address Fields */}
              <div>
                <label className="block text-gray-800 font-semibold mb-2">Street Address *</label>
                <input
                  type="text"
                  name="address.street"
                  placeholder="Enter your street address"
                  value={formData.address.street}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-800 font-semibold mb-2">City *</label>
                  <input
                    type="text"
                    name="address.city"
                    placeholder="City"
                    value={formData.address.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-800 font-semibold mb-2">State *</label>
                  <input
                    type="text"
                    name="address.state"
                    placeholder="State"
                    value={formData.address.state}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-800 font-semibold mb-2">ZIP Code *</label>
                <input
                  type="text"
                  name="address.zip"
                  placeholder="ZIP Code"
                  value={formData.address.zip}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-gray-800 font-semibold mb-2">Payment Method *</label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-400"
                  required
                >
                  <option value="cod">Cash on Delivery</option>
                  <option value="card">Credit/Debit Card</option>
                </select>
              </div>

              {/* Payment Button */}
              <button
                type="button"
                onClick={handlePayment}
                className="w-full bg-blue-800 text-white py-3 rounded-lg text-lg hover:bg-blue-700 transition duration-300"
              >
                {formData.paymentMethod === "cod" 
                  ? `Place Order (Cash on Delivery) - ₹${productData.price * parseInt(formData.quantity)}`
                  : `Pay with Card - ₹${productData.price * parseInt(formData.quantity)}`
                }
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
