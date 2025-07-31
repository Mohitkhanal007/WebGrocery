import React, { useEffect, useState } from "react";
import axios from "axios";

const statusOptions = ["Pending", "Processing", "Shipped", "Delivered", "Canceled"];

const ConfirmedOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("/api/v1/orders");
        setOrders(res.data.orders || []);
        setError("");
      } catch (err) {
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
                await axios.put(`/api/v1/orders/${orderId}/status`, { status: newStatus });
      setOrders(orders.map(order => order._id === orderId ? { ...order, status: newStatus } : order));
    } catch (err) {
      alert("Failed to update status");
    }
  };

  if (loading) return <div className="p-8">Loading orders...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">All Orders (Admin)</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr>
              <th className="p-3 border">Order ID</th>
              <th className="p-3 border">User</th>
              <th className="p-3 border">Items</th>
              <th className="p-3 border">Total</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Change Status</th>
              <th className="p-3 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td className="p-2 border text-xs">{order._id}</td>
                <td className="p-2 border text-xs">{order.userId}</td>
                <td className="p-2 border text-xs">
                  {order.items && order.items.map(item => (
                    <div key={item.productId}>
                      {item.title} x{item.quantity}
                    </div>
                  ))}
                </td>
                <td className="p-2 border">Rs.{order.total}</td>
                <td className="p-2 border font-semibold">{order.status}</td>
                <td className="p-2 border">
                  <select
                    value={order.status}
                    onChange={e => handleStatusChange(order._id, e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    {statusOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </td>
                <td className="p-2 border text-xs">{new Date(order.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConfirmedOrders;
