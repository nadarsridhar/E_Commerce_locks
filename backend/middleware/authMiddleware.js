const jwt = require("jsonwebtoken");
const User = require("../models/Users");

// Middleware to protect routes
const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            console.log("🔹 Token received:", token); // Debugging

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("🔹 Decoded token:", decoded); // Debugging

            req.user = await User.findById(decoded.user.id).select("-password");
            console.log("🔹 User found:", req.user); // Debugging

            if (!req.user) {
                return res.status(401).json({ message: "User not found" });
            }

            next();
        } catch (error) {
            console.error("❌ Token verification failed:", error);
            return res.status(401).json({ message: "Not authorized, token failed" });
        }
    } else {
        return res.status(401).json({ message: "Not authorized, no token provided" });
    }
};

// Middleware to check if the user is an admin
const admin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: "Not authorized, user not found" });
    }

    if (req.user.role === "admin") {
        next();
    } else {
        return res.status(403).json({ message: "Not authorized as an admin" }); // ✅ Fixed typo
    }
};

module.exports = { protect, admin };

