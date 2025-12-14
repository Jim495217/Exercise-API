const { Rep } = require("../models");

exports.createRep = async (req, res) => {
  try {
    const rep = await Rep.create(req.body);
    res.status(201).json(rep);
  } catch {
    res.status(500).json({ error: "Failed to create rep" });
  }
};

exports.updateRep = async (req, res) => {
  try {
    const rep = await Rep.findByPk(req.params.id);
    if (!rep) return res.status(404).json({ error: "Rep not found" });
    await rep.update(req.body);
    res.json(rep);
  } catch {
    res.status(500).json({ error: "Failed to update rep" });
  }
};

exports.deleteRep = async (req, res) => {
  try {
    const rep = await Rep.findByPk(req.params.id);
    if (!rep) return res.status(404).json({ error: "Rep not found" });
    await rep.destroy();
    res.json({ message: "Rep deleted" });
  } catch {
    res.status(500).json({ error: "Failed to delete rep" });
  }
};
