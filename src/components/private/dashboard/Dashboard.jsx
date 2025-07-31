import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend, BarChart, Bar 
} from 'recharts';
import { 
  FaShoppingCart, FaUsers, FaBox, FaDollarSign, FaChartLine, 
  FaStar, FaPlus, FaEye, FaClock, FaTrophy, FaArrowUp, FaArrowRight,
  FaShoppingBag, FaClipboardList, FaChartBar
} from "react-icons/fa";

const COLORS = ["#8B5CF6", "#A78BFA", "#C4B5FD", "#DDD6FE", "#EDE9FE"];

const Dashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/v1/orders/analytics");
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

  const handleQuickAction = (action) => {
    switch (action) {
      case 'addProduct':
        navigate('/admin/addproducts');
        break;
      case 'viewOrders':
        navigate('/admin/pending');
        break;
      case 'viewReviews':
        navigate('/admin/reviews');
        break;
      case 'viewAnalytics':
        // Analytics is already on this page, but we can scroll to charts
        document.querySelector('.charts-section')?.scrollIntoView({ behavior: 'smooth' });
        break;
      default:
        break;
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
    </div>
  );
  
  if (error) return (
    <div className="p-8 text-red-600 bg-red-50 rounded-lg">
      {error}
    </div>
  );

  const totalUsers = analytics?.userGrowth?.reduce((sum, u) => sum + u.count, 0) || 0;
  const totalOrders = analytics?.orderStatusCounts?.reduce((sum, o) => sum + o.count, 0) || 0;
  const totalProducts = analytics?.topProducts?.length || 0;

  return (
    <div className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
        <p className="text-xl text-gray-600">Welcome back, Admin! 👋</p>
        <p className="text-gray-500">Here's what's happening with your grocery store today.</p>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <button 
          onClick={() => handleQuickAction('addProduct')}
          className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100 hover:border-purple-300 group cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 group-hover:text-purple-600 transition-colors">Add New Product</p>
              <p className="text-xs text-gray-500 mt-1">Quick action</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
              <FaPlus className="text-purple-600 text-xl" />
            </div>
          </div>
          <div className="flex items-center mt-3 text-xs text-purple-600 font-medium">
            <span>Click to add</span>
            <FaArrowRight className="ml-1" size={10} />
          </div>
        </button>

        <button 
          onClick={() => handleQuickAction('viewOrders')}
          className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100 hover:border-purple-300 group cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 group-hover:text-blue-600 transition-colors">View Orders</p>
              <p className="text-xs text-gray-500 mt-1">Manage orders</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
              <FaShoppingCart className="text-blue-600 text-xl" />
            </div>
          </div>
          <div className="flex items-center mt-3 text-xs text-blue-600 font-medium">
            <span>View all orders</span>
            <FaArrowRight className="ml-1" size={10} />
          </div>
        </button>

        <button 
          onClick={() => handleQuickAction('viewAnalytics')}
          className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100 hover:border-purple-300 group cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 group-hover:text-green-600 transition-colors">Analytics</p>
              <p className="text-xs text-gray-500 mt-1">View insights</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
              <FaChartBar className="text-green-600 text-xl" />
            </div>
          </div>
          <div className="flex items-center mt-3 text-xs text-green-600 font-medium">
            <span>View charts</span>
            <FaArrowRight className="ml-1" size={10} />
          </div>
        </button>

        <button 
          onClick={() => handleQuickAction('viewReviews')}
          className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100 hover:border-purple-300 group cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 group-hover:text-yellow-600 transition-colors">Reviews</p>
              <p className="text-xs text-gray-500 mt-1">Customer feedback</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg group-hover:bg-yellow-200 transition-colors">
              <FaStar className="text-yellow-600 text-xl" />
            </div>
          </div>
          <div className="flex items-center mt-3 text-xs text-yellow-600 font-medium">
            <span>View reviews</span>
            <FaArrowRight className="ml-1" size={10} />
          </div>
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl shadow-lg text-white hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium opacity-90">Total Users</p>
              <p className="text-3xl font-bold">{totalUsers.toLocaleString()}</p>
              <div className="flex items-center mt-2">
                <FaArrowUp className="text-green-300 mr-1" />
                <span className="text-sm text-green-300">+12%</span>
              </div>
            </div>
            <div className="p-3 bg-white bg-opacity-20 rounded-lg">
              <FaUsers className="text-2xl" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl shadow-lg text-white hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium opacity-90">Total Products</p>
              <p className="text-3xl font-bold">{totalProducts}</p>
              <div className="flex items-center mt-2">
                <FaArrowUp className="text-green-300 mr-1" />
                <span className="text-sm text-green-300">+5%</span>
              </div>
            </div>
            <div className="p-3 bg-white bg-opacity-20 rounded-lg">
              <FaBox className="text-2xl" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl shadow-lg text-white hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium opacity-90">Total Orders</p>
              <p className="text-3xl font-bold">{totalOrders.toLocaleString()}</p>
              <div className="flex items-center mt-2">
                <FaArrowUp className="text-green-300 mr-1" />
                <span className="text-sm text-green-300">+18%</span>
              </div>
            </div>
            <div className="p-3 bg-white bg-opacity-20 rounded-lg">
              <FaShoppingCart className="text-2xl" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-xl shadow-lg text-white hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium opacity-90">Total Revenue</p>
              <p className="text-3xl font-bold">₹{analytics?.totalSales?.toLocaleString() || '0'}</p>
              <div className="flex items-center mt-2">
                <FaArrowUp className="text-green-300 mr-1" />
                <span className="text-sm text-green-300">+23%</span>
              </div>
            </div>
            <div className="p-3 bg-white bg-opacity-20 rounded-lg">
              <FaDollarSign className="text-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Data Section */}
      <div className="charts-section grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* User Growth Chart */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-800">User Growth</h3>
            <div className="flex items-center text-sm text-gray-500">
              <FaClock className="mr-1" />
              Last 6 months
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={analytics?.userGrowth} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="_id" tick={{ fill: '#6B7280' }} />
              <YAxis tick={{ fill: '#6B7280' }} />
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }} 
              />
              <Area type="monotone" dataKey="count" stroke="#8B5CF6" fillOpacity={1} fill="url(#colorUsers)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Order Status Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-800">Order Status</h3>
            <div className="flex items-center text-sm text-gray-500">
              <FaEye className="mr-1" />
              Distribution
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analytics?.orderStatusCounts}
                dataKey="count"
                nameKey="_id"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8B5CF6"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {analytics?.orderStatusCounts?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders and Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center">
              <FaClock className="mr-2 text-purple-600" />
              Recent Orders
            </h3>
            <button 
              onClick={() => navigate('/admin/pending')}
              className="text-sm text-purple-600 hover:text-purple-700 font-medium hover:underline"
            >
              View All
            </button>
          </div>
          <div className="space-y-4">
            {analytics?.recentOrders?.slice(0, 5).map((order, index) => (
              <div key={order._id || index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <FaShoppingCart className="text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{order.customerName || 'Customer'}</p>
                    <p className="text-sm text-gray-500">{order.productName || 'Product'}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">₹{order.amount || '0'}</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    order.status === 'confirmed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status || 'Pending'}
                  </span>
                </div>
              </div>
            ))}
            {(!analytics?.recentOrders || analytics.recentOrders.length === 0) && (
              <div className="text-center py-8 text-gray-500">
                <FaClipboardList className="mx-auto text-4xl mb-2 text-gray-300" />
                <p>No recent orders</p>
              </div>
            )}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center">
              <FaTrophy className="mr-2 text-purple-600" />
              Top Products
            </h3>
            <button 
              onClick={() => navigate('/admin/manageproducts')}
              className="text-sm text-purple-600 hover:text-purple-700 font-medium hover:underline"
            >
              View All
            </button>
          </div>
          <div className="space-y-4">
            {analytics?.topProducts?.slice(0, 5).map((product, index) => (
              <div key={product._id || index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-purple-600 font-bold">{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{product.title || 'Product'}</p>
                    <p className="text-sm text-gray-500">{product.totalSold || 0} sales</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">₹{product.revenue || '0'}</p>
                  <p className="text-xs text-gray-500">Revenue</p>
                </div>
              </div>
            ))}
            {(!analytics?.topProducts || analytics.topProducts.length === 0) && (
              <div className="text-center py-8 text-gray-500">
                <FaShoppingBag className="mx-auto text-4xl mb-2 text-gray-300" />
                <p>No products data</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
