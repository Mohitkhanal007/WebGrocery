const Order = require("../models/Order");

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { userId, items, address, total, paymentMethod, paymentId } = req.body;
    const order = new Order({
      userId,
      items,
      address,
      total,
      paymentMethod,
      paymentId,
      status: paymentMethod === "cod" ? "Pending" : "Paid"
    });
    await order.save();
    res.status(201).json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to create order", error: err.message });
  }
};

// Get all orders for a user
exports.getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch orders", error: err.message });
  }
}; 