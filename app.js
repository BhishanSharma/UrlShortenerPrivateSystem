require("dotenv").config();
const db = require("./src/db/index.js");
const port = process.env.PORT || 4000;
const app = require("./src/express.js");
const { processPhotoQueue, processDataQueue } = require("./src/services/queue.services.js");

db.connection()
  .then(() => {
    app.listen(port, () => {
      console.log(`✅ Server is listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to start server due to DB connection error:", err.message);
    process.exit(1);
  });

setInterval(processPhotoQueue, 15000);
setInterval(processDataQueue, 15000);