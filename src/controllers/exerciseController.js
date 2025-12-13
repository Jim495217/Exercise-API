const { Exercise } = require("../models");

/**
 * GET /api/exercises
 * Get all exercises
 */
exports.getAllExercises = async (req, res) => {
  try {
    const exercises = await Exercise.findAll();
    res.status(200).json(exercises);
  } catch (error) {
    console.error("GET ALL EXERCISES ERROR:", error);
    res.status(500).json({ error: "Failed to get exercises" });
  }
};

/**
 * GET /api/exercises/:id
 * Get exercise by ID
 */
exports.getExerciseById = async (req, res) => {
  try {
    const { id } = req.params;

    const exercise = await Exercise.findByPk(id);

    if (!exercise) {
      return res.status(404).json({ error: "Exercise not found" });
    }

    res.status(200).json(exercise);
  } catch (error) {
    console.error("GET EXERCISE BY ID ERROR:", error);
    res.status(500).json({ error: "Failed to get exercise" });
  }
};

/**
 * POST /api/exercises
 * Create a new exercise
 */
exports.createExercise = async (req, res) => {
  try {
    const { name, muscleGroup } = req.body;

    // Validation
    if (!name || !muscleGroup) {
      return res.status(400).json({
        error: "name and muscleGroup are required"
      });
    }

    const newExercise = await Exercise.create({
      name,
      muscleGroup
    });

    res.status(201).json(newExercise);
  } catch (error) {
    console.error("CREATE EXERCISE ERROR:", error);
    res.status(500).json({ error: "Failed to create exercise" });
  }
};

/**
 * PUT /api/exercises/:id
 * Update an existing exercise
 */
exports.updateExercise = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, muscleGroup } = req.body;

    const exercise = await Exercise.findByPk(id);

    if (!exercise) {
      return res.status(404).json({ error: "Exercise not found" });
    }

    await exercise.update({
      name: name ?? exercise.name,
      muscleGroup: muscleGroup ?? exercise.muscleGroup
    });

    res.status(200).json(exercise);
  } catch (error) {
    console.error("UPDATE EXERCISE ERROR:", error);
    res.status(500).json({ error: "Failed to update exercise" });
  }
};

/**
 * DELETE /api/exercises/:id
 * Delete an exercise
 */
exports.deleteExercise = async (req, res) => {
  try {
    const { id } = req.params;

    const exercise = await Exercise.findByPk(id);

    if (!exercise) {
      return res.status(404).json({ error: "Exercise not found" });
    }

    await exercise.destroy();

    res.status(200).json({ message: "Exercise deleted successfully" });
  } catch (error) {
    console.error("DELETE EXERCISE ERROR:", error);
    res.status(500).json({ error: "Failed to delete exercise" });
  }
};
