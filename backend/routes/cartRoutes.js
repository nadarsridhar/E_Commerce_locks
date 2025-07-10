// const express = require("express");
// const Cart = require("../models/Cart");
// const { protect } = require("../middleware/authMiddleware");

// const router = express.Router();

// // 🛒 GET Cart Items (for user or guest)
// router.get("/", async (req, res) => {
//     try {
//         console.log("📩 GET /api/cart Request received:", req.query);
//         const { userId, guestId } = req.query;
        
//         if (!userId && !guestId) {
//             return res.status(400).json({ message: "User ID or Guest ID is required" });
//         }
        
//         const cart = await Cart.findOne({
//             $or: [
//                 userId ? { userId } : {},
//                 guestId ? { guestId } : {}
//             ]
//         });
        
//         console.log("🛍️ Cart Found:", cart);
//         return res.status(200).json(cart || { products: [] });
//     } catch (error) {
//         console.error("❌ ERROR:", error.message);
//         return res.status(500).json({ message: "Server Error", error: error.message });
//     }
// });

// // // 🛍️ ADD Item to Cart (Guest or Logged-in User)
// // router.post("/", async (req, res) => {
// //     try {
// //         const { userId, guestId, productId, quantity, size, color } = req.body;
// //         if (!productId || !quantity) {
// //             return res.status(400).json({ message: "Product ID and Quantity are required" });
// //         }
        
// //         let cart = await Cart.findOne({
// //             $or: [
// //                 userId ? { userId } : {},
// //                 guestId ? { guestId } : {}
// //             ]
// //         });
        
// //         if (!cart) {
// //             cart = new Cart({
// //                 userId: userId || null,
// //                 guestId: guestId || `guest_${Date.now()}`,
// //                 products: []
// //             });
// //         }

// //         const productIndex = cart.products.findIndex(p => p.productId.toString() === productId && p.size === size && p.color === color);
// //         if (productIndex > -1) {
// //             cart.products[productIndex].quantity += quantity;
// //         } else {
// //             cart.products.push({ productId, quantity, size, color });
// //         }

// //         await cart.save();
// //         console.log("✅ Cart Updated:", cart);
// //         return res.status(200).json(cart);
// //     } catch (error) {
// //         console.error("❌ ERROR:", error.message);
// //         return res.status(500).json({ message: "Server Error", error: error.message });
// //     }
// // });

// // 🛍️ ADD Item to Cart (Guest or Logged-in User)
// router.post("/", async (req, res) => {
//     try {
//         console.log("📩 Add to Cart Request Received:", req.body);

//         const { userId, guestId, productId, quantity, size, color } = req.body;
//         if (!productId || !quantity) {
//             console.log("❌ Missing productId or quantity!");
//             return res.status(400).json({ message: "Product ID and Quantity are required" });
//         }

//         let cart = await Cart.findOne({
//             $or: [
//                 userId ? { userId } : {},
//                 guestId ? { guestId } : {}
//             ]
//         });

//         // ✅ Fix: Cart create hone ke baad bhi product add hona chahiye
//         if (!cart) {
//             console.log("🆕 Creating New Cart...");
//             cart = new Cart({
//                 userId: userId || null,
//                 guestId: guestId || `guest_${Date.now()}`,
//                 products: [], // ✅ Ensure products array exists
//                 totalPrice: 0
//             });
//         }

//         console.log("🔍 Checking Existing Products...");
//         const productIndex = cart.products.findIndex(
//             (p) => p.productId.toString() === productId && p.size === size && p.color === color
//         );

//         if (productIndex > -1) {
//             console.log("🛒 Product Already in Cart, Updating Quantity...");
//             cart.products[productIndex].quantity += quantity;
//         } else {
//             console.log("➕ Adding New Product to Cart...");
//             cart.products.push({
//                 productId,
//                 name: "Product Name", // ✅ Fix: Ensure product name is added
//                 image: "https://dummyimage.com/200x200", // ✅ Fix: Ensure image is added
//                 price: 1000, // ✅ Fix: Ensure price is added
//                 size,
//                 color,
//                 quantity
//             });
//         }

