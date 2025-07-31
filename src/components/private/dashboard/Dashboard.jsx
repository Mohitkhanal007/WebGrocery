import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  FaShoppingCart, 
  FaUsers, 
  FaBox, 
  FaDollarSign, 
  FaChartLine, 
  FaStar, 
  FaClock, 
  FaTrophy,
  FaPlus,
  FaEye,
  FaChartBar,
  FaBell
} from "react-icons/fa";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const COLORS = ["#8B5CF6", "#A855F7", "#C084FC", "#DDD6FE", "#EDE9FE"];

const Dashboard = () => {
  const [analytics, setAnalytics] = useState({
    totalUsers: 1240,
    totalProducts: 58,
    totalOrders: 3450,
    totalRevenue: 12480,
    recentOrders: [
      { customer: "John Doe", product: "Fresh Milk", amount: "₹120", status: "Confirmed", date: "2024-08-15" },
      { customer: "Jane Smith", product: "Organic Yogurt", amount: "₹85", status: "Pending", date: "2024-08-14" },
      { customer: "Mike Johnson", product: "Aged Cheese", amount: "₹200", status: "Confirmed", date: "2024-08-13" }
    ],
    topProducts: [
      { name: "Fresh Milk", sales: 45, revenue: "₹5,400" },
      { name: "Organic Yogurt", sales: 38, revenue: "₹3,230" },
      { name: "Aged Cheese", sales: 32, revenue: "₹6,400" }
    ]
  });
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-purple-100">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Welcome back, Admin! 👋</h1>
              <p className="text-gray-600 mt-1">Here's what's happening with your grocery store today.</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <FaBell className="text-2xl text-purple-600 cursor-pointer hover:text-purple-700 transition-colors" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
              </div>
              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">A</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Add New Product</p>
                <FaPlus className="text-2xl mt-2" />
              </div>
              <FaBox className="text-4xl opacity-80" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">View Orders</p>
                <FaEye className="text-2xl mt-2" />
              </div>
              <FaShoppingCart className="text-4xl opacity-80" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Analytics</p>
                <FaChartBar className="text-2xl mt-2" />
              </div>
              <FaChartLine className="text-4xl opacity-80" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Reviews</p>
                <FaStar className="text-2xl mt-2" />
              </div>
              <FaStar className="text-4xl opacity-80" />
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Users</p>
                <p className="text-3xl font-bold text-gray-800">{analytics.totalUsers.toLocaleString()}</p>
                <p className="text-green-600 text-sm font-medium">+12% from last month</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <FaUsers className="text-2xl text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Products</p>
                <p className="text-3xl font-bold text-gray-800">{analytics.totalProducts}</p>
                <p className="text-green-600 text-sm font-medium">+5% from last month</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FaBox className="text-2xl text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Orders</p>
                <p className="text-3xl font-bold text-gray-800">{analytics.totalOrders.toLocaleString()}</p>
                <p className="text-green-600 text-sm font-medium">+18% from last month</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <FaShoppingCart className="text-2xl text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-800">₹{analytics.totalRevenue.toLocaleString()}</p>
                <p className="text-green-600 text-sm font-medium">+23% from last month</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <FaDollarSign className="text-2xl text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts and Tables Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Orders */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800 flex items-center">
                <FaClock className="mr-2 text-purple-600" />
                Recent Orders
              </h3>
              <a href="#" className="text-purple-600 hover:text-purple-700 font-medium">View All</a>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600">CUSTOMER</th>
                    <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600">PRODUCT</th>
                    <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600">AMOUNT</th>
                    <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {analytics.recentOrders.map((order, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-2 text-sm text-gray-800">{order.customer}</td>
                      <td className="py-3 px-2 text-sm text-gray-600">{order.product}</td>
                      <td className="py-3 px-2 text-sm font-semibold text-gray-800">{order.amount}</td>
                      <td className="py-3 px-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === 'Confirmed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800 flex items-center">
                <FaTrophy className="mr-2 text-purple-600" />
                Top Products
              </h3>
              <a href="#" className="text-purple-600 hover:text-purple-700 font-medium">View All</a>
            </div>
            <div className="space-y-4">
              {analytics.topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.sales} sales</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-purple-600">{product.revenue}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sales Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Sales Overview</h3>
            <div className="h-64 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <FaChartLine className="text-4xl mx-auto mb-2 text-purple-300" />
                <p>Sales chart will be displayed here</p>
              </div>
            </div>
          </div>

          {/* Category Distribution */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Category Distribution</h3>
            <div className="h-64 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <FaChartBar className="text-4xl mx-auto mb-2 text-purple-300" />
                <p>Category chart will be displayed here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
