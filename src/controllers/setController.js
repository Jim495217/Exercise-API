const { Set } = require("../models");

exports.createSet = async (req, res) => {
  try {
    const set = await Set.create(req.body);
    res.status(201).json(set);
  } catch {
    res.status(500).json({ error: "Failed to create set" });
  }
};

exports.updateSet = async (req, res) => {
  try {
    const set = await Set.findByPk(req.params.id);
    if (!set) return res.status(404).json({ error: "Set not found" });
    await set.update(req.body);
    res.json(set);
  } catch {
    res.status(500).json({ error: "Failed to update set" });
  }
};

exports.deleteSet = async (req, res) => {
  try {
    const set = await Set.findByPk(req.params.id);
    if (!set) return res.status(404).json({ error: "Set not found" });
    await set.destroy();
    res.json({ message: "Set deleted" });
  } catch {
    res.status(500).json({ error: "Failed to delete set" });
  }
};
