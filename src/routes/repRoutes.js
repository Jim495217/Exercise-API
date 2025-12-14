const router = require("express").Router();
const controller = require("../controllers/repController");

router.post("/", controller.createRep);
router.put("/:id", controller.updateRep);
router.delete("/:id", controller.deleteRep);

module.exports = router;
