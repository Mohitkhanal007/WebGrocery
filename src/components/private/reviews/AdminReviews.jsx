import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  FaStar, 
  FaUsers, 
  FaThumbsUp, 
  FaChartLine,
  FaEye,
  FaTrash,
  FaSearch,
  FaFilter
} from "react-icons/fa";

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRating, setFilterRating] = useState("all");
  const [stats, setStats] = useState({
    totalReviews: 0,
    averageRating: 0,
    positiveReviews: 0,
    recentReviews: 0
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/v1/reviews");
      
      if (response.data && response.data.reviews) {
        const fetchedReviews = response.data.reviews;
        setReviews(fetchedReviews);
        
        // Calculate stats from real data
        const totalReviews = fetchedReviews.length;
        const totalRating = fetchedReviews.reduce((sum, review) => sum + (review.rating || 0), 0);
        const averageRating = totalReviews > 0 ? (totalRating / totalReviews).toFixed(1) : 0;
        const positiveReviews = fetchedReviews.filter(review => (review.rating || 0) >= 4).length;
        
        setStats({
          totalReviews,
          averageRating,
          positiveReviews,
          recentReviews: fetchedReviews.filter(review => {
            const reviewDate = new Date(review.createdAt);
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            return reviewDate >= weekAgo;
          }).length
        });
      } else {
        setReviews([]);
        setStats({
          totalReviews: 0,
          averageRating: 0,
          positiveReviews: 0,
          recentReviews: 0
        });
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      // Don't show demo data - just show empty state
      setReviews([]);
      setStats({
        totalReviews: 0,
        averageRating: 0,
        positiveReviews: 0,
        recentReviews: 0
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = 
      review.customer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.product?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRating = filterRating === "all" || review.rating === parseInt(filterRating);
    
    return matchesSearch && matchesRating;
  });

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={`text-sm ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading reviews data...</p>
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
              <h1 className="text-3xl font-bold text-gray-800">Reviews Management</h1>
              <p className="text-gray-600 mt-1">Monitor customer reviews and ratings</p>
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
                <p className="text-gray-600 text-sm font-medium">Total Reviews</p>
                <p className="text-3xl font-bold text-gray-800">{stats.totalReviews}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <FaStar className="text-2xl text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Average Rating</p>
                <p className="text-3xl font-bold text-gray-800">{stats.averageRating}</p>
                <div className="flex mt-1">
                  {renderStars(Math.round(stats.averageRating))}
                </div>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FaChartLine className="text-2xl text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Positive Reviews</p>
                <p className="text-3xl font-bold text-gray-800">{stats.positiveReviews}</p>
                <p className="text-sm text-green-600">4+ stars</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <FaThumbsUp className="text-2xl text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Recent Reviews</p>
                <p className="text-3xl font-bold text-gray-800">{stats.recentReviews}</p>
                <p className="text-sm text-orange-600">Last 7 days</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <FaUsers className="text-2xl text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by customer, product, or comment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
              />
            </div>
            <div className="flex items-center gap-2">
              <FaFilter className="text-gray-400" />
              <select
                value={filterRating}
                onChange={(e) => setFilterRating(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
              >
                <option value="all">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Customer Reviews</h3>
          
          {filteredReviews.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaStar className="text-3xl text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No Reviews Found</h3>
              <p className="text-gray-600 mb-6">
                {reviews.length === 0 
                  ? "No customers have left reviews yet."
                  : "No reviews match your search criteria."
                }
              </p>
              {reviews.length === 0 && (
                <p className="text-sm text-gray-500">
                  Reviews will appear here when customers leave feedback on products.
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredReviews.map((review) => (
                <div key={review._id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h4 className="text-lg font-semibold text-gray-800">{review.customer}</h4>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          review.status === 'approved' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {review.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">Product: {review.product}</p>
                      <p className="text-sm text-gray-500">Posted: {review.createdAt}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <p className="text-gray-700">{review.comment}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <FaEye size={14} />
                      View Details
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                      <FaThumbsUp size={14} />
                      Approve
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                      <FaTrash size={14} />
                      Delete
                    </button>
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

export default AdminReviews; 