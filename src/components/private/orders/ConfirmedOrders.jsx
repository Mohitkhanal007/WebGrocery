import React from "react";

const ConfirmedOrders = () => {
  // Mock Data for confirmed dairy product orders
  const confirmedOrders = [
    { 
      id: 1, 
      user: "Rohit Khanal", 
      product: "Organic Butter (200g)", 
      orderDate: "2025-06-18", 
      status: "Confirmed", 
    },
    { 
      id: 2, 
      user: "Samman Adhikari", 
      product: "Goat Cheese (150g)", 
      orderDate: "2025-06-17", 
      status: "Confirmed", 
    },
    { 
      id: 3, 
      user: "Nirjala Bhattarai", 
      product: "Cream Cheese (200g)", 
      orderDate: "2025-06-16", 
      status: "Confirmed", 
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Confirmed Orders</h2>

      {/* Confirmed Orders Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">User</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Product</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Order Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {confirmedOrders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-100">
                <td className="px-6 py-4 text-sm text-gray-700">{order.user}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{order.product}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{order.orderDate}</td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => alert(`View order details ${order.id}`)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConfirmedOrders;
