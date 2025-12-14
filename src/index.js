require("dotenv").config();
const express = require("express");

const app = express();

app.use("/api/auth", require("./routes/authRoutes"));

// Middleware
app.use(express.json());

// DEBUG: comment routes for now
// app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api/exercises", require("./routes/exerciseRoutes"));

app.get("/", (req, res) => {
  res.send("API running");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


