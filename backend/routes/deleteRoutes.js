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

router.delete("/user/:id", (req, res) => {
  const userId = req.params.id;
  pool.query("DELETE FROM users WHERE id = ?", [userId], (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json({ message: "User deleted successfully" });
  });
});

// DELETE request to delete a post by ID
router.delete("/post/:id", (req, res) => {
  const postId = req.params.id;
  pool.query("DELETE FROM posts WHERE id = ?", [postId], (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json({ message: "Post deleted successfully" });
  });
});

// DELETE request to delete a comment by ID
router.delete("/comment/:id", (req, res) => {
  const commentId = req.params.id;
  pool.query(
    "DELETE FROM comments WHERE id = ?",
    [commentId],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      res.json({ message: "Comment deleted successfully" });
    }
  );
});

module.exports = router;
