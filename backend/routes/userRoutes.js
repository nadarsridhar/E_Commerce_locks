// const express = require("express");
// const User = require("../models/Users");
// const jwt = require("jsonwebtoken");
// const { protect } = require("../middleware/authMiddleware");
// const router = express.Router();

// // Function to validate mobile number format
// const isValidMobile = (mobile) => /^\+91[0-9]{10}$/.test(mobile);

// //@route POST /api/users/register
// //@desc Register a new user with mobile number
// //@access Public
// router.post("/register", async (req, res) => {
//     let { name, mobile, password, email } = req.body;

//     // Ensure mobile number starts with +91
//     if (!isValidMobile(mobile)) {
//         return res.status(400).json({ message: "Invalid mobile number! Use +91XXXXXXXXXX format." });
//     }

//     try {
//         // Check if user already exists by mobile number
//         let user = await User.findOne({ mobile });
//         if (user) return res.status(400).json({ message: "User already exists" });

//         user = new User({
//             name,
//             mobile,
//             password,
//             email: email || undefined,
//             role: req.body.role && ["admin", "customer"].includes(req.body.role) ? req.body.role : "customer"
//         });
//         await user.save();

//         // Create JWT Payload
//         const payload = { user: { id: user._id, role: user.role } };

//         // Sign and return the token along with user data
//         jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "40h" },
//             (err, token) => {
//                 if (err) throw err;
//                 res.status(201).json({
//                     user: {
//                         _id: user._id,
//                         name: user.name,
//                         mobile: user.mobile,
//                         email: user.email,
//                         role: user.role,
//                     },
//                     token,
//                 });
//             }
//         );
//     } catch (error) {
//         console.log(error);
//         res.status(500).send("Server Error");
//     }
// });

// // @route POST /api/users/login
// // @desc Authenticate user with mobile number
// // @access Public
// // router.post("/login", async (req, res) => {
// //     let { mobile, password } = req.body;

// //     // Ensure mobile number starts with +91
// //     if (!isValidMobile(mobile)) {
// //         return res.status(400).json({ message: "Invalid mobile number! Use +91XXXXXXXXXX format." });
// //     }

// //     try {
// //         // Find the user by mobile number
// //         let user = await User.findOne({ mobile });
// //         if (!user) return res.status(400).json({ message: "Invalid Credentials" });

// //         const isMatch = await user.matchPassword(password);
// //         if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

// //         // Create JWT Payload
// //         const payload = { user: { id: user._id, role: user.role } };

// //         // Sign and return the token along with user data
// //         jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "40h" },
// //             (err, token) => {
// //                 if (err) throw err;
// //                 res.json({
// //                     user: {
// //                         _id: user._id,
// //                         name: user.name,
// //                         mobile: user.mobile,
// //                         email: user.email,
// //                         role: user.role,
// //                     },
// //                     token,
// //                 });
// //             }
// //         );
// //     } catch (error) {
// //         console.error(error);
// //         res.status(500).send("Server error");
// //     }
// // });

// router.post("/login", async (req, res) => {
//     let { mobile, password, guestId } = req.body;

//     // Ensure mobile number starts with +91
//     if (!isValidMobile(mobile)) {
//         return res.status(400).json({ message: "Invalid mobile number! Use +91XXXXXXXXXX format." });
//     }

//     try {
//         // Find the user by mobile number
//         let user = await User.findOne({ mobile });
//         if (!user) return res.status(400).json({ message: "Invalid Credentials" });

//         const isMatch = await user.matchPassword(password);
//         if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

//         // ✅ Guest Cart Merge Logic
//         if (guestId) {
//             let guestCart = await Cart.findOne({ guestId });
//             let userCart = await Cart.findOne({ user: user._id });

//             if (guestCart && guestCart.products.length > 0) {
//                 if (!userCart) {
//                     userCart = new Cart({ user: user._id, products: [], totalPrice: 0 });
//                 }

//                 guestCart.products.forEach((item) => {
//                     const existingProduct = userCart.products.find(
//                         (p) => p.productId.toString() === item.productId.toString() && p.size === item.size && p.color === item.color
//                     );

//                     if (existingProduct) {
//                         existingProduct.quantity += item.quantity;
//                     } else {
//                         userCart.products.push(item);
//                     }
//                 });

//                 userCart.totalPrice = userCart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
//                 await userCart.save();
//                 await Cart.deleteOne({ guestId }); // ❌ Guest cart delete
//             }
//         }

//         // Create JWT Payload
//         const payload = { user: { id: user._id, role: user.role } };

//         // Sign and return the token along with user data
//         jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "40h" }, (err, token) => {
//             if (err) throw err;
//             res.json({
//                 user: {
//                     _id: user._id,
//                     name: user.name,
//                     mobile: user.mobile,
//                     email: user.email,
//                     role: user.role,
//                 },
//                 token,
//             });
//         });

