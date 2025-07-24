import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "../common/customer/Footer";
import Navbar from "../common/customer/Navbar";

const Myprofile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addresses, setAddresses] = useState(() => {
    const stored = localStorage.getItem("addresses");
    return stored ? JSON.parse(stored) : [];
  });
  const [addressForm, setAddressForm] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    country: ""
  });
  const [editingIndex, setEditingIndex] = useState(null);

  // Save addresses to localStorage
  useEffect(() => {
    localStorage.setItem("addresses", JSON.stringify(addresses));
  }, [addresses]);

  const handleAddressChange = (e) => {
    setAddressForm({ ...addressForm, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdateAddress = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      setAddresses(addresses.map((addr, idx) => idx === editingIndex ? addressForm : addr));
      setEditingIndex(null);
    } else {
      setAddresses([...addresses, addressForm]);
    }
    setAddressForm({ street: "", city: "", state: "", zip: "", country: "" });
  };

  const handleEditAddress = (idx) => {
    setAddressForm(addresses[idx]);
    setEditingIndex(idx);
  };

  const handleDeleteAddress = (idx) => {
    setAddresses(addresses.filter((_, i) => i !== idx));
    if (editingIndex === idx) setEditingIndex(null);
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId"); // Retrieve userId from localStorage

        if (!userId) {
          console.error("User ID not found in local storage");
          return;
        }

        const response = await axios.get(`/api/v1/auth/getCustomer/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data.data); // Updated to use response.data.data
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Your Profile</h1>

        {loading ? (
          <p className="text-gray-800 text-lg">Loading profile...</p>
        ) : user ? (
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center">
              {/* Profile Picture */}
              <div className="md:w-1/3 text-center">
                <img
                  src={`/api/v1/${user.profileImage}`}
                  alt="Profile"
                  className="w-32 h-32 object-cover rounded-full mx-auto border-4 border-red-500"
                />
                <h2 className="text-2xl font-bold mt-4">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
              </div>

              {/* Profile Details */}
              <div className="md:w-2/3 md:pl-8 mt-6 md:mt-0">
                <h3 className="text-xl font-bold text-gray-800 mb-4">User Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <label className="block text-gray-600 font-semibold">Username</label>
                    <p className="text-gray-800">{user.username}</p>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <label className="block text-gray-600 font-semibold">Phone</label>
                    <p className="text-gray-800">{user.phone}</p>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg col-span-2">
                    <label className="block text-gray-600 font-semibold">Address</label>
                    <p className="text-gray-800">{user.address}</p>
                  </div>
                </div>
                <button className="mt-6 bg-red-800 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition duration-300">
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-800 text-lg">Failed to load profile.</p>
        )}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4 text-purple-800">Address Book</h2>
          <form onSubmit={handleAddOrUpdateAddress} className="mb-6 grid grid-cols-1 md:grid-cols-5 gap-4">
            <input name="street" value={addressForm.street} onChange={handleAddressChange} placeholder="Street" className="p-2 border rounded" required />
            <input name="city" value={addressForm.city} onChange={handleAddressChange} placeholder="City" className="p-2 border rounded" required />
            <input name="state" value={addressForm.state} onChange={handleAddressChange} placeholder="State" className="p-2 border rounded" required />
            <input name="zip" value={addressForm.zip} onChange={handleAddressChange} placeholder="ZIP" className="p-2 border rounded" required />
            <input name="country" value={addressForm.country} onChange={handleAddressChange} placeholder="Country" className="p-2 border rounded" required />
            <button type="submit" className="bg-purple-700 text-white px-4 py-2 rounded col-span-1 md:col-span-5 mt-2">{editingIndex !== null ? "Update Address" : "Add Address"}</button>
          </form>
          <ul className="space-y-3">
            {addresses.map((addr, idx) => (
              <li key={idx} className="flex flex-col md:flex-row md:items-center justify-between bg-gray-50 p-4 rounded shadow">
                <span>{addr.street}, {addr.city}, {addr.state}, {addr.zip}, {addr.country}</span>
                <div className="flex gap-2 mt-2 md:mt-0">
                  <button onClick={() => handleEditAddress(idx)} className="bg-blue-600 text-white px-3 py-1 rounded">Edit</button>
                  <button onClick={() => handleDeleteAddress(idx)} className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Myprofile;
