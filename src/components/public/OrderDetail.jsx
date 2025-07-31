import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../common/customer/Navbar";
import Footer from "../common/customer/Footer";
import { FaShoppingBag, FaClock, FaCheckCircle, FaTruck, FaTimesCircle, FaMapMarkerAlt, FaCreditCard } from "react-icons/fa";

const OrderDetail = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    
    if (!token || !userId) {
      setError("Please login to view order details.");
      setLoading(false);
      return;
    }

    const fetchOrder = async () => {
      try {
        setLoading(true);
        setError("");
        
        const response = await axios.get(`/api/v1/orders/${orderId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        if (response.data && response.data.success) {
          setOrder(response.data.order);
        } else {
          setError("Order not found.");
        }
      } catch (err) {
        console.error("Error fetching order:", err);
        setError("Failed to fetch order details. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrder();
  }, [orderId]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed": return "text-blue-600 bg-blue-100";
      case "delivered": return "text-green-600 bg-green-100";
      case "pending": return "text-yellow-600 bg-yellow-100";
      case "cancelled": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed": return <FaCheckCircle className="text-blue-600" />;
      case "delivered": return <FaTruck className="text-green-600" />;
      case "pending": return <FaClock className="text-yellow-600" />;
      case "cancelled": return <FaTimesCircle className="text-red-600" />;
      default: return <FaClock className="text-gray-600" />;
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 pt-20">
          <div className="container mx-auto px-6 py-8">
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
              <span className="ml-3 text-gray-600">Loading order details...</span>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 pt-20">
          <div className="container mx-auto px-6 py-8">
            <div className="max-w-2xl mx-auto text-center py-12">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaTimesCircle className="text-3xl text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Error Loading Order</h2>
              <p className="text-gray-600 mb-6">{error}</p>
              <Link 
                to="/mybooking" 
                className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                Back to My Orders
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!order) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 pt-20">
          <div className="container mx-auto px-6 py-8">
            <div className="max-w-2xl mx-auto text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaShoppingBag className="text-3xl text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Not Found</h2>
              <p className="text-gray-600 mb-6">The order you're looking for doesn't exist.</p>
              <Link 
                to="/mybooking" 
                className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                Back to My Orders
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 pt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">Order Details</h1>
                  <p className="text-gray-600">Order #{order._id?.slice(-6)}</p>
                </div>
                <div className="flex items-center gap-3">
                  {getStatusIcon(order.status)}
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <FaShoppingBag className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Order Date</p>
                    <p className="font-semibold text-gray-800">
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
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <FaCreditCard className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Payment Method</p>
                    <p className="font-semibold text-gray-800">{order.paymentMethod}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <FaMapMarkerAlt className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Delivery Address</p>
                    <p className="font-semibold text-gray-800">{order.address?.city}, {order.address?.state}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Order Items</h2>
              <div className="space-y-4">
                {order.items?.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <img 
                      src={item.image || "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=100&q=80"} 
                      alt={item.title} 
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{item.title}</h3>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      <p className="text-sm text-gray-600">₹{item.price} each</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-800">₹{item.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-semibold text-gray-800">₹{order.total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee:</span>
                  <span className="font-semibold text-gray-800">₹0</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-3">
                  <span className="text-lg font-bold text-gray-800">Total:</span>
                  <span className="text-lg font-bold text-purple-600">₹{order.total}</span>
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            {order.address && (
              <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Delivery Address</h2>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-800">
                    {order.address.street}, {order.address.city}, {order.address.state}, {order.address.zip}, {order.address.country}
                  </p>
                </div>
              </div>
            )}

            {/* Payment Details */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Payment Details</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method:</span>
                  <span className="font-semibold text-gray-800">{order.paymentMethod}</span>
                </div>
                {order.paymentId && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment ID:</span>
                    <span className="font-mono text-sm text-gray-800">{order.paymentId}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Status:</span>
                  <span className="font-semibold text-green-600">Paid</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <Link 
                to="/mybooking" 
                className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium"
              >
                Back to My Orders
              </Link>
              {order.status === "Delivered" && (
                <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium">
                  Reorder
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderDetail; 