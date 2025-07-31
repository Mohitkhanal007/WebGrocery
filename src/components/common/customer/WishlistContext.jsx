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
  const [wishlistCount, setWishlistCount] = useState(0);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWishlistCount = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setWishlistCount(0);
        return;
      }

      const response = await axios.get('http://localhost:3001/api/v1/wishlist/count', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setWishlistCount(response.data.count);
      }
    } catch (error) {
      console.error('Error fetching wishlist count:', error);
      setWishlistCount(0);
    }
  };

  const fetchWishlistItems = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setWishlistItems([]);
        return;
      }

      setLoading(true);
      const response = await axios.get('http://localhost:3001/api/v1/wishlist', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success && response.data.wishlist) {
        setWishlistItems(response.data.wishlist.products || []);
      }
    } catch (error) {
      console.error('Error fetching wishlist items:', error);
      setWishlistItems([]);
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User not authenticated');
      }

      const response = await axios.post(
        'http://localhost:3001/api/v1/wishlist/add',
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setWishlistCount(response.data.count);
        await fetchWishlistItems();
        return { success: true, message: 'Added to wishlist' };
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      return { success: false, message: error.response?.data?.message || 'Error adding to wishlist' };
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User not authenticated');
      }

      const response = await axios.delete(
        `http://localhost:3001/api/v1/wishlist/delete/${productId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setWishlistCount(prev => Math.max(0, prev - 1));
        setWishlistItems(prev => prev.filter(item => item._id !== productId));
        return { success: true, message: 'Removed from wishlist' };
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      return { success: false, message: error.response?.data?.message || 'Error removing from wishlist' };
    }
  };

  useEffect(() => {
    fetchWishlistCount();
    fetchWishlistItems();
  }, []);

  const value = {
    wishlistCount,
    wishlistItems,
    loading,
    addToWishlist,
    removeFromWishlist,
    fetchWishlistCount,
    fetchWishlistItems,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}; 