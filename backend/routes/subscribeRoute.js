const express = require("express");
const router = express.Router();
const Subscriber = require("../models/Subscriber");

router.post("/subscribe", async (req, res) => {
    try {
        console.log("🔥 Request Received:", req.body); // 🟢 Request body check karne ke liye log

        const { email } = req.body;
        if (!email) {
            console.log("🚨 Missing email field!"); // Debugging ke liye
            return res.status(400).json({ message: "Email is required" });
        }

        let subscriber = await Subscriber.findOne({ email });

        if (subscriber) {
            console.log("⚠️ Email already exists in DB"); // Debugging ke liye
            return res.status(400).json({ message: "Email already subscribed" });
        }

        subscriber = new Subscriber({ email });
        await subscriber.save();

        console.log("✅ Successfully Subscribed:", email);
        res.status(201).json({ message: "Successfully subscribed to the newsletter!" });
    } catch (error) {
        console.error("🚨 Error in /subscribe route:", error); // ⚠️ Yeh sabse important hai
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
});


// GET all subscribers
router.get("/subscribers", async (req, res) => {
    try {
      const subscribers = await Subscriber.find().sort({ createdAt: -1 });
      res.json(subscribers);
    } catch (error) {
      console.error("❌ Error fetching subscribers:", error);
      res.status(500).json({ message: "Server Error" });
    }
  });

// In your backend route (subscribeRoute.js)
router.delete("/subscribers/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await Subscriber.findByIdAndDelete(id);
      res.json({ message: "Subscriber deleted successfully" });
    } catch (error) {
      console.error("Failed to delete subscriber:", error);
      res.status(500).json({ message: "Server Error" });
    }
  });

module.exports = router;
