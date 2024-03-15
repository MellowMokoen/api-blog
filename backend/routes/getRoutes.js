const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
const pass = "Paballo1327@";

// Create MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: pass,
  database: "blogdb",
});

// GET all users or get user by ID
router.get("/users/:id?", (req, res) => {
  const userId = req.params.id;
  if (userId) {
    // Fetch user by ID
    pool.query("SELECT * FROM users WHERE id = ?", [userId], (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      res.json(results[0]);
    });
  } else {
    // Fetch all users
    pool.query("SELECT * FROM users", (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      res.json(results);
    });
  }
});

// GET all posts or get post by ID
router.get("/posts/:id?", (req, res) => {
  const postId = req.params.id;
  if (postId) {
    // Fetch post by ID
    pool.query("SELECT * FROM posts WHERE id = ?", [postId], (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ error: "Post not found" });
        return;
      }
      res.json(results[0]);
    });
  } else {
    // Fetch all posts
    pool.query("SELECT * FROM posts", (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      res.json(results);
    });
  }
});

// GET all comments or get comment by ID
router.get("/comments/:id?", (req, res) => {
  const commentId = req.params.id;
  if (commentId) {
    // Fetch comment by ID
    pool.query(
      "SELECT * FROM comments WHERE id = ?",
      [commentId],
      (err, results) => {
        if (err) {
          console.error("Error executing MySQL query:", err);
          res.status(500).json({ error: "Internal server error" });
          return;
        }
        if (results.length === 0) {
          res.status(404).json({ error: "Comment not found" });
          return;
        }
        res.json(results[0]);
      }
    );
  } else {
    // Fetch all comments
    pool.query("SELECT * FROM comments", (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      res.json(results);
    });
  }
});

module.exports = router;
