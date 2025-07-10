const express = require("express");
const User = require("../models/Users");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

//@route GET /api/admin/users
//@desc get all users (Admin only)
//@access private/Admin
router.get("/", protect, admin, async (req, res) => {
    try {
        const users = await User.find({}); // ✅ Use `User` instead of `Users`
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"});
    }
});

//@route POST /api/admin/users
//@desc add a new user(admin only)
//@access private/admin
router.post("/", protect, admin, async (req, res) =>{
    const { name, email, password, role } = req.body;

    try {
        let user = await User.findOne({ email });
        if(user) {
            return res.status(400).json({message: "User already exists"});
        }

        user = new User ({
            name,
            mobile: req.body.mobile,
            email,
            password,
            role: role || "customer",
        });

        await user.save();
        res.status(201).json({message: "User created sucessfully", user});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "SERVER ERROR"});
    }
});

//@route PUT /api/admin/users/:id
//@desc Update user into info(admin only)- name, email, and role
//@access private/Admin
router.put("/:id", protect, admin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.role = req.body.role || user.role;
        }
        const updateUser = await user.save();
        res.json({message: "User updated successfully", user: updateUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "SERVER ERROR"});
    }
});


//@route DELETE /api/admin/users/:id
//@desc Delete a user (Admin only)
//@access private/Admin
router.delete("/:id", protect, admin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await user.deleteOne(); // Delete the user from the database

        res.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "SERVER ERROR" });
    }
});



 module.exports = router;