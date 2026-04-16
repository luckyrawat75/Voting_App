const mongoose = require("mongoose");
require("dotenv").config();

const mongoURL = process.env.MONGODB_URL;

// ✅ Just connect without options
mongoose.connect(mongoURL);

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Connected to database");
});

db.on("error", (err) => {
  console.log("Error connecting to database:", err);
});

module.exports = db;