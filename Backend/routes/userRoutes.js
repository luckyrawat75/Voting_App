const express = require("express");
const router = express.Router();

const User = require("../models/user");
const { generateToken, jwtAuthMiddleware } = require("../jwt");


router.post("/signup", async (req, res) => {
  try {
    const data = req.body;

    
    const existingAdmin = await User.findOne({ role: "admin" });

    
    if (!existingAdmin) {
      data.role = "admin";
    } else {
      data.role = "voter";
    }

    const newUser = new User(data);
    const response = await newUser.save();

    const payload = { id: response._id };
    const token = generateToken(payload);

    res.status(200).json({
      user: {
        _id: response._id,
        name: response.name,
        role: response.role,
        aadharCardNumber: response.aadharCardNumber,
      },
      token,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.post("/login", async (req, res) => {
  try {
    const { aadharCardNumber, password } = req.body;
    const user = await User.findOne({ aadharCardNumber });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const payload = { id: user._id };
    const token = generateToken(payload);

    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        role: user.role,
        aadharCardNumber: user.aadharCardNumber,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.get("/profile", jwtAuthMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.put("/profile/password", jwtAuthMiddleware, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ error: "User not found" });

    if (!(await user.comparePassword(currentPassword))) {
      return res.status(401).json({ error: "Invalid current password" });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully ✅" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;