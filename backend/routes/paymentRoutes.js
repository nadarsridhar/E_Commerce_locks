require('dotenv').config();
const express = require('express');
const Razorpay = require('razorpay');
const Checkout = require("../models/Checkout");
const crypto = require('crypto');

const router = express.Router();

// Razorpay Instance
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// ✅ **Yaha pe Razorpay Key API Add karo**
router.get('/razorpay-key', (req, res) => {
    res.json({ key: process.env.RAZORPAY_KEY_ID });
});

// Create Order API
router.post('/create-order', async (req, res) => {
    const {
      amount,
      currency = "INR",
      userId,
      checkoutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
    } = req.body;
  
    const options = {
      amount: amount * 100,
      currency,
      receipt: `receipt_${Date.now()}`,
    };
  
    try {
      const razorpayOrder = await razorpay.orders.create(options);
  
      // Save to DB
      const checkoutDoc = await Checkout.create({
        user: userId,
        checkoutItems,
        shippingAddress,
        paymentMethod,
        totalPrice,
        paymentStatus: "pending",
        isPaid: false,
        paymentDetails: {
          orderId: razorpayOrder.id,
          amount: amount,
          currency: currency,
          status: "created",
        },
      });
  
      res.json({
        success: true,
        order: razorpayOrder,
        checkoutId: checkoutDoc._id,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: "Order creation failed", error: error.message });
    }
  });

// Verify Payment API
router.post('/verify-payment', async (req, res) => {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;
  
    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generatedSignature = hmac.digest('hex');
  
    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Payment verification failed" });
    }
  
    try {
      // 🔍 Find checkout doc by Razorpay Order ID
      const checkoutDoc = await Checkout.findOne({ "paymentDetails.orderId": razorpay_order_id });
  
      if (!checkoutDoc) {
        return res.status(404).json({ success: false, message: "Checkout document not found" });
      }
  
      // ✅ Update it with payment info
      checkoutDoc.isPaid = true;
      checkoutDoc.paidAt = new Date();
      checkoutDoc.paymentStatus = "captured"; // or "success"
      checkoutDoc.paymentDetails = {
        ...checkoutDoc.paymentDetails.toObject(),
        transactionId: razorpay_payment_id,
        status: "captured",
      };
  
      await checkoutDoc.save();
  
      res.json({ success: true, message: "Payment verified and order updated", order_id: razorpay_order_id });
    } catch (error) {
      console.error("Payment verification error:", error);
      res.status(500).json({ success: false, message: "Server error during payment verification" });
    }
  });

module.exports = router;
