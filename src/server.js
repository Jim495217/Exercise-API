// server.js

const express = require("express");
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Import routes
const userRoutes = require("./src/routes/userRoutes");
const exerciseRoutes = require("./src/routes/exerciseRoutes");
const setRoutes = require("./src/routes/setRoutes");
const repRoutes = require("./src/routes/repRoutes");

// Use routes with proper base paths
app.use("/api/users", userRoutes);
app.use("/api/exercises", exerciseRoutes);
app.use("/api/sets", setRoutes);
app.use("/api/reps", repRoutes);

// Basic 404 handler for unknown routes
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

// Generic error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log error stack for debugging
  res.status(500).json({ error: "Internal Server Error" });
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
