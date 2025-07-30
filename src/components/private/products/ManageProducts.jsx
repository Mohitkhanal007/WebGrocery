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

  const handleDelete = (id) => {
    alert("Delete functionality is not available in Demo Mode.");
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
      <h2 className="text-3xl font-bold text-purple-800 mb-4">Manage Grocery Products</h2>
      
      {error && <p className="text-purple-600 bg-purple-50 p-3 rounded-lg mb-4">{error}</p>}
      {message && <p className="text-green-600 bg-green-50 p-3 rounded-lg mb-4">{message}</p>}

      {loading ? (
        <div className="text-center py-10"><div className="dairy-spinner mx-auto"></div></div>
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
                  <td className="p-3 text-gray-600">{product.price}</td>
                  <td className="p-3 text-gray-600">{product.stockQuantity}</td>
                  <td className="p-3">
                    <button onClick={() => handleEdit(product)} className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-blue-600">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(product._id)} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
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
      >
        <h2 className="text-xl font-bold mb-4">Edit Product</h2>
        <form className="space-y-4">
          <input name="name" value={editForm.name || ''} onChange={handleEditChange} className="w-full p-2 border rounded" placeholder="Name" />
          <input name="category" value={editForm.category || ''} onChange={handleEditChange} className="w-full p-2 border rounded" placeholder="Category" />
          <input name="price" type="number" value={editForm.price || ''} onChange={handleEditChange} className="w-full p-2 border rounded" placeholder="Price" />
          <input name="stockQuantity" type="number" value={editForm.stockQuantity || ''} onChange={handleEditChange} className="w-full p-2 border rounded" placeholder="Stock" />
          <textarea name="description" value={editForm.description || ''} onChange={handleEditChange} className="w-full p-2 border rounded" placeholder="Description" />
          <div className="flex gap-2">
            <button type="button" onClick={handleEditSave} className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
            <button type="button" onClick={() => setEditingProduct(null)} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ManageProducts;
