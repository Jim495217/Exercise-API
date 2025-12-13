const express = require("express");
const router = express.Router();
const repController = require("../controllers/repController");

router.get("/", repController.getAllReps);
router.get("/:id", repController.getRepById);
router.post("/", repController.createRep);
router.put("/:id", repController.updateRep);
router.delete("/:id", repController.deleteRep);

module.exports = router;
