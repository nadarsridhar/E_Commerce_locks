const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");
const orderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const subscribeRoute = require("./routes/subscribeRoute");
const adminRoutes = require("./routes/adminRoutes");
const productAdminRoutes = require("./routes/productAdminRoutes");
const adminOrderRoutes = require("./routes/adminOrderRoutes");
const sendOtpRoute = require("./routes/sendOtp");
const verifyOtpRoute = require("./routes/verifyOtp");
const resetPasswordRoute = require("./routes/resetPassword");
const paymentRoutes = require('./routes/paymentRoutes');

dotenv.config(); // ✅ Load environment variables

const app = express();

// ✅ Middleware
app.use(express.json());
// app.use(cors());

// ✅ Connect to MongoDB
connectDB().then(() => console.log("✅ MongoDB Connected")).catch(err => console.error("❌ MongoDB Error:", err));

app.use(
    cors({
      origin: 'http://localhost:5173', // Frontend ka exact origin
      credentials: true, // Cookies/headers allow karne ke liye
    })
  );
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // ✅ Specific frontend URL
    res.header("Access-Control-Allow-Credentials", "true"); // ✅ Cookies allow karega
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }
    next();
  });

const PORT = process.env.PORT || 3000;

// ✅ Test Route
app.get("/", (req, res) => {
    res.send("Welcome to Rabbit API!");
});

// ✅ API Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api", subscribeRoute);

// ✅ Admin Routes
app.use("/api/admin/users", adminRoutes);
app.use("/api/admin/products", productAdminRoutes);
app.use("/api/admin/orders", adminOrderRoutes);

// ✅ OTP Routes (Fixed)
app.use("/api", sendOtpRoute);
app.use("/api", verifyOtpRoute);
app.use("/api", resetPasswordRoute);

//payment
app.use('/api/payments', paymentRoutes);

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
