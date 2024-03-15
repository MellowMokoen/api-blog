const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to parse urlencoded requests (optional)
app.use(express.urlencoded({ extended: true }));

// Importing route files
const getRoutes = require("./routes/getRoutes");
const postRoutes = require("./routes/postRoutes");
const putRoutes = require("./routes/putRoutes");
const deleteRoutes = require("./routes/deleteRoutes");

// Mounting routes
app.use("/api", getRoutes);
app.use("/api", postRoutes);
app.use("/api", putRoutes);
app.use("/api", deleteRoutes);

app.get("/", (req, res) => {
  res.json("Hello World");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
