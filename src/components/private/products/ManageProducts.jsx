import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/v1/products");
        setProducts(res.data || []);
        setError("");
      } catch (error) {
        setError("Failed to fetch products from backend.");
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
      try {
        setLoading(true);
        await axios.delete(`/api/v1/products/${id}`);
        setMessage("Product deleted successfully!");
        
        // Refresh the products list
        const res = await axios.get("/api/v1/products");
        setProducts(res.data || []);
        
        // Clear message after 3 seconds
        setTimeout(() => setMessage(""), 3000);
      } catch (error) {
        console.error("Error deleting product:", error);
        setError("Failed to delete product. Please try again.");
        
        // Clear error after 3 seconds
        setTimeout(() => setError(""), 3000);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setEditForm({ ...product });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = async () => {
    try {
      await axios.put(`/api/v1/products/${editingProduct._id}`, editForm);
      setMessage("Product updated successfully!");
      setEditingProduct(null);
      // Refresh products
      const res = await axios.get("/api/v1/products");
      setProducts(res.data || []);
    } catch (err) {
      setError("Failed to update product.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md overflow-x-auto">
      {/* Hero Section */}
      <div className="relative w-full h-[200px] rounded-lg overflow-hidden shadow-lg mb-8">
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80"
          alt="Manage Products"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-70 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-2">Manage Grocery Products</h2>
            <p className="text-lg">Update and manage your product inventory</p>
          </div>
        </div>
      </div>
      
      {error && <p className="text-red-600 bg-red-50 p-3 rounded-lg mb-4">{error}</p>}
      {message && <p className="text-green-600 bg-green-50 p-3 rounded-lg mb-4">{message}</p>}

      {loading ? (
        <div className="text-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="text-gray-600 mt-2">Loading products...</p>
        </div>
      ) : (
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left text-sm font-semibold text-gray-700">Image</th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700">Title</th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700">Category</th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700">Price (Rs.)</th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700">Stock</th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <img 
                      src={product.image ? (product.image.startsWith('http') ? product.image : `http://localhost:3001/public/uploads/${product.image}`) : "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80"} 
                      alt={product.name || product.title} 
                      className="w-16 h-16 object-cover rounded-md" 
                    />
                  </td>
                  <td className="p-3 text-gray-800 font-medium">{product.name || product.title}</td>
                  <td className="p-3 text-gray-600">{product.category}</td>
                  <td className="p-3 text-gray-600">₹{product.price}</td>
                  <td className="p-3 text-gray-600">{product.stockQuantity}</td>
                  <td className="p-3">
                    <button 
                      onClick={() => handleEdit(product)} 
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-blue-600 transition-colors"
                      disabled={loading}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(product._id)} 
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                      disabled={loading}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-6 text-gray-500">No products found.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
      <Modal
        isOpen={!!editingProduct}
        onRequestClose={() => setEditingProduct(null)}
        contentLabel="Edit Product"
        ariaHideApp={false}
        className="fixed inset-0 flex items-center justify-center p-4"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">Edit Product</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input 
                name="name" 
                value={editForm.name || ''} 
                onChange={handleEditChange} 
                className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-400" 
                placeholder="Product Name" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select 
                name="category" 
                value={editForm.category || ''} 
                onChange={handleEditChange} 
                className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-400"
              >
                <option value="">Select Category</option>
                <option value="Milk">Milk</option>
                <option value="Cheese">Cheese</option>
                <option value="Yogurt">Yogurt</option>
                <option value="Butter">Butter</option>
                <option value="Cream">Cream</option>
                <option value="Ice Cream">Ice Cream</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
              <input 
                name="price" 
                type="number" 
                value={editForm.price || ''} 
                onChange={handleEditChange} 
                className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-400" 
                placeholder="Price" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
              <input 
                name="stockQuantity" 
                type="number" 
                value={editForm.stockQuantity || ''} 
                onChange={handleEditChange} 
                className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-400" 
                placeholder="Stock Quantity" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea 
                name="description" 
                value={editForm.description || ''} 
                onChange={handleEditChange} 
                className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-400" 
                placeholder="Product Description"
                rows="3"
              />
            </div>
            <div className="flex gap-2 pt-4">
              <button 
                type="button" 
                onClick={handleEditSave} 
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors flex-1"
              >
                Save Changes
              </button>
              <button 
                type="button" 
                onClick={() => setEditingProduct(null)} 
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition-colors flex-1"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default ManageProducts;
