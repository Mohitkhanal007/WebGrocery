import React, { useState, useEffect } from "react";
import Footer from "../common/customer/Footer";
import Navbar from "../common/customer/Navbar";
import axios from "axios";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Placeholder data for grocery orders
  const placeholderOrders = [
    {
      _id: "order1",
      product: { name: "Fresh Apples", imageUrl: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=400&q=80" },
      date: new Date().toISOString(),
      totalPrice: 120,
      quantity: 2,
      status: "Confirmed",
    },
    {
      _id: "order2",
      product: { name: "Whole Wheat Bread", imageUrl: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80" },
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      totalPrice: 50,
      quantity: 1,
      status: "Delivered",
    },
  ];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          setError("You must be logged in to see your orders.");
          setLoading(false);
          return;
        }
        // In a real app, you would fetch orders from your backend:
        // const response = await axios.get(`/api/v1/orders/user/${userId}`, ...);
        // setOrders(response.data);
        throw new Error("Backend not connected"); // Simulate backend error
      } catch (err) {
        console.log("Backend not available, using placeholder data for my orders page");
        setOrders(placeholderOrders);
        setError("Demo Mode: Showing sample orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "confirmed": return "text-blue-600";
      case "delivered": return "text-green-600";
      case "pending": return "text-yellow-600";
      case "cancelled": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-6">
          My Orders
        </h1>
        <p className="text-lg text-center text-gray-600 mb-12">
          Track your recent grocery orders and their status.
        </p>

        {error && (
          <div className="text-center mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800 font-medium">{error}</p>
          </div>
        )}

        <div className="flex flex-col items-center space-y-6">
          {loading ? (
            <div className="dairy-spinner mx-auto"></div>
          ) : orders.length > 0 ? (
            orders.map((order) => (
              <div
                key={order._id}
                className="w-full max-w-4xl p-6 bg-white shadow-lg rounded-lg flex items-start space-x-6 border border-gray-100"
              >
                <img
                  src={order.product.imageUrl || "https://via.placeholder.com/150"}
                  alt={order.product.name}
                  className="w-32 h-32 object-cover rounded-lg"
                />
                <div className="flex-grow">
                  <h2 className="text-2xl font-semibold text-blue-800">
                    {order.product.name}
                  </h2>
                  <p className="text-gray-600">Order ID: {order._id}</p>
                  <p className="text-gray-600">Date: {new Date(order.date).toLocaleDateString()}</p>
                  <p className="text-gray-600">Amount: Rs.{order.totalPrice.toLocaleString()}</p>
                  <p className="text-gray-600">Quantity: {order.quantity}</p>
                  <p className={`text-xl font-bold ${getStatusColor(order.status)}`}>
                    Status: {order.status}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-800 text-center">You have no orders yet.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyOrders;
