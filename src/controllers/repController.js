const { Rep, Set } = require("../models");

exports.getAllReps = async (req, res) => {
  try {
    const reps = await Rep.findAll();
    res.status(200).json(reps);
  } catch (error) {
    res.status(500).json({ error: "Failed to get reps" });
  }
};

exports.getRepById = async (req, res) => {
  try {
    const rep = await Rep.findByPk(req.params.id);
    if (!rep) return res.status(404).json({ error: "Rep not found" });
    res.status(200).json(rep);
  } catch (error) {
    res.status(500).json({ error: "Failed to get rep" });
  }
};

exports.createRep = async (req, res) => {
  try {
    const { setId, count, weight } = req.body;
    if (!setId || count == null || weight == null) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const set = await Set.findByPk(setId);
    if (!set) return res.status(404).json({ error: "Set not found" });

    const rep = await Rep.create({ setId, count, weight });
    res.status(201).json(rep);
  } catch (error) {
    res.status(500).json({ error: "Failed to create rep" });
  }
};

exports.updateRep = async (req, res) => {
  try {
    const rep = await Rep.findByPk(req.params.id);
    if (!rep) return res.status(404).json({ error: "Rep not found" });

    const { count, weight } = req.body;
    if (count == null && weight == null) {
      return res.status(400).json({ error: "No fields to update" });
    }

    await rep.update({ count: count ?? rep.count, weight: weight ?? rep.weight });
    res.status(200).json(rep);
  } catch (error) {
    res.status(500).json({ error: "Failed to update rep" });
  }
};

exports.deleteRep = async (req, res) => {
  try {
    const rep = await Rep.findByPk(req.params.id);
    if (!rep) return res.status(404).json({ error: "Rep not found" });
    await rep.destroy();
    res.status(200).json({ message: "Rep deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete rep" });
  }
};
