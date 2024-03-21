const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const db = require("../db");

// POST route for user registration
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required." });
    }

    // Check if user already exists
    const userExists = await db.findUserByUsername(username); // Implement this function in your db module
    if (userExists) {
      return res.status(409).json({ message: "Username already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Store the new user in the database
    await db.createUser({ username, hashedPassword }); // Implement this function in your db module

    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
