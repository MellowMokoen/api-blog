// Import necessary modules
const express = require("express");
const cors = require("cors"); // Import CORS module

const app = express(); // Create an Express application
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON requests
app.use(express.urlencoded({ extended: true })); // Middleware to parse urlencoded requests (optional)

// Importing route files
const userLoginRoute = require("./routes/userLogin");
const getRoutes = require("./routes/getRoutes"); // Import GET routes
const postRoutes = require("./routes/postRoutes"); // Import POST routes
const putRoutes = require("./routes/putRoutes"); // Import PUT routes
const deleteRoutes = require("./routes/deleteRoutes"); // Import DELETE routes
const userRegisterRoute = require("./routes/userRegister");

// Mounting routes
app.use("/api", userLoginRoute);
app.use("/api", getRoutes); // Mount GET routes under /api
app.use("/api", postRoutes); // Mount POST routes under /api
app.use("/api", putRoutes); // Mount PUT routes under /api
app.use("/api", deleteRoutes); // Mount DELETE routes under /api
app.use("/api", userRegisterRoute);

// Default route
app.get("/", (req, res) => {
  res.json("Hello World"); // Respond with a simple message
});

// Start the server
const PORT = process.env.PORT || 5001; // Get the port from environment variables or use 5001 as default
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Log server start-up message
});
