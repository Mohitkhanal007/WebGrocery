import React, { useEffect, useState } from "react";
import { FaBars, FaHeart, FaTimes, FaShoppingBasket, FaShoppingCart } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "./CartContext";
import { useWishlist } from "./WishlistContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const { cart } = useCart();
  const { wishlistCount } = useWishlist();

  useEffect(() => {
    // Get token from local storage
    const token = localStorage.getItem("token");
    if (token) {
      try {
        // Decode token (if needed) and set user
        const decodedUser = JSON.parse(atob(token.split(".")[1])); // Decode JWT
        setUser(decodedUser);
      } catch (error) {
        console.error("Invalid token");
        localStorage.removeItem("token"); // Remove if invalid
      }
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.reload();
  };

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/">
          <div className="flex items-center">
            <div className="w-12 h-12 flex items-center justify-center mr-3">
              <FaShoppingBasket className="text-purple-700 text-2xl" />
            </div>
            <span className="text-2xl font-bold text-black">Grocery Store</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="bg-transparent text-black hover:text-purple-700 transition duration-300">Home</Link>
          <Link to="/products" className="bg-transparent text-black hover:text-purple-700 transition duration-300">Products</Link>
          
          {user && (
            <Link to="/mybooking" className="bg-transparent text-black hover:text-purple-700 transition duration-300">My Orders</Link>
          )}
          <Link to="/contact" className="bg-transparent text-black hover:text-purple-700 transition duration-300">Contact</Link>
          <Link to="/aboutus" className="bg-transparent text-black hover:text-purple-700 transition duration-300">About Us</Link>
          {/* Cart Icon */}
          <Link to="/cart" className="relative ml-4">
            <FaShoppingCart className="text-2xl text-purple-700 hover:text-purple-900 transition duration-300" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5 font-bold">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <Link to="/favorite" className="relative text-black hover:text-purple-700 transition duration-300">
            <FaHeart size={22} />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full font-bold">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* If user is logged in */}
          {user ? (
            <div className="flex space-x-4">
              <Link to="/myprofile" className="bg-purple-700 text-white px-4 py-2 rounded-md text-sm hover:bg-purple-800">My Account</Link>
              <button onClick={handleLogout} className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm hover:bg-purple-700">
                Log Out
              </button>
            </div>
          ) : (
            <div className="flex space-x-3">
              <Link to="/login" className="bg-purple-700 text-white px-4 py-2 rounded-md text-sm hover:bg-purple-800">Login</Link>
              <Link to="/register" className="bg-purple-700 text-white px-4 py-2 rounded-md text-sm hover:bg-purple-800">Sign Up</Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-700 dairy-focus" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md absolute top-full left-0 w-full py-4">
          <Link to="/" className="block px-6 py-2 bg-transparent text-black hover:text-purple-700 transition duration-200">Home</Link>
          <Link to="/products" className="block px-6 py-2 bg-transparent text-black hover:text-purple-700 transition duration-200">Products</Link>
          
          {user && (
            <Link to="/mybooking" className="block px-6 py-2 bg-transparent text-black hover:text-purple-700 transition duration-200">My Orders</Link>
          )}
          <Link to="/contact" className="block px-6 py-2 bg-transparent text-black hover:text-purple-700 transition duration-200">Contact</Link>
          <Link to="/aboutus" className="block px-6 py-2 bg-transparent text-black hover:text-purple-700 transition duration-200">About Us</Link>

          {user ? (
            <>
              <Link to="/profile" className="block bg-purple-700 text-white text-center px-6 py-2 rounded-md text-sm hover:bg-purple-800">My Account</Link>
              <button onClick={handleLogout} className="block w-full text-center bg-purple-600 text-white px-6 py-2 rounded-md text-sm hover:bg-purple-700">
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block bg-purple-700 text-white text-center px-6 py-2 rounded-md text-sm hover:bg-purple-800">Login</Link>
              <Link to="/register" className="block bg-purple-700 text-white text-center px-6 py-2 rounded-md text-sm hover:bg-purple-800">Sign Up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
