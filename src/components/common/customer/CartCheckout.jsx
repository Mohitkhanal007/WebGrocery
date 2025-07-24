import React, { useState } from "react";
import { useCart } from "./CartContext";
import { Link, useNavigate } from "react-router-dom";
import KhaltiCheckout from "khalti-checkout-web";
import axios from "axios";

const CartCheckout = () => {
  const { cart, clearCart } = useCart();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    paymentMethod: "khalti",
  });
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleKhaltiPayment = (e) => {
    e.preventDefault();
    setProcessing(true);
    setError("");
    const config = {
      publicKey: "test_public_key_dc74e0fd57cb46cd93832aee0a390234",
      productIdentity: "cart-checkout",
      productName: "Grocery Cart Order",
      productUrl: window.location.href,
      eventHandler: {
        async onSuccess(payload) {
          try {
            // Save order to backend
            const userId = localStorage.getItem("userId");
            await axios.post("http://localhost:3001/api/v1/orders", {
              userId,
              items: cart.map(item => ({
                productId: item._id,
                title: item.title,
                price: item.price,
                quantity: item.quantity,
                image: item.image
              })),
              address: formData,
              total,
              paymentMethod: "khalti",
              paymentId: payload.idx
            });
            setProcessing(false);
            setSuccess(true);
            clearCart();
          } catch (err) {
            setProcessing(false);
            setError("Order saving failed, but payment was successful.");
          }
        },
        onError(error) {
          setProcessing(false);
          setError("Payment failed. Please try again.");
        },
        onClose() {
          setProcessing(false);
        },
      },
      paymentPreference: ["KHALTI"],
    };
    const checkout = new KhaltiCheckout(config);
    checkout.show({ amount: total * 100 }); // Khalti expects paisa
  };

  if (cart.length === 0 && !success) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Your Cart is Empty</h2>
        <Link to="/products" className="bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-800 transition">Shop Products</Link>
      </div>
    );
  }

  if (success) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4 text-green-700">Order Placed Successfully! 🎉</h2>
        <p className="mb-6">Thank you for your purchase. You will receive a confirmation email soon.</p>
        <Link to="/" className="bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-800 transition">Go to Home</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold mb-8">Checkout</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Cart Summary */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-2xl font-bold mb-4">Order Summary</h3>
          {cart.map((item) => (
            <div key={item._id} className="flex items-center gap-4 mb-4 border-b pb-4">
              <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-lg" />
              <div className="flex-1">
                <h4 className="font-semibold">{item.title}</h4>
                <p className="text-gray-600">Qty: {item.quantity}</p>
                <p className="text-gray-800">Rs.{item.price} each</p>
              </div>
              <div className="font-bold text-purple-800">Rs.{item.price * item.quantity}</div>
            </div>
          ))}
          <div className="text-xl font-bold mt-6">Total: Rs.{total}</div>
        </div>
        {/* Checkout Form */}
        <form className="bg-white shadow-lg rounded-lg p-6" onSubmit={handleKhaltiPayment}>
          <h3 className="text-2xl font-bold mb-4">Shipping Details</h3>
          <div className="mb-4">
            <label className="block text-gray-800 font-semibold mb-2">Full Name</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-800 font-semibold mb-2">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-800 font-semibold mb-2">Phone</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-800 font-semibold mb-2">Address</label>
            <textarea name="address" value={formData.address} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md" />
          </div>
          <div className="mb-6">
            <label className="block text-gray-800 font-semibold mb-2">Payment Method</label>
            <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} className="w-full px-4 py-2 border rounded-md">
              <option value="khalti">Khalti</option>
              <option value="cod">Cash on Delivery</option>
            </select>
          </div>
          {error && <div className="text-red-600 mb-4">{error}</div>}
          <button type="submit" disabled={processing} className="w-full bg-green-700 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-800 transition duration-300">
            {processing ? "Processing..." : "Pay with Khalti"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CartCheckout; 