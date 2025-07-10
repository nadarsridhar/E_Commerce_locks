const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const User = require("./models/Users");
const Cart = require("./models/Cart");

const products = require("./Data/products");

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB connected successfully"))
    .catch((err) => {
        console.error("❌ MongoDB connection failed:", err);
        process.exit(1);
    });

// Function to seed data
const seedData = async () => {
    try {
        // Clear existing data
        await Product.deleteMany();
        await User.deleteMany();
        await Cart.deleteMany();

        // Create a default admin user
        const createUser = await User.create({
            name: "Admin123 ",
            email: "admin123@example.com",
            password: "Admin@123",
            role: "admin",
            mobile: "+918080390855"
        });

        // Assign the default user ID to each product
        const userID = createUser._id;

        const sampleProducts = products.map((product) => {
            return { ...product, user: userID };
        });

        // Insert the products into the database
        await Product.insertMany(sampleProducts);

        console.log("✅ Product data seeded successfully!");
        process.exit();
    } catch (error) {
        console.error("❌ Error seeding the data:", error);
        process.exit(1);
    }
};

// Run the function
seedData();
