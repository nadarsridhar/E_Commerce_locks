const express = require("express");
const client = require("../twilio"); 
const router = express.Router();

router.post("/send-otp", async (req, res) => {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
        return res.status(400).json({ message: "Phone number is required!" });
    }

    try {
        const otpResponse = await client.verify.v2.services(process.env.TWILIO_SERVICE_SID)
            .verifications.create({
                to: `${phoneNumber}`,
                channel: "sms"
            });

        res.status(200).json({ message: "OTP sent successfully!", sid: otpResponse.sid });
    } catch (error) {
        res.status(500).json({ message: "Error sending OTP", error: error.message });
    }
});

module.exports = router;  // ✅ Router export properly
