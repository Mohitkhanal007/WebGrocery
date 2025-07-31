import { Bell, LogOut, User } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-md">
      {/* Admin Panel Title */}
      <h1 className="text-lg font-semibold">Admin Dashboard</h1>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        {/* Notifications Icon */}
        <button className="relative p-2 rounded-full hover:bg-gray-800 transition-colors duration-200">
          <Bell size={20} />
          <span className="absolute top-0 right-0 bg-red-500 text-xs text-white px-1.5 py-0.5 rounded-full">3</span>
        </button>

        {/* User Profile Dropdown */}
        <div className="relative group">
          <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200">
            <User size={20} />
            <span className="hidden md:inline">Admin</span>
          </button>

          {/* Dropdown Menu */}
          <div className="absolute right-0 mt-2 w-40 bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out transform origin-top-right scale-95 group-hover:scale-100">
            <Link to="/admin/profile" className="block w-full px-4 py-2 text-left hover:bg-gray-700 transition-colors duration-200">Profile</Link>
            <Link to="/admin/settings" className="block w-full px-4 py-2 text-left hover:bg-gray-700 transition-colors duration-200">Settings</Link>
            <button onClick={handleLogout} className="block w-full px-4 py-2 text-left hover:bg-red-700 flex items-center gap-2 transition-colors duration-200">
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
