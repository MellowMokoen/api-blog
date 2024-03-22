// Import necessary modules
const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
const pass = "Paballo1327@";

// Create MySQL connection pool with required configuration
const pool = mysql.createPool({
  connectionLimit: 10, // Limiting the number of connections to MySQL server
  host: "localhost", // MySQL server host
  user: "root",
  password: pass,
  database: "blogdb",
});

// PUT request to update a user by ID
router.put("/user/:id", (req, res) => {
  const userId = req.params.id; // Extract user ID from request parameters
  const { username, email, password } = req.body; // Extract user data from request body
  // Execute MySQL query to update user details
  pool.query(
    "UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?",
    [username, email, password, userId], // Parameters for the query
    (err, results) => {
      if (err) {
        // Handle MySQL query errors
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Internal server error" }); // Send internal server error response
        return;
      }
      res.json({ message: "User updated successfully" }); // Send success response
    }
  );
});

// PUT request to update a post by ID
router.put("/posts/:id", (req, res) => {
  const postId = req.params.id; // Extract post ID from request parameters
  const { title, content, image } = req.body; // Extract post data from request body
  // Execute MySQL query to update post details
  pool.query(
    "UPDATE posts SET title = ?, content = ?, image = ? WHERE id = ?",
    [title, content, image, postId], // Parameters for the query
    (err, results) => {
      if (err) {
        // Handle MySQL query errors
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Internal server error" }); // Send internal server error response
        return;
      }
      if (results.affectedRows === 0) {
        // Check if no rows were affected (post not found)
        res.status(404).json({ message: "Post not found" }); // Send post not found response
        return;
      }
      res.json({ message: "Post updated successfully" }); // Send success response
    }
  );
});

// PUT request to update a comment by ID
router.put("/comment/:id", (req, res) => {
  const commentId = req.params.id; // Extract comment ID from request parameters
  const { content } = req.body; // Extract comment content from request body
  // Execute MySQL query to update comment content
  pool.query(
    "UPDATE comments SET content = ? WHERE id = ?",
    [content, commentId], // Parameters for the query
    (err, results) => {
      if (err) {
        // Handle MySQL query errors
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Internal server error" }); // Send internal server error response
        return;
      }
      res.json({ message: "Comment updated successfully" }); // Send success response
    }
  );
});

module.exports = router; // Export the router for use in other modules
