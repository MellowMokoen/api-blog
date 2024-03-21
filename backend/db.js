const mysql = require("mysql2/promise");

// Database connection parameters
const pool = mysql.createPool({
  connectionLimit: 10, // Limiting the number of connections to MySQL server
  host: "localhost", // MySQL server host
  user: "root", // MySQL user
  password: "Paballo1327@", // MySQL password (NOTE: Consider using environment variables for sensitive data)
  database: "blogdb", // MySQL database name
});

async function findUserByUsername(username) {
  const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [
    username,
  ]);
  return rows[0];
}

async function createUser({ username, hashedPassword }) {
  const [result] = await pool.query(
    "INSERT INTO users (username, hashed_password) VALUES (?, ?)",
    [username, hashedPassword]
  );
  return result.insertId;
}

module.exports = { findUserByUsername, createUser, pool };
