const router = require("express").Router();
const pool = require('../config/db');


// SAVE GAME PROGRESS
router.post("/save-progress", async (req, res) => {
  try {
    const { email, catsSaved, timePlayed, level } = req.body;

    const result = await pool.query(
      `UPDATE users 
       SET cats_saved=$1, time_played=$2, level=$3
       WHERE email=$4
       RETURNING *`,
      [catsSaved, timePlayed, level, email]
    );

    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});


// LOAD GAME PROGRESS
router.post("/get-progress", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await pool.query(
      `SELECT cats_saved, time_played, level 
       FROM users WHERE email=$1`,
      [email]
    );

    res.json({ success: true, data: user.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

module.exports = router;
