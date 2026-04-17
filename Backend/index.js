require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = require("./db");

const PORT = process.env.PORT || 3000;

const UserRoutes = require("./routes/userRoutes");
const candidateRoutes = require("./routes/candidateRoutes");

app.get("/", (req, res) => {
  res.send("Voting API is running 🚀");
});

app.get("/test", (req, res) => {
  res.send("Backend working");
});

app.use("/user", UserRoutes);
app.use("/candidate", candidateRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});