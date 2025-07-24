const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderController");

// Create a new order
router.post("/", OrderController.createOrder);

// Get all orders for a user
router.get("/user/:userId", OrderController.getUserOrders);

module.exports = router; 