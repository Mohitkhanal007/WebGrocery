import {
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Home,
  LogOut,
  Menu,
  Package,
  Star,
  Users,
  ShoppingBag
} from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState({ products: true, orders: true });
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const isMenuActive = (paths) => {
    return paths.some(path => location.pathname.includes(path));
  };

  return (
    <div className={`h-screen ${isCollapsed ? "w-20" : "w-64"} bg-gradient-to-b from-purple-900 to-purple-800 text-white flex flex-col transition-all duration-300 shadow-xl`}>
      
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-purple-700">
        {!isCollapsed && (
          <div className="flex items-center">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-3">
              <ShoppingBag className="text-purple-600 w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Grocery Store</h2>
              <p className="text-xs text-purple-300">Admin Panel</p>
            </div>
          </div>
        )}
        <button 
          onClick={toggleSidebar} 
          className="p-2 rounded-lg hover:bg-purple-700 transition-colors duration-200"
        >
          {isCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {/* Dashboard */}
        <Link 
          to="/admin/dashboard" 
          className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
            isActive('/admin/dashboard') 
              ? 'bg-purple-600 text-white shadow-lg' 
              : 'hover:bg-purple-700 text-purple-100'
          }`}
        >
          <Home size={20} />
          {!isCollapsed && <span className="font-medium">Dashboard</span>}
        </Link>

        {/* Products */}
        <div>
          <button 
            onClick={() => toggleMenu("products")} 
            className={`flex items-center justify-between w-full p-3 rounded-xl transition-all duration-200 ${
              isMenuActive(['/admin/addproducts', '/admin/manageproducts']) 
                ? 'bg-purple-600 text-white shadow-lg' 
                : 'hover:bg-purple-700 text-purple-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <Package size={20} />
              {!isCollapsed && <span className="font-medium">Products</span>}
            </div>
            {!isCollapsed && (
              openMenus.products ? <ChevronDown size={18} /> : <ChevronRight size={18} />
            )}
          </button>
          {!isCollapsed && openMenus.products && (
            <div className="ml-6 space-y-1 mt-2">
              <Link 
                to="/admin/addproducts" 
                className={`block p-2 rounded-lg transition-all duration-200 ${
                  isActive('/admin/addproducts') 
                    ? 'bg-purple-600 text-white' 
                    : 'hover:bg-purple-700 text-purple-200'
                }`}
              >
                Add New Product
              </Link>
              <Link 
                to="/admin/manageproducts" 
                className={`block p-2 rounded-lg transition-all duration-200 ${
                  isActive('/admin/manageproducts') 
                    ? 'bg-purple-600 text-white' 
                    : 'hover:bg-purple-700 text-purple-200'
                }`}
              >
                Manage Products
              </Link>
            </div>
          )}
        </div>

        {/* Orders */}
        <div>
          <button 
            onClick={() => toggleMenu("orders")} 
            className={`flex items-center justify-between w-full p-3 rounded-xl transition-all duration-200 ${
              isMenuActive(['/admin/pending', '/admin/confirmed']) 
                ? 'bg-purple-600 text-white shadow-lg' 
                : 'hover:bg-purple-700 text-purple-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <Calendar size={20} />
              {!isCollapsed && <span className="font-medium">Orders</span>}
            </div>
            {!isCollapsed && (
              openMenus.orders ? <ChevronDown size={18} /> : <ChevronRight size={18} />
            )}
          </button>
          {!isCollapsed && openMenus.orders && (
            <div className="ml-6 space-y-1 mt-2">
              <Link 
                to="/admin/pending" 
                className={`block p-2 rounded-lg transition-all duration-200 ${
                  isActive('/admin/pending') 
                    ? 'bg-purple-600 text-white' 
                    : 'hover:bg-purple-700 text-purple-200'
                }`}
              >
                Pending Orders
              </Link>
              <Link 
                to="/admin/confirmed" 
                className={`block p-2 rounded-lg transition-all duration-200 ${
                  isActive('/admin/confirmed') 
                    ? 'bg-purple-600 text-white' 
                    : 'hover:bg-purple-700 text-purple-200'
                }`}
              >
                Confirmed Orders
              </Link>
            </div>
          )}
        </div>

        {/* Payments */}
        <Link 
          to="/admin/payments" 
          className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
            isActive('/admin/payments') 
              ? 'bg-purple-600 text-white shadow-lg' 
              : 'hover:bg-purple-700 text-purple-100'
          }`}
        >
          <CreditCard size={20} />
          {!isCollapsed && <span className="font-medium">Payments</span>}
        </Link>

        {/* Customers */}
        <Link 
          to="/admin/customers" 
          className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
            isActive('/admin/customers') 
              ? 'bg-purple-600 text-white shadow-lg' 
              : 'hover:bg-purple-700 text-purple-100'
          }`}
        >
          <Users size={20} />
          {!isCollapsed && <span className="font-medium">Customers</span>}
        </Link>

        {/* Reviews */}
        <Link 
          to="/admin/reviews" 
          className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
            isActive('/admin/reviews') 
              ? 'bg-purple-600 text-white shadow-lg' 
              : 'hover:bg-purple-700 text-purple-100'
          }`}
        >
          <Star size={20} />
          {!isCollapsed && <span className="font-medium">Reviews</span>}
        </Link>


      </nav>

      {/* Logout Section */}
      <div className="p-4 border-t border-purple-700">
        <button 
          onClick={handleLogout} 
          className="flex items-center w-full gap-3 p-3 rounded-xl hover:bg-red-600 transition-all duration-200 text-red-200 hover:text-white"
        >
          <LogOut size={20} />
          {!isCollapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
