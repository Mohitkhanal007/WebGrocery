import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../../components/common/admin/Navbar";
import Sidebar from "../../components/common/admin/Sidebar";

const Layout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in and is admin
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    
    if (!token) {
      alert("Please login to access admin dashboard");
      navigate("/login");
      return;
    }
    
    if (role !== "admin") {
      alert("Access denied. Admin privileges required.");
      navigate("/");
      return;
    }
  }, [navigate]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />  {/* Dynamic Nested Route Content */}
        </main>
      </div>
    </div>
  );
};

export default Layout;
