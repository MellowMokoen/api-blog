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

// DELETE request to delete a user by ID
router.delete("/user/:id", (req, res) => {
  const userId = req.params.id; // Extract user ID from request parameters
  // Execute MySQL query to delete user from the database
  pool.query("DELETE FROM users WHERE id = ?", [userId], (err, results) => {
    if (err) {
      // Handle MySQL query errors
      console.error("Error executing MySQL query:", err);
      res.status(500).json({ error: "Internal server error" }); // Send internal server error response
      return;
    }
    res.json({ message: "User deleted successfully" }); // Send success response
  });
});

// DELETE request to delete a post by ID
router.delete("/posts/:id", (req, res) => {
  const { id } = req.params; // Extract post ID from request parameters
  // Execute MySQL query to delete post from the database
  pool.query("DELETE FROM posts WHERE id = ?", [id], (error, results) => {
    if (error) {
      // Handle MySQL query errors
      return res.status(500).json({ error: "Internal server error" }); // Send internal server error response
    }
    if (results.affectedRows === 0) {
      // If no rows were affected, post not found
      return res.status(404).json({ message: "Post not found" }); // Send post not found response
    }
    res.status(200).json({ message: "Post deleted successfully" }); // Send success response
  });
});

// DELETE request to delete a comment by ID
router.delete("/comment/:id", (req, res) => {
  const commentId = req.params.id; // Extract comment ID from request parameters
  // Execute MySQL query to delete comment from the database
  pool.query(
    "DELETE FROM comments WHERE id = ?",
    [commentId], // Parameter for the query
    (err, results) => {
      if (err) {
        // Handle MySQL query errors
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Internal server error" }); // Send internal server error response
        return;
      }
      res.json({ message: "Comment deleted successfully" }); // Send success response
    }
  );
});

module.exports = router; // Export the router for use in other modules
