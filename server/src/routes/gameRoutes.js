const router = require("express").Router();
const auth = require("../middleware/auth");
const { getData, saveData, deleteData } = require("../controllers/gameController.js");

// GET PROGRESS
router.get("/", auth, getData);

// SAVE PROGRESS
router.post("/save", auth, saveData);

// DELETE PROGRESS
router.delete("/", auth, deleteData);

module.exports = router;
