const express = require("express");
const app = express();
require("dotenv").config();
const db = require("./db");
const cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const PORT = process.env.PORT || 3200;

const UserRoutes = require("./routes/userRoutes");
const candidateRoutes = require("./routes/candidateRoutes");

app.get("/", (req, res) => {
  res.send("Voting API is running 🚀");
});

app.use("/user", UserRoutes);
app.use("/candidate", candidateRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Voting App API 🗳️");
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});