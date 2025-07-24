import React from "react";

const PendingOrders = () => {
  // Mock Data for pending dairy product orders
  const pendingOrders = [
    { 
      id: 1, 
      user: "Dipak GC", 
      product: "Fresh Milk (1L)", 
      orderDate: "2025-06-21", 
    },
    { 
      id: 2, 
      user: "Rohit Khanal", 
      product: "Cheddar Cheese (250g)", 
      orderDate: "2025-06-20", 
    },
    { 
      id: 3, 
      user: "Samman Adhikari", 
      product: "Natural Yogurt (500g)", 
      orderDate: "2025-06-20", 
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Pending Orders</h2>

      {/* Pending Orders Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">User</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Product</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Order Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingOrders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-100">
                <td className="px-6 py-4 text-sm text-gray-700">{order.user}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{order.product}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{order.orderDate}</td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  <button
                    className="text-green-500 hover:text-green-700 mr-4"
                    onClick={() => alert(`Approve order ${order.id}`)}
                  >
                    Approve
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => alert(`Cancel order ${order.id}`)}
                  >
                    Cancel
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

export default PendingOrders;
