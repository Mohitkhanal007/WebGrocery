import React from "react";
import { FaBoxOpen, FaClipboardList, FaDollarSign, FaExclamationTriangle, FaUserPlus, FaUsers } from 'react-icons/fa';
import { Area, AreaChart, CartesianGrid, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const Dashboard = () => {
  // Mock Data for charts and tables
  const revenueData = [
    { month: 'Jan', revenue: 4000 }, { month: 'Feb', revenue: 3000 },
    { month: 'Mar', revenue: 5000 }, { month: 'Apr', revenue: 4500 },
    { month: 'May', revenue: 6000 }, { month: 'Jun', revenue: 5500 },
  ];

  const categoryData = [
    { name: 'Fruits', value: 400 }, { name: 'Vegetables', value: 300 },
    { name: 'Bakery', value: 200 }, { name: 'Eggs', value: 100 },
  ];

  const lowStockProducts = [
    { id: 1, name: "Fresh Apples", stock: 8 },
    { id: 2, name: "Whole Wheat Bread", stock: 5 },
    { id: 3, name: "Organic Bananas", stock: 12 },
  ];

  const recentOrders = [
    { id: "ORD-001", customer: "Ram Kumar", product: "Fresh Apples", date: "2024-08-15", status: "Confirmed", amount: "Rs. 240" },
    { id: "ORD-002", customer: "Sunita Devi", product: "Whole Wheat Bread", date: "2024-08-14", status: "Pending", amount: "Rs. 50" },
    { id: "ORD-003", customer: "Amit Singh", product: "Organic Bananas", date: "2024-08-13", status: "Canceled", amount: "Rs. 160" },
  ];

  const getStatusPill = (status) => {
    switch (status.toLowerCase()) {
      case "confirmed": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "canceled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gray-100 min-h-screen">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Revenue" value="Rs. 1,45,000" icon={<FaDollarSign size={24} />} color="text-green-500" />
        <StatCard title="Total Orders" value="3,450" icon={<FaClipboardList size={24} />} color="text-blue-500" />
        <StatCard title="Total Products" value="58" icon={<FaBoxOpen size={24} />} color="text-purple-500" />
        <StatCard title="New Customers" value="12" icon={<FaUserPlus size={24} />} color="text-yellow-500" />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Monthly Revenue</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: '#6B7280' }} />
              <YAxis tick={{ fill: '#6B7280' }} />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ddd' }} />
              <Area type="monotone" dataKey="revenue" stroke="#8884d8" fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Product Categories</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Recent Orders</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="py-3 px-4 text-sm font-semibold text-gray-600">ORDER ID</th>
                  <th className="py-3 px-4 text-sm font-semibold text-gray-600">CUSTOMER</th>
                  <th className="py-3 px-4 text-sm font-semibold text-gray-600">AMOUNT</th>
                  <th className="py-3 px-4 text-sm font-semibold text-gray-600">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-gray-700">{order.id}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{order.customer}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{order.amount}</td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusPill(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
            <FaExclamationTriangle className="mr-3 text-red-500" /> Low Stock Alerts
          </h3>
          <ul className="space-y-4">
            {lowStockProducts.map((product) => (
              <li key={product.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-red-50">
                <div>
                  <p className="font-semibold text-gray-800">{product.name}</p>
                </div>
                <span className="text-sm font-bold text-red-600">{product.stock} left</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// StatCard Component
const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between hover:shadow-xl hover:scale-105 transition-all">
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
    </div>
    <div className={`p-4 rounded-full bg-gray-100 ${color}`}>
      {icon}
    </div>
  </div>
);

export default Dashboard;