//         cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
//         await cart.save();
//         console.log("✅ Cart Updated Successfully:", cart);
//         return res.status(200).json(cart);
//     } catch (error) {
//         console.error("❌ ERROR Adding to Cart:", error.message);
//         return res.status(500).json({ message: "Server Error", error: error.message });
//     }
// });


// // // 🔄 UPDATE Item Quantity in Cart
// // router.patch("/update", async (req, res) => {
// //     try {
// //         const { userId, guestId, productId, quantity, size, color } = req.body;
// //         if (!productId || !quantity) {
// //             return res.status(400).json({ message: "Product ID and Quantity are required" });
// //         }
        
// //         let cart = await Cart.findOne({
// //             $or: [
// //                 userId ? { userId } : {},
// //                 guestId ? { guestId } : {}
// //             ]
// //         });
        
// //         if (!cart) {
// //             return res.status(404).json({ message: "Cart not found" });
// //         }

// //         const productIndex = cart.products.findIndex(p => p.productId.toString() === productId && p.size === size && p.color === color);
// //         if (productIndex > -1) {
// //             cart.products[productIndex].quantity = quantity;
// //             await cart.save();
// //             return res.status(200).json(cart);
// //         }
// //         return res.status(404).json({ message: "Product not found in cart" });
// //     } catch (error) {
// //         console.error("❌ ERROR:", error.message);
// //         return res.status(500).json({ message: "Server Error", error: error.message });
// //     }
// // });

// // // 🗑️ DELETE Item from Cart
// // router.delete("/remove", async (req, res) => {
// //     try {
// //         const { userId, guestId, productId, size, color } = req.body;
// //         if (!productId) {
// //             return res.status(400).json({ message: "Product ID is required" });
// //         }
        
// //         let cart = await Cart.findOne({
// //             $or: [
// //                 userId ? { userId } : {},
// //                 guestId ? { guestId } : {}
// //             ]
// //         });
        
// //         if (!cart) {
// //             return res.status(404).json({ message: "Cart not found" });
// //         }

// //         cart.products = cart.products.filter(p => !(p.productId.toString() === productId && p.size === size && p.color === color));
// //         await cart.save();
        
// //         return res.status(200).json(cart);
// //     } catch (error) {
// //         console.error("❌ ERROR:", error.message);
// //         return res.status(500).json({ message: "Server Error", error: error.message });
// //     }
// // });

// // 🔄 UPDATE Item Quantity in Cart
// router.patch("/update", async (req, res) => {
//     try {
//         const { userId, guestId, productId, quantity, size, color } = req.body;
//         if (!productId || !quantity) {
//             return res.status(400).json({ message: "Product ID and Quantity are required" });
//         }
        
//         let cart = await Cart.findOne({
//             $or: [
//                 userId ? { userId } : {},
//                 guestId ? { guestId } : {}
//             ]
//         });
        
//         if (!cart) {
//             return res.status(404).json({ message: "Cart not found" });
//         }

//         const productIndex = cart.products.findIndex(p => p.productId.toString() === productId && p.size === size && p.color === color);
//         if (productIndex > -1) {
//             cart.products[productIndex].quantity = quantity;
//             await cart.save();
//             return res.status(200).json(cart);
//         }
//         return res.status(404).json({ message: "Product not found in cart" });
//     } catch (error) {
//         console.error("❌ ERROR:", error.message);
//         return res.status(500).json({ message: "Server Error", error: error.message });
//     }
// });

// // 🗑️ DELETE Item from Cart
// router.delete("/remove", async (req, res) => {
//     try {
//         const { userId, guestId, productId, size, color } = req.body;
//         if (!productId) {
//             return res.status(400).json({ message: "Product ID is required" });
//         }
        
//         let cart = await Cart.findOne({
//             $or: [
//                 userId ? { userId } : {},
//                 guestId ? { guestId } : {}
//             ]
//         });
        
//         if (!cart) {
//             return res.status(404).json({ message: "Cart not found" });
//         }

//         cart.products = cart.products.filter(p => !(p.productId.toString() === productId && p.size === size && p.color === color));
//         await cart.save();
        
