module.exports = (err, req, res, next) => {
  console.error("Error:", err);

  // Sequelize validation errors
  if (err.name === "SequelizeValidationError") {
    return res.status(400).json({
      error: "Validation Error",
      details: err.errors.map(e => e.message)
    });
  }

  // Custom error with status (ex: { status: 404, message: "Not found" })
  if (err.status) {
    return res.status(err.status).json({
      error: err.message
    });
  }

  // All other unexpected errors
  res.status(500).json({
    error: "Internal Server Error"
  });
};
