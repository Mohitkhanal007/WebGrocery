import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fetch wishlist on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchWishlist();
    }
  }, []);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/v1/wishlist', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data && response.data.success) {
        const products = response.data.wishlist?.products || [];
        setWishlist(products);
        setWishlistCount(products.length);
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      setWishlist([]);
      setWishlistCount(0);
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return { success: false, message: 'Please login to add items to wishlist' };
      }

      const response = await axios.post('/api/v1/wishlist/add', 
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data && response.data.success) {
        // Refresh wishlist
        await fetchWishlist();
        return { success: true, message: 'Added to wishlist' };
      } else {
        return { success: false, message: response.data?.message || 'Failed to add to wishlist' };
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      return { success: false, message: error.response?.data?.message || 'Failed to add to wishlist' };
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return { success: false, message: 'Please login to manage wishlist' };
      }

      const response = await axios.delete(`/api/v1/wishlist/remove/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data && response.data.success) {
        // Refresh wishlist
        await fetchWishlist();
        return { success: true, message: 'Removed from wishlist' };
      } else {
        return { success: false, message: response.data?.message || 'Failed to remove from wishlist' };
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      return { success: false, message: error.response?.data?.message || 'Failed to remove from wishlist' };
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some(product => product._id === productId);
  };

  const value = {
    wishlist,
    wishlistCount,
    loading,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    fetchWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}; 