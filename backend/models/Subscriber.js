

const mongoose = require("mongoose");

const subscriberSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    subscribedAt: {  // ✅ `subscribeAt` ki jagah `subscribedAt` likha
        type: Date,
        default: Date.now,
    },
});

const Subscriber = mongoose.model("Subscriber", subscriberSchema);
module.exports = Subscriber;
