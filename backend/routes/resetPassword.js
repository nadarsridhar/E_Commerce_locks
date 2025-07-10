// const express = require("express");
// const bcrypt = require("bcryptjs");
// const User = require("../models/Users"); // ✅ Model ka path sahi check karna
// const router = express.Router();

// router.post("/reset-password", async (req, res) => {
//     const { mobile, newPassword } = req.body; // ⬅️ "phoneNumber" ki jagah "mobile" use karo

//     if (!mobile || !newPassword) {
//         return res.status(400).json({ message: "Mobile number and new password are required!" });
//     }

//     try {
//         // ✅ Find user by "mobile"
//         const user = await User.findOne({ mobile }); // ⬅️ Ye line fix ki

//         if (!user) {
//             return res.status(404).json({ message: "User not found!" });
//         }

//         // ✅ Hash the new password
//         const salt = await bcrypt.genSalt(10);
//         user.password = await bcrypt.hash(newPassword, salt);

//         // ✅ Save updated password
//         await user.save();

//         return res.status(200).json({ message: "Password reset successfully!" });

//     } catch (error) {
//         return res.status(500).json({ message: "Something went wrong!", error: error.message });
//     }
// });

// module.exports = router;  // ✅ Router export properly

const express = require("express");
const User = require("../models/Users"); // ✅ Ensure this path is correct
const router = express.Router();

router.post("/reset-password", async (req, res) => {
    const { mobile, newPassword } = req.body;

    // ✅ Input validation
    if (!mobile || !newPassword) {
        return res.status(400).json({ message: "Mobile number and new password are required!" });
    }

    try {
        // ✅ Find user by mobile number
        const user = await User.findOne({ mobile });

        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        // ✅ Assign the plain password, let the schema middleware handle hashing
        user.password = newPassword;

        // ✅ Save the updated user – `pre('save')` in schema will hash the password correctly
        await user.save();

        return res.status(200).json({ message: "Password reset successfully!" });

    } catch (error) {
        console.error("Reset password error:", error);
        return res.status(500).json({ message: "Something went wrong!", error: error.message });
    }
});

module.exports = router;
