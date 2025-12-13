const { Set, Exercise } = require("../models");

exports.getAllSets = async (req, res) => {
  try {
    const sets = await Set.findAll();
    res.status(200).json(sets);
  } catch (error) {
    res.status(500).json({ error: "Failed to get sets" });
  }
};

exports.getSetById = async (req, res) => {
  try {
    const set = await Set.findByPk(req.params.id);
    if (!set) return res.status(404).json({ error: "Set not found" });
    res.status(200).json(set);
  } catch (error) {
    res.status(500).json({ error: "Failed to get set" });
  }
};

exports.createSet = async (req, res) => {
  try {
    const { exerciseId, number } = req.body;
    if (!exerciseId || number == null) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    // Check if exercise exists
    const exercise = await Exercise.findByPk(exerciseId);
    if (!exercise) return res.status(404).json({ error: "Exercise not found" });

    const set = await Set.create({ exerciseId, number });
    res.status(201).json(set);
  } catch (error) {
    res.status(500).json({ error: "Failed to create set" });
  }
};

exports.updateSet = async (req, res) => {
  try {
    const set = await Set.findByPk(req.params.id);
    if (!set) return res.status(404).json({ error: "Set not found" });
    const { number } = req.body;
    if (number == null) return res.status(400).json({ error: "Missing number" });

    await set.update({ number });
    res.status(200).json(set);
  } catch (error) {
    res.status(500).json({ error: "Failed to update set" });
  }
};

exports.deleteSet = async (req, res) => {
  try {
    const set = await Set.findByPk(req.params.id);
    if (!set) return res.status(404).json({ error: "Set not found" });
    await set.destroy();
    res.status(200).json({ message: "Set deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete set" });
  }
};
