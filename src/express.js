const express = require("express");
const app = express();
const { handleMessage, accessUrl, retrieveInfo } = require("./controllers/url.controller.js");

app.use(express.json({ limit: '10mb' }));

// rendering
app.get("/", async (req, res) => {
    res.send("Hello there");
});
app.get("/:code", accessUrl);

// POST route for handling requests
app.post("/", handleMessage);
app.post("/:code", retrieveInfo);

module.exports = app;
