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

// GET all users
router.get("/users", (req, res) => {
  // Execute MySQL query to fetch all users
  pool.query("SELECT * FROM users", (err, results) => {
    if (err) {
      // Handle MySQL query errors
      console.error("Error executing MySQL query:", err);
      res.status(500).json({ error: "Internal server error" }); // Send internal server error response
      return;
    }
    res.json(results); // Send response with retrieved users data
  });
});

// GET all posts or a specific post by ID
router.get("/posts/:id?", (req, res) => {
  const postId = req.params.id; // Extract post ID from request parameters
  if (postId) {
    // If post ID is provided
    // Fetch post by ID
    pool.query("SELECT * FROM posts WHERE id = ?", [postId], (err, results) => {
      if (err) {
        // Handle MySQL query errors
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Internal server error" }); // Send internal server error response
        return;
      }
      if (results.length === 0) {
        // If no post found with the given ID
        res.status(404).json({ error: "Post not found" }); // Send post not found response
        return;
      }
      res.json(results[0]); // Send response with retrieved post data
    });
  } else {
    // If no post ID provided, fetch all posts added via form
    // Fetch all posts that were added via form
    pool.query(
      "SELECT * FROM posts WHERE added_via_form = TRUE",
      (err, results) => {
        if (err) {
          // Handle MySQL query errors
          console.error("Error executing MySQL query:", err);
          res.status(500).json({ error: "Internal server error" }); // Send internal server error response
          return;
        }
        res.json(results); // Send response with retrieved posts data
      }
    );
  }
});

// GET all comments for a specific post by post ID
router.get("/comments/post/:postId", (req, res) => {
  const postId = req.params.postId; // Extract post ID from request parameters
  // Fetch comments for the specified post ID
  pool.query(
    "SELECT content, created_at FROM comments WHERE post_id = ? ORDER BY created_at DESC",
    [postId], // Parameter for the query
    (err, results) => {
      if (err) {
        // Handle MySQL query errors
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Internal server error" }); // Send internal server error response
        return;
      }
      if (results.length === 0) {
        // If no comments found for the specified post
        res.status(404).json({ message: "No comments found for this post" }); // Send message indicating no comments found
        return;
      }
      res.json(results); // Send response with retrieved comments data
    }
  );
});

module.exports = router; // Export the router for use in other modules
