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
  Users
} from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState({ products: true, orders: true });
  const navigate = useNavigate();

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

  return (
    <div className={`h-screen ${isCollapsed ? "w-20" : "w-64"} bg-gray-900 text-white flex flex-col p-4 transition-all duration-300`}>
      
      <div className="flex items-center justify-between mb-6">
        {!isCollapsed && <h2 className="text-xl font-bold">Grocery Store Admin</h2>}
        <button onClick={toggleSidebar} className="p-1 rounded-full hover:bg-gray-700">
          {isCollapsed ? <Menu size={24} /> : <ChevronLeft size={24} />}
        </button>
      </div>

      <nav className="flex-1 space-y-2">
        <Link to="/admin/dashboard" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700">
          <Home size={20} />
          {!isCollapsed && <span>Dashboard</span>}
        </Link>

        <div>
          <button onClick={() => toggleMenu("products")} className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-700">
            <div className="flex items-center gap-3">
              <Package size={20} />
              {!isCollapsed && <span>Product Catalog</span>}
            </div>
            {!isCollapsed && (openMenus.products ? <ChevronDown size={18} /> : <ChevronRight size={18} />)}
          </button>
          {!isCollapsed && openMenus.products && (
            <div className="ml-6 space-y-1 mt-1">
              <Link to="/admin/addproducts" className="block p-2 rounded hover:bg-gray-700">Add New</Link>
              <Link to="/admin/manageproducts" className="block p-2 rounded hover:bg-gray-700">Manage Products</Link>
            </div>
          )}
        </div>

        <div>
          <button onClick={() => toggleMenu("orders")} className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-700">
            <div className="flex items-center gap-3">
              <Calendar size={20} />
              {!isCollapsed && <span>Orders</span>}
            </div>
            {!isCollapsed && (openMenus.orders ? <ChevronDown size={18} /> : <ChevronRight size={18} />)}
          </button>
          {!isCollapsed && openMenus.orders && (
            <div className="ml-6 space-y-1 mt-1">
              <Link to="/admin/pending" className="block p-2 rounded hover:bg-gray-700">Pending</Link>
              <Link to="/admin/confirmed" className="block p-2 rounded hover:bg-gray-700">Confirmed</Link>
            </div>
          )}
        </div>

        <Link to="/admin/payments" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700">
          <CreditCard size={20} />
          {!isCollapsed && <span>Payments</span>}
        </Link>

        <Link to="/admin/customers" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700">
          <Users size={20} />
          {!isCollapsed && <span>Customers</span>}
        </Link>

        <Link to="/admin/reviews" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700">
          <Star size={20} />
          {!isCollapsed && <span>Customer Reviews</span>}
        </Link>
      </nav>

      <div className="pt-4 border-t border-gray-700">
        <button onClick={handleLogout} className="flex items-center w-full gap-3 p-2 rounded-lg hover:bg-red-800">
          <LogOut size={20} />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
