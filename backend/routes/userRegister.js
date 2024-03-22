const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs"); // Library for hashing passwords

const db = require("../db"); // Importing my database connection

// POST route for user registration
router.post("/register", async (req, res) => {
  // Extract username and password from the request body
  try {
    const { username, password } = req.body;
    // Check if username or password is missing
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required." });
    }

    // Check if user already exists in the database
    const userExists = await db.findUserByUsername(username);
    if (userExists) {
      return res.status(409).json({ message: "Username already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Store the new user in the database
    await db.createUser({ username, hashedPassword });

    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    // Handle any errors that occur during the registration process
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
