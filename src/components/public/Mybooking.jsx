import React, { useState, useEffect } from "react";
import Footer from "../common/customer/Footer";
import Navbar from "../common/customer/Navbar";
import axios from "axios";
import { toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingBag, FaClock, FaCheckCircle, FaTruck, FaTimesCircle } from "react-icons/fa";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [prevOrders, setPrevOrders] = useState([]);
  const navigate = useNavigate();

  // Placeholder data for grocery orders
  const placeholderOrders = [
    {
      _id: "order1",
      items: [{ title: "Fresh Milk", price: 120, quantity: 2, image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80" }],
      createdAt: new Date().toISOString(),
      total: 240,
      status: "Confirmed",
      paymentMethod: "Cash on Delivery",
      address: {
        street: "123 Main Street",
        city: "Kathmandu",
        state: "Bagmati",
        zip: "44600",
        country: "Nepal"
      }
    },
    {
      _id: "order2",
      items: [{ title: "Organic Yogurt", price: 85, quantity: 1, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80" }],
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      total: 85,
      status: "Delivered",
      paymentMethod: "Card",
      address: {
        street: "456 Oak Avenue",
        city: "Lalitpur",
        state: "Bagmati",
        zip: "44700",
        country: "Nepal"
      }
    },
  ];

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    
    if (!token || !userId) {
      setError("Please login to view your orders.");
      setLoading(false);
      toast.error("Please login to view your orders.");
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Always try to fetch from backend first
        const response = await axios.get(`/api/v1/orders/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        if (response.data && response.data.success) {
          const fetchedOrders = response.data.orders || [];
          
          // Show toast if any order status changed
          if (prevOrders.length > 0) {
            fetchedOrders.forEach(order => {
              const prev = prevOrders.find(o => o._id === order._id);
              if (prev && prev.status !== order.status) {
                toast.info(`Order ${order._id.slice(-6)} status updated: ${order.status}`);
              }
            });
          }
          
          setPrevOrders(fetchedOrders);
          setOrders(fetchedOrders);
        } else {
          setOrders([]);
          setError("No orders found. Place your first order to see it here!");
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
        
        // If backend is not available, show placeholder data
        if (err.code === 'ERR_NETWORK' || err.response?.status >= 500) {
          setOrders(placeholderOrders);
          setError("Demo Mode: Showing sample orders (Backend unavailable).");
          toast.info("Demo Mode: Showing sample orders (Backend unavailable).");
        } else if (err.response?.status === 401) {
          setError("Please login again to view your orders.");
          toast.error("Please login again to view your orders.");
        } else {
          setError("Failed to fetch orders. Please try again.");
          toast.error("Failed to fetch orders. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
    // Poll for status updates every 30 seconds
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, [prevOrders]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "confirmed": return "text-blue-600 bg-blue-100";
      case "delivered": return "text-green-600 bg-green-100";
      case "pending": return "text-yellow-600 bg-yellow-100";
      case "cancelled": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "confirmed": return <FaCheckCircle className="text-blue-600" />;
      case "delivered": return <FaTruck className="text-green-600" />;
      case "pending": return <FaClock className="text-yellow-600" />;
      case "cancelled": return <FaTimesCircle className="text-red-600" />;
      default: return <FaClock className="text-gray-600" />;
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 pt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              My Orders
            </h1>
            <p className="text-lg text-gray-600">
              Track your recent grocery orders and their status.
            </p>
          </div>

          {error && (
            <div className="max-w-2xl mx-auto mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-800 font-medium text-center">{error}</p>
              {error.includes("Please login") && (
                <div className="text-center mt-4">
                  <button 
                    onClick={handleLoginRedirect}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Login Now
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="max-w-4xl mx-auto">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                <span className="ml-3 text-gray-600">Loading your orders...</span>
              </div>
            ) : orders.length > 0 ? (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div
                    key={order._id}
                    className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                          <FaShoppingBag className="text-2xl text-purple-600" />
                        </div>
                        <div>
                          <h2 className="text-xl font-semibold text-gray-800">
                            Order #{order._id.slice(-6)}
                          </h2>
                          <p className="text-gray-500 text-sm">
                            {new Date(order.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(order.status)}
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-2">Order Items</h3>
                        <div className="space-y-3">
                          {order.items?.map((item, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                              <img
                                src={item.image || "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=100&q=80"}
                                alt={item.title}
                                className="w-12 h-12 object-cover rounded-lg"
                              />
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-800">{item.title}</h4>
                                <p className="text-sm text-gray-600">Qty: {item.quantity} × ₹{item.price}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold text-gray-800">₹{item.price * item.quantity}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-800 mb-2">Order Details</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Total Amount:</span>
                            <span className="font-semibold text-gray-800">₹{order.total?.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Payment Method:</span>
                            <span className="font-medium text-gray-800">{order.paymentMethod}</span>
                          </div>
                          {order.address && (
                            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                              <p className="text-gray-600 text-xs mb-1">Delivery Address:</p>
                              <p className="text-sm text-gray-800">
                                {order.address.street}, {order.address.city}, {order.address.state}, {order.address.zip}, {order.address.country}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <Link 
                        to={`/orders/${order._id}`} 
                        className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium"
                      >
                        View Details
                      </Link>
                      {order.status === "Delivered" && (
                        <button className="text-purple-600 hover:text-purple-700 font-medium">
                          Reorder
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaShoppingBag className="text-3xl text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No Orders Yet</h3>
                <p className="text-gray-600 mb-6">Start shopping to see your orders here!</p>
                <Link 
                  to="/products" 
                  className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
                >
                  Browse Products
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyOrders;