//         return res.status(200).json(cart);
//     } catch (error) {
//         console.error("❌ ERROR:", error.message);
//         return res.status(500).json({ message: "Server Error", error: error.message });
//     }
// });


// module.exports = router;

// const express = require("express");
// const Cart = require("../models/Cart");
// const Product = require("../models/Product"); // ✅ Fix: Added Product Model
// const { protect } = require("../middleware/authMiddleware");

// const router = express.Router();

// // 🛍️ ADD Item to Cart (Guest or Logged-in User)
// router.post("/", async (req, res) => {
//     try {
//         console.log("📩 Add to Cart Request Received:", req.body);

//         const { userId, guestId, productId, quantity, size, color } = req.body;
//         if (!productId || !quantity) {
//             return res.status(400).json({ message: "Product ID and Quantity are required" });
//         }

//         let cart = await Cart.findOne({
//             $or: [
//                 userId ? { userId } : {},
//                 guestId ? { guestId } : {}
//             ]
//         });

//         if (!cart) {
//             console.log("🆕 Creating New Cart...");
//             cart = new Cart({
//                 userId: userId || null,
//                 guestId: guestId || `guest_${Date.now()}`,
//                 products: [],
//                 totalPrice: 0
//             });
//         }

//         console.log("🔍 Checking Existing Products...");
//         const productIndex = cart.products.findIndex(
//             (p) => p.productId.toString() === productId && p.size === size && p.color === color
//         );

//         // ✅ Fix: Fetch Product Details from Database
//         const productData = await Product.findById(productId);
//         if (!productData) {
//             return res.status(404).json({ message: "Product not found" });
//         }

//         if (productIndex > -1) {
//             console.log("🛒 Product Already in Cart, Updating Quantity...");
//             cart.products[productIndex].quantity += quantity;
//         } else {
//             console.log("➕ Adding New Product to Cart...");
//             cart.products.push({
//                 productId,
//                 name: productData.name, // ✅ Fix: Correct Product Name
//                 image: productData.images?.[0]?.url || "", // ✅ Fix: Correct Image
//                 price: productData.price, // ✅ Fix: Correct Price
//                 size,
//                 color,
//                 quantity
//             });
//         }

//         cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
//         await cart.save();
//         console.log("✅ Cart Updated Successfully:", cart);
//         return res.status(200).json(cart);
//     } catch (error) {
//         console.error("❌ ERROR Adding to Cart:", error.message);
//         return res.status(500).json({ message: "Server Error", error: error.message });
//     }
// });

// module.exports = router;

// const express = require("express");
// const Cart = require("../models/Cart");
// const Product = require("../models/Product"); // ✅ Added Product Model
// const { protect } = require("../middleware/authMiddleware");

// const router = express.Router();

// // 🛒 GET Cart Items (for user or guest)
// router.get("/", async (req, res) => {
//     try {
//         console.log("📩 GET /api/cart Request received:", req.query);
//         const { userId, guestId } = req.query;

//         if (!userId && !guestId) {
//             return res.status(400).json({ message: "User ID or Guest ID is required" });
//         }

//         let cart = await Cart.findOne({
//             $or: [
//                 userId ? { user: userId } : {},  // ✅ Fix: Correct field mapping
//                 guestId ? { guestId } : {}
//             ]
//         });

//         if (!cart) {
//             console.log("❌ No Cart Found.");
//             return res.status(404).json({ message: "Cart not found" });
//         }

//         console.log("🛍️ Cart Found:", cart);
//         return res.status(200).json(cart);
//     } catch (error) {
//         console.error("❌ ERROR:", error.message);
//         return res.status(500).json({ message: "Server Error", error: error.message });
//     }
// });

// // 🛍️ ADD Item to Cart (Guest or Logged-in User)
// router.post("/", async (req, res) => {
//     try {
//         console.log("📩 Add to Cart Request Received:", req.body);

//         const { userId, guestId, productId, quantity, size, color } = req.body;
//         if (!productId || !quantity) {
//             return res.status(400).json({ message: "Product ID and Quantity are required" });
//         }

//         let cart = await Cart.findOne({
//             $or: [
//                 userId ? { user: userId } : {},
//                 guestId ? { guestId } : {}
//             ]
//         });

