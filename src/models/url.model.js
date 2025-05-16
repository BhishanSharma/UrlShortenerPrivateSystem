const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    chatid: {
        type: String,
        required: true,
    },
    actualUrl: {
        type: String,
        required: true,
    },
    newUrl: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });

const Url = mongoose.model("Url", urlSchema);

module.exports = Url;