//     } catch (error) {
//         console.error("Login Error:", error);
//         res.status(500).send("Server error");
//     }
// });


// // @route GET /api/users/profile
// // @desc Get logged-in user's profile (Protected Route)
// // @access Private
// router.get("/profile", protect, async (req, res) => {
//     console.log("🔹 Profile route accessed, user:", req.user);

//     if (!req.user) {
//         return res.status(401).json({ message: "Not authorized, user not found" });
//     }

//     res.json({ success: true, user: req.user });
// });

// module.exports = router;


const express = require("express");
const User = require("../models/Users");
const jwt = require("jsonwebtoken");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// Function to validate mobile number format
const isValidMobile = (mobile) => /^\+91[0-9]{10}$/.test(mobile);

//@route POST /api/users/register
//@desc Register a new user with mobile number
//@access Public
// router.post("/register", async (req, res) => {
//     let { name, mobile, password, email } = req.body;

//     if (!isValidMobile(mobile)) {
//         return res.status(400).json({ message: "Invalid mobile number! Use +91XXXXXXXXXX format." });
//     }

//     try {
//         let user = await User.findOne({ mobile });
//         if (user) return res.status(400).json({ message: "User already exists" });

//         user = new User({
//             name,
//             mobile,
//             password,
//             email: email || undefined,
//             role: req.body.role && ["admin", "customer"].includes(req.body.role) ? req.body.role : "customer"
//         });
//         await user.save();

//         const payload = { user: { id: user._id, role: user.role } };

//         jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "40h" }, (err, token) => {
//             if (err) throw err;
//             res.status(201).json({
//                 user: {
//                     _id: user._id,
//                     name: user.name,
//                     mobile: user.mobile,
//                     email: user.email,
//                     role: user.role,
//                 },
//                 token,
//             });
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send("Server Error");
//     }
// });
//@route POST /api/users/register
router.post("/register", async (req, res) => {
    let { name, mobile, password, email } = req.body;

    // ✅ Add +91 prefix if not present
    if (mobile && !mobile.startsWith("+91")) {
        mobile = "+91" + mobile;
    }

    // ✅ Now validate
    if (!isValidMobile(mobile)) {
        return res.status(400).json({ message: "Invalid mobile number! Use +91XXXXXXXXXX format." });
    }

    try {
        let user = await User.findOne({ mobile });
        if (user) return res.status(400).json({ message: "User already exists" });

        user = new User({
            name,
            mobile,
            password,
            email: email || undefined,
            role: req.body.role && ["admin", "customer"].includes(req.body.role) ? req.body.role : "customer"
        });

        await user.save();

        const payload = { user: { id: user._id, role: user.role } };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "40h" }, (err, token) => {
            if (err) throw err;
            res.status(201).json({
                user: {
                    _id: user._id,
                    name: user.name,
                    mobile: user.mobile,
                    email: user.email,
                    role: user.role,
                },
                token,
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
});


// @route POST /api/users/login
// @desc Authenticate user with mobile number
// @access Public
router.post("/login", async (req, res) => {
    let { mobile, password, guestId } = req.body;

    if (!isValidMobile(mobile)) {
        return res.status(400).json({ message: "Invalid mobile number! Use +91XXXXXXXXXX format." });
    }

    try {
        let user = await User.findOne({ mobile });
        if (!user) return res.status(400).json({ message: "Invalid Credentials" });

        const isMatch = await user.matchPassword(password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        if (guestId) {
            let guestCart = await Cart.findOne({ guestId });
            let userCart = await Cart.findOne({ user: user._id });

            if (guestCart && guestCart.products.length > 0) {
                if (!userCart) {
                    userCart = new Cart({ user: user._id, products: [], totalPrice: 0 });
                }

                guestCart.products.forEach((item) => {
                    const existingProduct = userCart.products.find(
                        (p) => p.productId.toString() === item.productId.toString() && p.size === item.size && p.color === item.color
                    );

                    if (existingProduct) {
                        existingProduct.quantity += item.quantity;
                    } else {
                        userCart.products.push(item);
                    }
                });

                userCart.totalPrice = userCart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
                await userCart.save();
                await Cart.deleteOne({ guestId });
            }
        }

        const payload = { user: { id: user._id, role: user.role } };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "40h" }, (err, token) => {
            if (err) throw err;
            res.json({
                user: {
                    _id: user._id,
                    name: user.name,
                    mobile: user.mobile,
                    email: user.email,
                    role: user.role,
                },
                token,
            });
            localStorage.setItem("token", token);  // Add this line to store the token
        });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).send("Server error");
    }
});

// @route GET /api/users/profile
// @desc Get logged-in user's profile (Protected Route)
// @access Private
router.get("/profile", protect, async (req, res) => {
    try {
        console.log("🔹 Profile route accessed, user:", req.user);

        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        console.error("Profile Fetch Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
