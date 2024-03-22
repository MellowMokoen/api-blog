const mysql = require("mysql2/promise");

// Database connection parameters
const pool = mysql.createPool({
  connectionLimit: 10, // Limiting the number of connections to MySQL server
  host: "localhost", // MySQL server host
  user: "root", // MySQL user
  password: "Paballo1327@", // MySQL password (NOTE: Consider using environment variables for sensitive data)
  database: "blogdb", // MySQL database name
});

// Function to find a user by username
async function findUserByUsername(username) {
  // Execute a SQL query to select a user by username
  const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [
    username,
  ]);
  // Return the first row (if found)
  return rows[0];
}

// Function to create a new user
async function createUser({ username, hashedPassword }) {
  // Execute a SQL query to insert a new user into the database
  const [result] = await pool.query(
    "INSERT INTO users (username, hashed_password) VALUES (?, ?)",
    [username, hashedPassword]
  );
  // Return the ID of the newly inserted user
  return result.insertId;
}

module.exports = { findUserByUsername, createUser, pool };
