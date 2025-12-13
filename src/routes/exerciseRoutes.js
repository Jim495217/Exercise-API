const express = require("express");
const router = express.Router();
const exerciseController = require("../controllers/exerciseController");

// GET all exercises
router.get("/", exerciseController.getAllExercises);

// GET exercise by ID
router.get("/:id", exerciseController.getExerciseById);

// POST create exercise
router.post("/", exerciseController.createExercise);

// PUT update exercise
router.put("/:id", exerciseController.updateExercise);

// DELETE exercise
router.delete("/:id", exerciseController.deleteExercise);

module.exports = router;
