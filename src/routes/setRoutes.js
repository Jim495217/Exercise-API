const express = require("express");
const router = express.Router();
const setController = require("../controllers/setController");

router.get("/", setController.getAllSets);
router.get("/:id", setController.getSetById);
router.post("/", setController.createSet);
router.put("/:id", setController.updateSet);
router.delete("/:id", setController.deleteSet);

module.exports = router;
