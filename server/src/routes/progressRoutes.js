const router = require("express").Router();
const pool = require('../config/db');


// SAVE GAME PROGRESS
router.post("/game/save", async (req, res) => {
  try {
    const { email, cats_saved, time_played, level } = req.body;

    // Cari user_id berdasarkan email
    const userResult = await pool.query(
      "SELECT id FROM users WHERE email=$1",
      [email]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const userId = userResult.rows[0].id;

    // Update game_data
    const result = await pool.query(
      `
        INSERT INTO game_data (user_id, cats_saved, time_played, level)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (user_id)
        DO UPDATE 
        SET cats_saved = $2,
            time_played = $3,
            level = $4,
            updated_at = NOW()
        RETURNING *;
      `,
      [userId, cats_saved, time_played, level]
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
       FROM game_data WHERE user_id = (SELECT id FROM users WHERE email=$1)`,
      [email]
    );

    res.json({ success: true, data: user.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

module.exports = router;
