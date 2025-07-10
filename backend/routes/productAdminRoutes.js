const express = require("express");
const Product = require("../models/Product");
const { protect , admin } = require("../middleware/authMiddleware");

const router = express.Router();

//@route GET /api/admin/products
//@decs get all products (admin only)
//@access private/Admin
router.get("/", protect, admin, async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"});
    }
});

// @route PUT /api/admin/products/:id
// @desc Update product by ID (admin only)
// @access Private/Admin
router.put("/:id", protect, admin, async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
  
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      const {
        name,
        description,
        price,
        countInStock,
        sku,
        category,
        brand,
        colors,
        collections,
        material,
        gender,
        images,
      } = req.body;
  
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.countInStock = countInStock || product.countInStock;
      product.sku = sku || product.sku;
      product.category = category || product.category;
      product.brand = brand || product.brand;
      product.colors = colors || product.colors;
      product.collections = collections || product.collections;
      product.material = material || product.material;
      product.gender = gender || product.gender;
      product.images = images || product.images;
  
      const updatedProduct = await product.save();
      res.json({ message: "Product updated successfully", product: updatedProduct });
  
    } catch (error) {
      console.error("Update error:", error);
      res.status(500).json({ message: "Server error while updating product" });
    }
  });
  

module.exports = router;