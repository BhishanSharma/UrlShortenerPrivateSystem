const shortenUrl = async (req, res) => {
    const body = req.body;

    if (body.message) {
        const userId = body.message.chat.id;
        const actualUrl = body.message.text;

        const newUrl = crypto.randomBytes(6).toString("hex");
        const shortUrl = `${BASE_URL}/${newUrl}`;

        try {
            await Url.create({
                chatid: userId.toString(),
                actualUrl,
                newUrl,
            });

            // console.log("User ID:", userId);
            // console.log("URL:", actualUrl);
            // console.log("New Url:", newUrl);

            // console.log("TELEGRAM_BOT_TOKEN:", TELEGRAM_BOT_TOKEN);
            const message = `✅ Your short URL is:\n${shortUrl}`;
            await sendMessage(userId, message);

            res.status(201).send(`Short URL created: ${newUrl}`);
        } catch (err) {
            console.error("Error saving to DB:", err.message);
            res.status(500).send("Internal Server Error");
        }
    } else {
        res.status(400).send("No message in request");
    }
};

module.exports = {
    shortenUrl,
};