//         if (!cart) {
//             console.log("🆕 Creating New Cart...");
//             cart = new Cart({
//                 user: userId || null,
//                 guestId: guestId || `guest_${Date.now()}`,
//                 products: [],
//                 totalPrice: 0
//             });
//         }

//         console.log("🔍 Checking Existing Products...");
//         const productIndex = cart.products.findIndex(
//             (p) => p.productId.toString() === productId && p.size === size && p.color === color
//         );

//         // ✅ Fetch Product Details from Database
//         const productData = await Product.findById(productId);
//         if (!productData) {
//             return res.status(404).json({ message: "Product not found" });
//         }

//         if (productIndex > -1) {
//             console.log("🛒 Product Already in Cart, Updating Quantity...");
//             cart.products[productIndex].quantity += quantity;
//         } else {
//             console.log("➕ Adding New Product to Cart...");
//             cart.products.push({
//                 productId,
//                 name: productData.name, // ✅ Fix: Correct Product Name
//                 image: productData.images?.[0]?.url || "", // ✅ Fix: Correct Image
//                 price: productData.price, // ✅ Fix: Correct Price
//                 size,
//                 color,
//                 quantity
//             });
//         }

//         cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
//         await cart.save();
//         console.log("✅ Cart Updated Successfully:", cart);
//         return res.status(200).json(cart);
//     } catch (error) {
//         console.error("❌ ERROR Adding to Cart:", error.message);
//         return res.status(500).json({ message: "Server Error", error: error.message });
//     }
// });

// module.exports = router;

// const express = require("express");
// const Cart = require("../models/Cart");
// const Product = require("../models/Product");
// const router = express.Router();

// // 🛒 GET Cart Items (Guest or User)
// router.get("/", async (req, res) => {
//     try {
//         console.log("📩 GET /api/cart Request received:", req.query);
//         const { userId, guestId } = req.query;

//         if (!userId && !guestId) {
//             return res.status(400).json({ message: "User ID or Guest ID is required" });
//         }

//         let cart = await Cart.findOne({
//             $or: [
//                 userId ? { user: userId } : {},
//                 guestId ? { guestId } : {}
//             ]
//         });

//         if (!cart) {
//             return res.status(200).json({ products: [] });
//         }

//         console.log("🛍️ Cart Found:", cart);
//         return res.status(200).json(cart);
//     } catch (error) {
//         console.error("❌ ERROR Fetching Cart:", error.message);
//         return res.status(500).json({ message: "Server Error", error: error.message });
//     }
// });

// // 🛍️ ADD Item to Cart (Guest or Logged-in User)
// router.post("/", async (req, res) => {
//     try {
//         console.log("📩 Add to Cart Request Received:", req.body);
//         const { userId, guestId, productId, quantity, size, color } = req.body;

//         if (!productId || !quantity) {
//             return res.status(400).json({ message: "Product ID and Quantity are required" });
//         }

//         let cart = await Cart.findOne({
//             $or: [
//                 userId ? { user: userId } : {},
//                 guestId ? { guestId } : {}
//             ]
//         });

//         if (!cart) {
//             cart = new Cart({
//                 user: userId || null,
//                 guestId: guestId || `guest_${Date.now()}`,
//                 products: [],
//                 totalPrice: 0
//             });
//         }

//         // ✅ Fetch Product Details from Database
//         const productData = await Product.findById(productId);
//         if (!productData) {
//             return res.status(404).json({ message: "Product not found" });
//         }

//         const productIndex = cart.products.findIndex(
//             (p) => p.productId.toString() === productId && p.size === size && p.color === color
//         );

//         if (productIndex > -1) {
//             cart.products[productIndex].quantity += quantity;
//         } else {
//             cart.products.push({
//                 productId: productData._id, // Fix: Ensure it's stored correctly
//                 name: productData.name,
//                 image: productData.images?.[0]?.url || "",
//                 price: productData.price,
//                 size,
//                 color,
//                 quantity
//             });
//         }

//         cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
//         await cart.save();
//         return res.status(200).json(cart);
//     } catch (error) {
//         console.error("❌ ERROR Adding to Cart:", error.message);
//         return res.status(500).json({ message: "Server Error", error: error.message });
//     }
// });

