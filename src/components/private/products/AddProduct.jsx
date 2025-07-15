import axios from "axios";
import React, { useState } from "react";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Fruits",
    price: "",
    stockQuantity: "",
    unit: "kg",
    image: null,
    expiryDate: "",
    brand: "",
    isOrganic: false,
    nutritionalInfo: {
      calories: "",
      protein: "",
      fat: "",
      carbohydrates: "",
      calcium: ""
    }
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleArrayChange = (field, index, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayField = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };

  const removeArrayField = (field, index) => {
    const newArray = [...formData[field]];
    newArray.splice(index, 1);
    setFormData({ ...formData, [field]: newArray });
  };

  const handleNutritionalChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      nutritionalInfo: {
        ...formData.nutritionalInfo,
        [name]: value
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "nutritionalInfo") {
          form.append(key, JSON.stringify(value));
        } else {
          form.append(key, value);
        }
      });
      await axios.post('/api/v1/products', form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage("Product added successfully!");
      setError("");
      setFormData({
        name: "",
        description: "",
        category: "Fruits",
        price: "",
        stockQuantity: "",
        unit: "kg",
        image: null,
        expiryDate: "",
        brand: "",
        isOrganic: false,
        nutritionalInfo: {
          calories: "",
          protein: "",
          fat: "",
          carbohydrates: "",
          calcium: ""
        }
      });
    } catch (error) {
      setError("Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-purple-800 mb-6">Add New Grocery Product</h2>
      {message && <p className="text-green-600 bg-green-50 p-3 rounded-lg">{message}</p>}
      {error && <p className="text-red-600 bg-red-50 p-3 rounded-lg">{error}</p>}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Product Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g., Fresh Organic Milk" required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400" />
          </div>
          {/* Category */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Category</label>
            <select name="category" value={formData.category} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400">
              <option value="Fruits">Fruits</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Bakery">Bakery</option>
              <option value="Eggs">Eggs</option>
              <option value="Beverages">Beverages</option>
              <option value="Snacks">Snacks</option>
              <option value="Other">Other</option>
            </select>
          </div>
          {/* Price */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Price (Rs.)</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="e.g., 50" required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400" />
          </div>
          {/* Stock Quantity */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Stock Quantity</label>
            <input type="number" name="stockQuantity" value={formData.stockQuantity} onChange={handleChange} placeholder="e.g., 100" required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400" />
          </div>
          {/* Unit */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Unit</label>
            <select name="unit" value={formData.unit} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400">
              <option value="kg">Kg</option>
              <option value="piece">Piece</option>
              <option value="pack">Pack</option>
              <option value="liter">Liter</option>
            </select>
          </div>
          {/* Expiry Date */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Expiry Date</label>
            <input type="date" name="expiryDate" value={formData.expiryDate} onChange={handleChange} required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400" />
          </div>
          {/* Brand */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Brand</label>
            <input type="text" name="brand" value={formData.brand} onChange={handleChange} placeholder="e.g., GroceryPro" required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400" />
          </div>
          {/* Is Organic */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Is Organic?</label>
            <select name="isOrganic" value={formData.isOrganic} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400">
              <option value={false}>No</option>
              <option value={true}>Yes</option>
            </select>
          </div>
        </div>
        {/* Description */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Detailed product description..." required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400 h-32"></textarea>
        </div>
        {/* Image Upload */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Product Image</label>
          <input type="file" name="image" onChange={handleFileChange} required className="w-full p-3 border rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
        </div>
        {/* Nutritional Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Nutritional Information</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <input type="number" name="calories" value={formData.nutritionalInfo.calories} onChange={handleNutritionalChange} placeholder="Calories" className="p-3 border rounded-lg focus:ring-2 focus:ring-purple-400" />
            <input type="number" name="protein" value={formData.nutritionalInfo.protein} onChange={handleNutritionalChange} placeholder="Protein (g)" className="p-3 border rounded-lg focus:ring-2 focus:ring-purple-400" />
            <input type="number" name="fat" value={formData.nutritionalInfo.fat} onChange={handleNutritionalChange} placeholder="Fat (g)" className="p-3 border rounded-lg focus:ring-2 focus:ring-purple-400" />
            <input type="number" name="carbohydrates" value={formData.nutritionalInfo.carbohydrates} onChange={handleNutritionalChange} placeholder="Carbohydrates (g)" className="p-3 border rounded-lg focus:ring-2 focus:ring-purple-400" />
            <input type="number" name="calcium" value={formData.nutritionalInfo.calcium} onChange={handleNutritionalChange} placeholder="Calcium (mg)" className="p-3 border rounded-lg focus:ring-2 focus:ring-purple-400" />
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 text-white py-4 px-4 rounded-lg hover:bg-purple-700 transition duration-300 text-lg font-bold disabled:bg-purple-300"
        >
          {loading ? "Adding Product..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;

