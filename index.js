const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3000;
const DB_URL = process.env.MONGO_URL;

function connectWithRetry() {
  console.log("Trying to connect to MongoDB...");

  mongoose
    .connect(DB_URL)
    .then(() => console.log("MongoDB Connected Successfully 🚀"))
    .catch((err) => {
      console.log("MongoDB Connection Error ❌", err.message);
      console.log("Retrying in 5 seconds...\n");
      setTimeout(connectWithRetry, 5000);
    });
}

// Start trying to connect
connectWithRetry();

app.get("/", (req, res) => {
  res.send("Hello from Docker Compose setup! 🚀");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