// // 🔄 UPDATE Item Quantity in Cart
// router.patch("/update", async (req, res) => {
//     try {
//         const { userId, guestId, productId, quantity, size, color } = req.body;
//         if (!productId || !quantity) {
//             return res.status(400).json({ message: "Product ID and Quantity are required" });
//         }

//         let cart = await Cart.findOne({
//             $or: [
//                 userId ? { user: userId } : {},
//                 guestId ? { guestId } : {}
//             ]
//         });

//         if (!cart) {
//             return res.status(404).json({ message: "Cart not found" });
//         }

//         // const productIndex = cart.products.findIndex(
//         //     (p) => p.productId?.toString() === productData._id.toString() && p.size === size && p.color === color
//         // );
//         const productIndex = cart.products.findIndex(
//             (p) => p.productId.toString() === productId &&
//                   (p.size === size || (!p.size && !size)) &&
//                   (p.color === color || (!p.color && !color))
//         );
        

//         if (productIndex > -1) {
//             cart.products[productIndex].quantity = quantity;
//             await cart.save();
//             return res.status(200).json(cart);
//         }
//         return res.status(404).json({ message: "Product not found in cart" });
//     } catch (error) {
//         console.error("❌ ERROR:", error.message);
//         return res.status(500).json({ message: "Server Error", error: error.message });
//     }
// });

// // 🗑️ DELETE Item from Cart
// router.delete("/remove", async (req, res) => {
//     try {
//         const { userId, guestId, productId, size, color } = req.body;
//         if (!productId) {
//             return res.status(400).json({ message: "Product ID is required" });
//         }

//         let cart = await Cart.findOne({
//             $or: [
//                 userId ? { user: userId } : {},
//                 guestId ? { guestId } : {}
//             ]
//         });

//         if (!cart) {
//             return res.status(404).json({ message: "Cart not found" });
//         }

//         cart.products = cart.products.filter(
//             (p) => !(p.productId.toString() === productId && p.size === size && p.color === color)
//         );

//         cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
//         await cart.save();

//         return res.status(200).json(cart);
//     } catch (error) {
//         console.error("❌ ERROR:", error.message);
//         return res.status(500).json({ message: "Server Error", error: error.message });
//     }
// });

// module.exports = router;

// const express = require("express");
// const mongoose = require("mongoose");
// const Cart = require("../models/Cart");
// const Product = require("../models/Product");

// const router = express.Router();

// // 🛒 GET Cart Items (Guest or User)
// router.get("/", async (req, res) => {
//     try {
//         console.log("📩 GET /api/cart Request received:", req.query);
//         const { userId, guestId } = req.query;

//         if (!userId && !guestId) {
//             return res.status(400).json({ message: "User ID or Guest ID is required" });
//         }

//         let cart = await Cart.findOne({
//             $or: [
//                 userId ? { user: userId } : {},
//                 guestId ? { guestId } : {}
//             ]
//         });

//         if (!cart) {
//             console.log("❌ Cart Not Found!");
//             return res.status(200).json({ products: [] });
//         }

//         console.log("🛍️ Cart Found:", cart);
//         return res.status(200).json(cart);
//     } catch (error) {
//         console.error("❌ ERROR Fetching Cart:", error.message);
//         return res.status(500).json({ message: "Server Error", error: error.message });
//     }
// });

// // 🛍️ ADD Item to Cart (Guest or Logged-in User)
// router.post("/", async (req, res) => {
//     try {
//         console.log("📩 Add to Cart Request Received:", req.body);
//         let { userId, guestId, productId, quantity, size, color } = req.body;

//         if (!mongoose.Types.ObjectId.isValid(productId)) {
//             return res.status(400).json({ message: "Invalid Product ID" });
//         }

//         if (!productId || !quantity) {
//             return res.status(400).json({ message: "Product ID and Quantity are required" });
//         }

//         let cart = await Cart.findOne({
//             $or: [
//                 userId ? { user: userId } : {},
//                 guestId ? { guestId } : {}
//             ]
//         });

