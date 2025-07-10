const express = require("express");
const Checkout = require("../models/Checkout");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// @route GET /api/admin/orders
// @desc Get all orders (Admin only)
// @access Private/Admin
router.get("/", protect, admin, async (req, res) => {
    try {
      const orders = await Checkout.find({})
        .populate("user", "name email") // get user name and email
        .sort({ createdAt: -1 });
  
      res.json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  });

// @route PUT /api/admin/orders/:id
// @desc update order status
// @access private/Admin

router.put("/:id", protect, admin, async (req, res) => {
    try {
      const order = await Checkout.findById(req.params.id);
      if (order) {
        const newStatus = req.body.status;
  
        order.status = newStatus || order.status;
  
        // If marked as Delivered
        if (newStatus === "Delivered") {
          order.isDelivered = true;
          order.deliveredAt = Date.now();
        }
  
        const updatedOrder = await order.save();
        res.json(updatedOrder);
      } else {
        res.status(404).json({ message: "Order not found" });
      }
    } catch (error) {
      console.error("Error updating order:", error);
      res.status(500).json({ message: "Server Error" });
    }
  });

// @route DELETE /api/admin/orders/:id
// @desc Delete an order
// @access private/Admin
router.delete("/:id", protect, admin, async (req, res) => {
    try {
        const order = await Checkout.findById(req.params.id);
        if(order) {
            await order.deleteOne();
            res.json({message: "Order removed"});
        } else {
            res.status(404).json({message: "Order not found"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"});
    }
});

module.exports = router;