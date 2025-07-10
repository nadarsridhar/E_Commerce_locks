const express = require("express");
const jwt = require("jsonwebtoken");
const client = require("../twilio");
const router = express.Router();

router.post("/verify-otp", async (req, res) => {
    const { phoneNumber, otpCode } = req.body;

    if (!phoneNumber || !otpCode) {
        return res.status(400).json({ message: "Phone number and OTP code are required!" });
    }

    try {
        const verifyResponse = await client.verify.v2.services(process.env.TWILIO_SERVICE_SID)
            .verificationChecks.create({
                to: `+${phoneNumber}`,
                code: otpCode
            });

        if (verifyResponse.status === "approved") {
            const resetToken = jwt.sign({ phoneNumber }, process.env.JWT_SECRET, { expiresIn: "15m" });

            return res.status(200).json({
                message: "OTP verified successfully!",
                resetToken
            });
        } else {
            return res.status(400).json({ message: "Invalid OTP!" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Error verifying OTP", error: error.message });
    }
});

module.exports = router; // ✅ Router export properly