//         // ✅ If cart does not exist, create a new one
//         if (!cart) {
//             console.log("🆕 Creating New Cart...");
//             cart = new Cart({
//                 user: userId || null,
//                 guestId: guestId || `guest_${Date.now()}`,
//                 products: [],
//                 totalPrice: 0
//             });
//         }

//         // ✅ Fetch Product Details from Database
//         const productData = await Product.findById(productId);
//         if (!productData) {
//             return res.status(404).json({ message: "Product not found" });
//         }

//         // ✅ Check if product already exists in cart
//         const productIndex = cart.products.findIndex(
//             (p) => p.productId.toString() === productId && p.size === size && p.color === color
//         );

//         if (productIndex > -1) {
//             console.log("🛒 Product Already in Cart, Updating Quantity...");
//             cart.products[productIndex].quantity += quantity;
//         } else {
//             console.log("➕ Adding New Product to Cart...");
//             cart.products.push({
//                 productId: productData._id,
//                 name: productData.name,
//                 image: productData.images?.[0]?.url || "",
//                 price: productData.price,
//                 size,
//                 color,
//                 quantity
//             });
//         }

//         // ✅ Update total price
//         cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
//         await cart.save();

//         console.log("✅ Cart Updated Successfully:", cart);
//         return res.status(200).json(cart);
//     } catch (error) {
//         console.error("❌ ERROR Adding to Cart:", error.message);
//         return res.status(500).json({ message: "Server Error", error: error.message });
//     }
// });

// // 🔄 UPDATE Item Quantity in Cart
// router.patch("/update", async (req, res) => {
//     try {
//         const { userId, guestId, productId, quantity, size, color } = req.body;
//         if (!productId || !quantity) {
//             return res.status(400).json({ message: "Product ID and Quantity are required" });
//         }

//         let cart = await Cart.findOne({
//             $or: [
//                 userId ? { user: userId } : {},
//                 guestId ? { guestId } : {}
//             ]
//         });

//         if (!cart) {
//             return res.status(404).json({ message: "Cart not found" });
//         }

//         const productIndex = cart.products.findIndex(
//             (p) => p.productId.toString() === productId && p.size === size && p.color === color
//         );

//         if (productIndex > -1) {
//             cart.products[productIndex].quantity = quantity;
//             await cart.save();
//             return res.status(200).json(cart);
//         }
//         return res.status(404).json({ message: "Product not found in cart" });
//     } catch (error) {
//         console.error("❌ ERROR:", error.message);
//         return res.status(500).json({ message: "Server Error", error: error.message });
//     }
// });

// // 🗑️ DELETE Item from Cart
// router.delete("/remove", async (req, res) => {
//     try {
//         const { userId, guestId, productId, size, color } = req.body;
//         if (!productId) {
//             return res.status(400).json({ message: "Product ID is required" });
//         }

//         let cart = await Cart.findOne({
//             $or: [
//                 userId ? { user: userId } : {},
//                 guestId ? { guestId } : {}
//             ]
//         });

//         if (!cart) {
//             return res.status(404).json({ message: "Cart not found" });
//         }

//         cart.products = cart.products.filter(
//             (p) => !(p.productId.toString() === productId && p.size === size && p.color === color)
//         );

//         cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
//         await cart.save();

//         return res.status(200).json(cart);
//     } catch (error) {
//         console.error("❌ ERROR:", error.message);
//         return res.status(500).json({ message: "Server Error", error: error.message });
//     }
// });

// module.exports = router;


// const express = require("express");
// const Cart = require("../models/Cart");
// const Product = require("../models/Product");
// const router = express.Router();

// // 🛒 GET Cart Items (Guest or User)
// router.get("/", async (req, res) => {
//     try {
//         console.log("📩 GET /api/cart Request received:", req.query);
//         const { userId, guestId } = req.query;

//         if (!userId && !guestId) {
//             return res.status(400).json({ message: "User ID or Guest ID is required" });
//         }

//         let cart = await Cart.findOne({
//             $or: [
//                 userId ? { user: userId } : {},
//                 guestId ? { guestId } : {}
//             ]
//         });

//         if (!cart) {
//             return res.status(200).json({ products: [] });
//         }

