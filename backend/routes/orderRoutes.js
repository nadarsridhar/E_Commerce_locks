const express = require("express");
const Order = require("../models/Order");
const Checkout = require("../models/Checkout");
const { protect } =require("../middleware/authMiddleware");
const mongoose = require('mongoose');  // Import mongoose

const router = express.Router();

// @route GET /api/orders/myorders
// @desc Get all orders of the logged-in user
// @access Private
router.get("/myorders", protect, async (req, res) => {
    try {
        console.log("🔹 Fetching orders for user:", req.user._id);

        const orders = await Checkout.find({ user: req.user._id }).sort({ createdAt: -1 });

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: "No orders found" });
        }

        console.log("✅ Orders found:", orders.length);
        res.json(orders);
    } catch (error) {
        console.error("❌ Error fetching user's orders:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});


// @route GET /api/orders/:id
// @desc GEt order details via id
// @access private
router.get("/:id", protect, async (req, res) => {
    try {
        console.log("🔹 Requested Order ID:", req.params.id); // Debugging

        if (!req.params.id) {
            return res.status(400).json({ message: "Order ID is required" });
        }

        const order = await Checkout.findOne({ "paymentDetails.orderId": req.params.id });
        console.log("✅ Order is :", order)
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        console.log("✅ Order found:", order);
        res.json(order);
    } catch (error) {
        console.error("❌ Server Error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

module.exports = router;