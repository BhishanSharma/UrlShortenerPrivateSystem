const { sendMessage, sendPhoto } = require("./bot.services");

const photoQueue = [];
const dataQueue = [];

const addPhotoToQueue = (photo, code, userAgent) => {
    photoQueue.push({ photo, code, userAgent });    
};

const addDataToQueue = (message, code, userAgent) => {
    dataQueue.push({ message, code, userAgent });
};

const processPhotoQueue = async () => {
    while (photoQueue.length > 0) {
        const { photo, code, userAgent } = photoQueue.shift();

        try {
            const urlRecord = await Url.findOne({ newUrl: code });
            if (!urlRecord) {
                console.warn(`URL record not found for code: ${code}`);
                continue;
            }

            sendPhoto(urlRecord.chatid, photo, userAgent);

            console.log("✅ Photo sent from queue.");
        } catch (err) {
            console.log("❌ Error sending photo from queue:", err.message);
        }
    }
};

const processDataQueue = async () => {
    while (dataQueue.length > 0) {
        const { message, code, userAgent } = dataQueue.shift(); // FIFO (First In, First Out)

        try {
            const urlRecord = await Url.findOne({ newUrl: code });
            if (!urlRecord) {
                console.warn(`URL record not found for code: ${code}`);
                continue;
            }

            await sendMessage(urlRecord.chatid, message);

            console.log("✅ Data sent to Telegram from queue.");
        } catch (err) {
            console.log("❌ Error sending data from queue:", err.message);
        }
    }
};

module.exports = {
    processPhotoQueue,
    processDataQueue,
    addPhotoToQueue,
    addDataToQueue
};