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

router.put("/user/:id", (req, res) => {
  const userId = req.params.id;
  const { username, email, password } = req.body;
  pool.query(
    "UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?",
    [username, email, password, userId],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      res.json({ message: "User updated successfully" });
    }
  );
});

// PUT request to update a post by ID
router.put("/post/:id", (req, res) => {
  const postId = req.params.id;
  const { title, content } = req.body;
  pool.query(
    "UPDATE posts SET title = ?, content = ? WHERE id = ?",
    [title, content, postId],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      res.json({ message: "Post updated successfully" });
    }
  );
});

// PUT request to update a comment by ID
router.put("/comment/:id", (req, res) => {
  const commentId = req.params.id;
  const { content } = req.body;
  pool.query(
    "UPDATE comments SET content = ? WHERE id = ?",
    [content, commentId],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      res.json({ message: "Comment updated successfully" });
    }
  );
});

module.exports = router;
