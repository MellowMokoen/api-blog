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

// POST request to create a new user
router.post("/users", (req, res) => {
  const { username, email, password } = req.body;
  pool.query(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
    [username, email, password],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      res.status(201).json({ message: "User created successfully" });
    }
  );
});

// POST request to create a new post
router.post("/posts", (req, res) => {
  const { title, content, userId } = req.body; // Assuming userId is required to associate the post with a user
  pool.query(
    "INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)",
    [title, content, userId],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      res.status(201).json({ message: "Post created successfully" });
    }
  );
});

// POST request to create a new comment
router.post("/comments", (req, res) => {
  const { content, postId, userId } = req.body; // Assuming postId and userId are required to associate the comment with a post and a user
  pool.query(
    "INSERT INTO comments (content, post_id, user_id) VALUES (?, ?, ?)",
    [content, postId, userId],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      res.status(201).json({ message: "Comment created successfully" });
    }
  );
});

module.exports = router;
