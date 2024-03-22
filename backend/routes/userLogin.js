// routes/userLogin.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");
const router = express.Router();

// Define a route to handle user login
router.post("/login", async (req, res) => {
  // Extract username and password from the request body
  const { username, password } = req.body;

  // Query the database to find user by username
  try {
    const query = "SELECT * FROM users WHERE username = ?";
    const [users] = await db.pool.query(query, [username]);

    // If no user found with the provided username, return error
    if (users.length === 0) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    // Retrieve the first user from the query result
    const user = users[0];

    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, user.hashed_password);

    // If passwords don't match, return error
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JSON Web Token (JWT) for authentication
    const token = jwt.sign({ userId: user.id }, "Paballo1327@", {
      expiresIn: "1h",
    });

    // Send the token as a response along with a success message
    res.json({ token: token, message: "Login successful" });
  } catch (error) {
    // Handle any errors that occur during the login process
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
