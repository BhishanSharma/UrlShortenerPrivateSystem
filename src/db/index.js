const mongoose = require("mongoose");

const connection = async () => {
    try {
        await mongoose.connect(process.env.MONG_URI);
        console.log("✅ MongoDB connected successfully");
    } catch (err) {
        console.error("❌ MongoDB connection error:", err.message);
        process.exit(1);
    }
};

module.exports = { connection };