//         console.log("🛍️ Cart Found:", cart);
//         return res.status(200).json(cart);
//     } catch (error) {
//         console.error("❌ ERROR Fetching Cart:", error.message);
//         return res.status(500).json({ message: "Server Error", error: error.message });
//     }
// });

// // 🛍️ ADD Item to Cart (Guest or Logged-in User)
// router.post("/", async (req, res) => {
//     try {
//         console.log("📩 Add to Cart Request Received:", req.body);
//         const { userId, guestId, productId, quantity, size, color } = req.body;

//         if (!productId || !quantity) {
//             return res.status(400).json({ message: "Product ID and Quantity are required" });
//         }

//         let cart = await Cart.findOne({
//             $or: [
//                 userId ? { user: userId } : {},
//                 guestId ? { guestId } : {}
//             ]
//         });

//         if (!cart) {
//             cart = new Cart({
//                 user: userId || null,
//                 guestId: guestId || `guest_${Date.now()}`,
//                 products: [],
//                 totalPrice: 0
//             });
//         }

//         // ✅ Fetch Product Details from Database
//         const productData = await Product.findById(productId);
//         if (!productData) {
//             return res.status(404).json({ message: "Product not found" });
//         }

//         console.log("🔍 Checking Existing Products...");
//         const productIndex = cart.products.findIndex(
//             (p) => p.productId.toString() === productId && 
//                   (p.size === size || (!p.size && !size)) &&
//                   (p.color === color || (!p.color && !color))
//         );

//         if (productIndex > -1) {
//             console.log("🛒 Product Already in Cart, Updating Quantity...");
//             cart.products[productIndex].quantity += quantity;
//         } else {
//             console.log("➕ Adding New Product to Cart...");
//             cart.products.push({
//                 productId: productData._id,
//                 name: productData.name,
//                 image: productData.images?.[0]?.url || "",
//                 price: productData.price,
//                 size,
//                 color,
//                 quantity
//             });
//         }

//         cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
//         await cart.save();
//         console.log("✅ Cart Updated Successfully:", cart);
//         return res.status(200).json(cart);
//     } catch (error) {
//         console.error("❌ ERROR Adding to Cart:", error.message);
//         return res.status(500).json({ message: "Server Error", error: error.message });
//     }
// });

// // 🔄 UPDATE Item Quantity in Cart
// router.patch("/update", async (req, res) => {
//     try {
//         const { userId, guestId, productId, quantity, size, color } = req.body;
//         if (!productId || !quantity) {
//             return res.status(400).json({ message: "Product ID and Quantity are required" });
//         }

//         let cart = await Cart.findOne({
//             $or: [
//                 userId ? { user: userId } : {},
//                 guestId ? { guestId } : {}
//             ]
//         });

//         if (!cart) {
//             return res.status(404).json({ message: "Cart not found" });
//         }

//         const productIndex = cart.products.findIndex(
//             (p) => p.productId.toString() === productId &&
//                   (p.size === size || (!p.size && !size)) &&
//                   (p.color === color || (!p.color && !color))
//         );

//         if (productIndex > -1) {
//             cart.products[productIndex].quantity = quantity;
//             await cart.save();
//             return res.status(200).json(cart);
//         }
//         return res.status(404).json({ message: "Product not found in cart" });
//     } catch (error) {
//         console.error("❌ ERROR:", error.message);
//         return res.status(500).json({ message: "Server Error", error: error.message });
//     }
// });

// // 🗑️ DELETE Item from Cart
// router.delete("/remove", async (req, res) => {
//     try {
//         const { userId, guestId, productId, size, color } = req.body;
//         if (!productId) {
//             return res.status(400).json({ message: "Product ID is required" });
//         }

//         let cart = await Cart.findOne({
//             $or: [
//                 userId ? { user: userId } : {},
//                 guestId ? { guestId } : {}
//             ]
//         });

//         if (!cart) {
//             return res.status(404).json({ message: "Cart not found" });
//         }

//         cart.products = cart.products.filter(
//             (p) => !(p.productId.toString() === productId && p.size === size && p.color === color)
//         );

//         cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
//         await cart.save();

//         return res.status(200).json(cart);
//     } catch (error) {
//         console.error("❌ ERROR:", error.message);
//         return res.status(500).json({ message: "Server Error", error: error.message });
//     }
// });

