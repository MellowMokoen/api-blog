// Import necessary modules
const express = require("express");
const router = express.Router(); // Create an Express router
const mysql = require("mysql2"); // Import MySQL module
const pass = "Paballo1327@"; // MySQL password (NOTE: Consider using environment variables for sensitive data)

// Create MySQL connection pool with required configuration
const pool = mysql.createPool({
  connectionLimit: 10, // Limiting the number of connections to MySQL server
  host: "localhost", // MySQL server host
  user: "root", // MySQL user
  password: pass, // MySQL password (NOTE: Consider using environment variables for sensitive data)
  database: "blogdb", // MySQL database name
});

// POST request to create a new user
router.post("/users", (req, res) => {
  const { username, email, password } = req.body; // Extract user data from request body
  // Execute MySQL query to insert new user into the database
  pool.query(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
    [username, email, password], // Parameters for the query
    (err, results) => {
      if (err) {
        // Handle MySQL query errors
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Internal server error" }); // Send internal server error response
        return;
      }
      res.status(201).json({ message: "User created successfully" }); // Send success response
    }
  );
});

// POST request to create a new post
router.post("/posts", (req, res) => {
  const { title, content, userId, image } = req.body; // Extract post data from request body
  // Execute MySQL query to insert new post into the database
  pool.query(
    "INSERT INTO posts (title, content, user_id, image, added_via_form) VALUES (?, ?, ?, ?, TRUE)",
    [title, content, userId, image], // Parameters for the query
    (err, results) => {
      if (err) {
        // Handle MySQL query errors
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Internal server error" }); // Send internal server error response
        return;
      }
      // Respond with a message indicating successful creation and the ID of the new post
      res.status(201).json({
        message: "Post created successfully",
        postId: results.insertId,
      });
    }
  );
});

// POST request to create a new comment
router.post("/comments", (req, res) => {
  const { content, postId, userId } = req.body; // Extract comment data from request body
  // Execute MySQL query to insert new comment into the database
  pool.query(
    "INSERT INTO comments (content, post_id, user_id) VALUES (?, ?, ?)",
    [content, postId, userId], // Parameters for the query
    (err, results) => {
      if (err) {
        // Handle MySQL query errors
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Internal server error" }); // Send internal server error response
        return;
      }
      res.status(201).json({ message: "Comment created successfully" }); // Send success response
    }
  );
});

module.exports = router; // Export the router for use in other modules
