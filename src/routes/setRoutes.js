const router = require("express").Router();
const controller = require("../controllers/setController");

router.post("/", controller.createSet);
router.put("/:id", controller.updateSet);
router.delete("/:id", controller.deleteSet);

module.exports = router;
