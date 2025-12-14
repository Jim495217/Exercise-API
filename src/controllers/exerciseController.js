const { Exercise } = require("../models");

exports.getAllExercises = async (req, res) => {
  try {
    const exercises = await Exercise.findAll();
    res.status(200).json(exercises);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get exercises" });
  }
};

exports.getExerciseById = async (req, res) => {
  try {
    const exercise = await Exercise.findByPk(req.params.id);
    if (!exercise) {
      return res.status(404).json({ error: "Exercise not found" });
    }
    res.status(200).json(exercise);
  } catch (error) {
    res.status(500).json({ error: "Failed to get exercise" });
  }
};

exports.createExercise = async (req, res) => {
  try {
    const { name, muscleGroup } = req.body;
    if (!name || !muscleGroup) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const exercise = await Exercise.create({ name, muscleGroup });
    res.status(201).json(exercise);
  } catch (error) {
    res.status(500).json({ error: "Failed to create exercise" });
  }
};

exports.updateExercise = async (req, res) => {
  try {
    const exercise = await Exercise.findByPk(req.params.id);
    if (!exercise) {
      return res.status(404).json({ error: "Exercise not found" });
    }
    await exercise.update(req.body);
    res.status(200).json(exercise);
  } catch (error) {
    res.status(500).json({ error: "Failed to update exercise" });
  }
};

exports.deleteExercise = async (req, res) => {
  try {
    const exercise = await Exercise.findByPk(req.params.id);
    if (!exercise) {
      return res.status(404).json({ error: "Exercise not found" });
    }
    await exercise.destroy();
    res.status(200).json({ message: "Exercise deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete exercise" });
  }
};
