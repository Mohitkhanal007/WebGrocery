import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import Navbar from "../common/customer/Navbar";
import Footer from "../common/customer/Footer";
import ProductCard from "../common/customer/ProductCard";
import Spinner from "../common/customer/Spinner";
import { placeholderProducts } from "./demoProducts";

const categoryOptions = [
  "All",
  "Milk", "Cheese", "Yogurt", "Butter", "Cream", "Ice Cream", "Other"
];
const sortOptions = [
  { value: "default", label: "Default" },
  { value: "priceLow", label: "Price: Low to High" },
  { value: "priceHigh", label: "Price: High to Low" },
  { value: "newest", label: "Newest" }
];

const Products = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [showScroll, setShowScroll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/v1/products");
        setProducts(response.data);
        setError("");
      } catch (err) {
        console.log("Backend not available, using placeholder data");
        setProducts(placeholderProducts);
        setError("Demo Mode: Showing sample products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(p => {
      const displayName = p.name || p.title || "";
      const description = p.description || "";
      return (
        (!search || displayName.toLowerCase().includes(search.toLowerCase()) || description.toLowerCase().includes(search.toLowerCase())) &&
        (category === "All" || (p.category || "Other") === category) &&
        p.price >= priceRange[0] && p.price <= priceRange[1]
      );
    });
    if (sort === "priceLow") filtered = filtered.sort((a, b) => a.price - b.price);
    if (sort === "priceHigh") filtered = filtered.sort((a, b) => b.price - a.price);
    if (sort === "newest") filtered = filtered.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    return filtered;
  }, [products, search, category, sort, priceRange]);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold text-center text-purple-800 mb-6 grocery-heading">
          Our Grocery Products
        </h1>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          {/* Search Bar */}
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full md:w-1/3 p-3 border rounded-lg focus:ring-2 focus:ring-purple-400"
          />
          {/* Category Filter */}
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-purple-400"
          >
            {categoryOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          {/* Price Range Filter */}
          <div className="flex items-center gap-2">
            <span>Price:</span>
            <input
              type="number"
              min={0}
              max={priceRange[1]}
              value={priceRange[0]}
              onChange={e => setPriceRange([Number(e.target.value), priceRange[1]])}
              className="w-20 p-2 border rounded"
            />
            <span>-</span>
            <input
              type="number"
              min={priceRange[0]}
              value={priceRange[1]}
              onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="w-20 p-2 border rounded"
            />
          </div>
          {/* Sort Dropdown */}
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-purple-400"
          >
            {sortOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div className="text-center mb-10 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800 font-medium">Demo Mode: Showing sample grocery products</p>
          <p className="text-blue-600 text-sm mt-1">Connect your backend to see real products</p>
        </div>
        {loading ? (
          <div className="py-20"><Spinner size={60} /></div>
        ) : error ? (
          <div className="col-span-3 text-center text-red-600">{error}</div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product._id} packageData={product} />
            ))}
          </div>
        ) : (
          <div className="col-span-3 text-center text-gray-600">No products found.</div>
        )}
        <div style={{ height: '3000px' }}></div>
      </div>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 bg-blue-700 text-white p-3 rounded-full shadow-lg hover:bg-blue-800 transition duration-300 cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </svg>
      </button>
      <Footer />
    </>
  );
};

export default Products; 