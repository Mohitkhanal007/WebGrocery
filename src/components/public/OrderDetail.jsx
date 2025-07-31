import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../common/customer/Navbar";
import Footer from "../common/customer/Footer";

const OrderDetail = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`/api/v1/orders/${orderId}`);
        setOrder(res.data.order);
        setError("");
      } catch (err) {
        setError("Failed to fetch order details");
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (loading) return <div className="p-8">Loading order details...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;
  if (!order) return <div className="p-8">Order not found.</div>;

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-6 text-purple-800">Order Details</h2>
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="mb-4 flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <div className="text-gray-600 text-sm">Order ID:</div>
              <div className="font-mono text-lg">{order._id}</div>
            </div>
            <div>
              <div className="text-gray-600 text-sm">Order Date:</div>
              <div>{new Date(order.createdAt).toLocaleString()}</div>
            </div>
            <div>
              <div className="text-gray-600 text-sm">Status:</div>
              <div className="font-bold text-blue-700">{order.status}</div>
            </div>
          </div>
          <div className="mb-4">
            <div className="text-gray-600 text-sm mb-1">Delivery Address:</div>
            <div className="text-gray-800">
              {order.address?.street}, {order.address?.city}, {order.address?.state}, {order.address?.zip}, {order.address?.country}
            </div>
          </div>
          <div className="mb-4">
            <div className="text-gray-600 text-sm mb-1">Payment Method:</div>
            <div className="text-gray-800">{order.paymentMethod}</div>
            {order.paymentId && <div className="text-xs text-gray-500">Payment ID: {order.paymentId}</div>}
          </div>
          <div className="mb-4">
            <div className="text-gray-600 text-sm mb-1">Total:</div>
            <div className="text-xl font-bold text-green-700">Rs. {order.total}</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Order Items</h3>
          <ul className="divide-y divide-gray-200">
            {order.items?.map(item => (
              <li key={item.productId} className="py-4 flex items-center gap-6">
                <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-lg" />
                <div className="flex-1">
                  <div className="font-semibold text-lg">{item.title}</div>
                  <div className="text-gray-600">Qty: {item.quantity}</div>
                  <div className="text-gray-800">Rs. {item.price} each</div>
                </div>
                <div className="font-bold text-purple-800">Rs. {item.price * item.quantity}</div>
              </li>
            ))}
          </ul>
        </div>
        <Link to="/mybooking" className="bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-800 transition">Back to My Orders</Link>
      </div>
      <Footer />
    </>
  );
};

export default OrderDetail; 