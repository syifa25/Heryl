const router = require("express").Router();
const auth = require("../middleware/auth");
const { getData, saveData, deleteData } = require("../controllers/gameController.js");

router.get("/", auth, getData);
router.post("/", auth, saveData);
router.delete("/", auth, deleteData);

module.exports = router;
