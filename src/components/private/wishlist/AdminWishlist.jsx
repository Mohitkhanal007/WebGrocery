import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  FaHeart, 
  FaUsers, 
  FaBox, 
  FaChartLine,
  FaEye,
  FaTrash,
  FaSearch
} from "react-icons/fa";

const AdminWishlist = () => {
  const [wishlists, setWishlists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [stats, setStats] = useState({
    totalWishlists: 0,
    totalItems: 0,
    mostWishedProduct: "",
    averageItemsPerUser: 0
  });

  useEffect(() => {
    fetchWishlists();
  }, []);

  const fetchWishlists = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/v1/wishlist/all");
      
      if (response.data && response.data.wishlists) {
        const fetchedWishlists = response.data.wishlists;
        setWishlists(fetchedWishlists);
        
        // Calculate stats from real data
        const totalItems = fetchedWishlists.reduce((sum, wishlist) => sum + (wishlist.products?.length || 0), 0);
        const totalWishlists = fetchedWishlists.length;
        
        setStats({
          totalWishlists,
          totalItems,
          mostWishedProduct: totalWishlists > 0 ? "Calculated from data" : "No data",
          averageItemsPerUser: totalWishlists > 0 ? (totalItems / totalWishlists).toFixed(1) : 0
        });
      } else {
        setWishlists([]);
        setStats({
          totalWishlists: 0,
          totalItems: 0,
          mostWishedProduct: "No data",
          averageItemsPerUser: 0
        });
      }
    } catch (error) {
      console.error("Error fetching wishlists:", error);
      // Don't show demo data - just show empty state
      setWishlists([]);
      setStats({
        totalWishlists: 0,
        totalItems: 0,
        mostWishedProduct: "No data",
        averageItemsPerUser: 0
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredWishlists = wishlists.filter(wishlist =>
    wishlist.customer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    wishlist.products?.some(product => 
      product.name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading wishlist data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-purple-100">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Wishlist Management</h1>
              <p className="text-gray-600 mt-1">Monitor customer wishlists and popular items</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Wishlists</p>
                <p className="text-3xl font-bold text-gray-800">{stats.totalWishlists}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <FaHeart className="text-2xl text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Items</p>
                <p className="text-3xl font-bold text-gray-800">{stats.totalItems}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FaBox className="text-2xl text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Avg Items/User</p>
                <p className="text-3xl font-bold text-gray-800">{stats.averageItemsPerUser}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <FaUsers className="text-2xl text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Most Wished</p>
                <p className="text-lg font-bold text-gray-800">{stats.mostWishedProduct}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <FaChartLine className="text-2xl text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by customer or product..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
              />
            </div>
          </div>
        </div>

        {/* Wishlists List */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Customer Wishlists</h3>
          
          {filteredWishlists.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHeart className="text-3xl text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No Wishlists Found</h3>
              <p className="text-gray-600 mb-6">
                {wishlists.length === 0 
                  ? "No customers have added items to their wishlists yet."
                  : "No wishlists match your search criteria."
                }
              </p>
              {wishlists.length === 0 && (
                <p className="text-sm text-gray-500">
                  Wishlists will appear here when customers add products to their wishlists.
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredWishlists.map((wishlist) => (
                <div key={wishlist._id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">{wishlist.customer}</h4>
                      <p className="text-sm text-gray-500">Created: {wishlist.createdAt}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                        {wishlist.products?.length || 0} items
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {wishlist.products?.map((product) => (
                      <div key={product._id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <img
                          src={product.image || "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=100&q=80"}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h5 className="font-medium text-gray-800">{product.name}</h5>
                          <p className="text-sm text-gray-600">₹{product.price}</p>
                        </div>
                        <button className="text-red-500 hover:text-red-700 transition-colors">
                          <FaTrash size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminWishlist; 