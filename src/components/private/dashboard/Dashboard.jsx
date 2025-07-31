import React, { useEffect, useState } from "react";
import axios from "axios";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE"];

const Dashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axios.get("/api/v1/orders/analytics");
        setAnalytics(res.data);
        setError("");
      } catch (err) {
        setError("Failed to fetch analytics");
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) return <div className="p-8">Loading analytics...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <div className="relative w-full h-[200px] rounded-lg overflow-hidden shadow-lg mb-8">
        <img
          src="https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=1200&q=80"
          alt="Admin Dashboard"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-70 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-2">Admin Analytics Dashboard</h1>
            <p className="text-lg">Monitor your grocery store performance</p>
          </div>
        </div>
      </div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <div className="text-lg font-semibold text-gray-600 mb-2">Total Sales</div>
          <div className="text-2xl font-bold text-green-600">Rs. {analytics.totalSales}</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <div className="text-lg font-semibold text-gray-600 mb-2">Top Product</div>
          <div className="text-xl font-bold text-purple-700">{analytics.topProducts?.[0]?.title || "-"}</div>
          <div className="text-sm text-gray-500">Sold: {analytics.topProducts?.[0]?.totalSold || 0}</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <div className="text-lg font-semibold text-gray-600 mb-2">Total Users</div>
          <div className="text-2xl font-bold text-blue-600">{analytics.userGrowth?.reduce((sum, u) => sum + u.count, 0) || 0}</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <div className="text-lg font-semibold text-gray-600 mb-2">Total Orders</div>
          <div className="text-2xl font-bold text-orange-600">{analytics.orderStatusCounts?.reduce((sum, o) => sum + o.count, 0) || 0}</div>
        </div>
      </div>
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* User Growth Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">User Growth (per month)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={analytics.userGrowth} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="_id" tick={{ fill: '#6B7280' }} />
              <YAxis tick={{ fill: '#6B7280' }} />
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ddd' }} />
              <Area type="monotone" dataKey="count" stroke="#8884d8" fillOpacity={1} fill="url(#colorUsers)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        {/* Order Status Pie Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Order Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analytics.orderStatusCounts}
                dataKey="count"
                nameKey="_id"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {analytics.orderStatusCounts?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Top Products List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Top 5 Products</h3>
        <ul className="divide-y divide-gray-200">
          {analytics.topProducts?.map((prod, idx) => (
            <li key={prod._id} className="py-2 flex justify-between items-center">
              <span className="font-medium">{idx + 1}. {prod.title}</span>
              <span className="text-gray-600">Sold: {prod.totalSold}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
