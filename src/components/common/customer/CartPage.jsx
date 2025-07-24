import React from "react";
import { useCart } from "./CartContext";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Your Cart is Empty</h2>
        <Link to="/products" className="bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-800 transition">Shop Products</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold mb-8">Your Shopping Cart</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {cart.map((item) => (
          <div key={item._id} className="flex items-center bg-white rounded-lg shadow-md p-4 gap-6">
            <img src={item.image} alt={item.title} className="w-32 h-32 object-cover rounded-lg" />
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-600 mb-2">{item.description}</p>
              <div className="flex items-center gap-4 mb-2">
                <span className="font-semibold text-purple-800">Rs.{item.price}</span>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={e => updateQuantity(item._id, parseInt(e.target.value) || 1)}
                  className="w-16 p-1 border rounded text-center"
                />
                <button onClick={() => removeFromCart(item._id)} className="text-red-600 font-bold ml-2">Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-2xl font-bold">Total: Rs.{total}</div>
        <div className="flex gap-4">
          <button onClick={clearCart} className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition">Clear Cart</button>
          <Link to="/checkout/cart" className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition">Proceed to Checkout</Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage; 