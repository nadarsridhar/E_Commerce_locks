const mongoose = require("mongoose");

const checkoutItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: false,
    },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
  { _id: false }
);

// ✅ Razorpay-compatible paymentDetails subdocument
const paymentDetailsSchema = new mongoose.Schema(
  {
    transactionId: { type: String, required: false }, // Razorpay payment_id
    orderId: { type: String, required: true },        // Razorpay order_id
    paymentGateway: { type: String, default: "Razorpay", required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: "INR", required: true },
    status: { type: String, required: true },         // captured, failed etc.
    method: { type: String },                         // upi/card/netbanking etc.
    email: { type: String },
    contact: { type: String },
  },
  { _id: false }
);

const checkoutSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    checkoutItems: [checkoutItemSchema],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: {
      type: String, // e.g., "Razorpay"
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    paymentStatus: {
      type: String,
      default: "pending",
    },
    paymentDetails: paymentDetailsSchema, // ✅ Embedded subdoc here
    isFinalized: {
      type: Boolean,
      default: false,
    },
    finalizedAt: {
      type: Date,
    },
    status: { type: String, default: "Processing" }, // Add status field
    deliveredAt: { type: Date }, // Optionally add a field for the delivery timestamp
    isDelivered: { type: Boolean, default: false }, // Track whether it's delivered
  },
  { timestamps: true }
);

module.exports = mongoose.model("Checkout", checkoutSchema);