// module.exports = router;


const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const router = express.Router();

// 🛒 GET Cart Items (Guest or User)
router.get("/", async (req, res) => {
    try {
        console.log("📩 GET /api/cart Request received:", req.query);
        const { userId, guestId } = req.query;

        if (!userId && !guestId) {
            return res.status(400).json({ message: "User ID or Guest ID is required" });
        }

        let cart = await Cart.findOne({
            $or: [
                userId ? { user: userId } : {},
                guestId ? { guestId } : {}
            ]
        });

        if (!cart) {
            return res.status(200).json({ products: [] });
        }

        console.log("🛍️ Cart Found:", cart);
        return res.status(200).json(cart);
    } catch (error) {
        console.error("❌ ERROR Fetching Cart:", error.message);
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
});

// 🛍️ ADD Item to Cart (Guest or Logged-in User)
router.post("/", async (req, res) => {
    try {
        console.log("📩 Add to Cart Request Received:", req.body);
        const { userId, guestId, productId, quantity, size, color } = req.body;

        if (!productId || !quantity) {
            return res.status(400).json({ message: "Product ID and Quantity are required" });
        }

        let cart = await Cart.findOne({
            $or: [
                userId ? { user: userId } : {},
                guestId ? { guestId } : {}
            ]
        });

        if (!cart) {
            cart = new Cart({
                user: userId || null,
                guestId: guestId || `guest_${Date.now()}`,
                products: [],
                totalPrice: 0
            });
        }

        // ✅ Fetch Product Details from Database
        const productData = await Product.findById(productId);
        if (!productData) {
            return res.status(404).json({ message: "Product not found" });
        }

        console.log("🔍 Checking Existing Products...");
        const productIndex = cart.products.findIndex(
            (p) => p.productId.toString() === productId && 
                  (p.size === size || (!p.size && !size)) &&
                  (p.color === color || (!p.color && !color))
        );

        if (productIndex > -1) {
            console.log("🛒 Product Already in Cart, Updating Quantity...");
            cart.products[productIndex].quantity += quantity;
        } else {
            console.log("➕ Adding New Product to Cart...");
            cart.products.push({
                productId: productData._id,
                name: productData.name,
                image: productData.images?.[0]?.url || "",
                price: productData.price,
                size,
                color,
                quantity
            });
        }

        cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
        await cart.save();
        console.log("✅ Cart Updated Successfully:", cart);
        return res.status(200).json(cart);
    } catch (error) {
        console.error("❌ ERROR Adding to Cart:", error.message);
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
});

// 🔄 UPDATE Item Quantity in Cart
router.patch("/update", async (req, res) => {
    try {
        const { userId, guestId, productId, quantity, size, color } = req.body;
        if (!productId || !quantity) {
            return res.status(400).json({ message: "Product ID and Quantity are required" });
        }

        let cart = await Cart.findOne({
            $or: [
                userId ? { user: userId } : {},
                guestId ? { guestId } : {}
            ]
        });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const productIndex = cart.products.findIndex(
            (p) => p.productId.toString() === productId &&
                  (p.size === size || (!p.size && !size)) &&
                  (p.color === color || (!p.color && !color))
        );

        if (productIndex > -1) {
            cart.products[productIndex].quantity = quantity;
            cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
            await cart.save();
            return res.status(200).json(cart);
        }
        return res.status(404).json({ message: "Product not found in cart" });
    } catch (error) {
        console.error("❌ ERROR:", error.message);
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
});

// 🗑️ DELETE Item from Cart
router.delete("/remove", async (req, res) => {
    try {
        const { userId, guestId, productId, size, color } = req.body;
        if (!productId) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        let cart = await Cart.findOne({
            $or: [
                userId ? { user: userId } : {},
                guestId ? { guestId } : {}
            ]
        });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        cart.products = cart.products.filter(
            (p) => !(p.productId.toString() === productId && p.size === size && p.color === color)
        );

        cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
        await cart.save();

        return res.status(200).json(cart);
    } catch (error) {
        console.error("❌ ERROR:", error.message);
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
});

module.exports = router;
