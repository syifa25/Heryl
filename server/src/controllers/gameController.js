const pool = require('../config/db');

exports.getData = async (req, res) => {
    const result = await pool.query(
        "SELECT * FROM game_data WHERE user_id=$1",
        [req.user.id]
    );
    res.json(result.rows);
};

exports.saveData = async (req, res) => {
    const { level, cats_saved, time_played } = req.body;

    await pool.query(
        `INSERT INTO game_data(user_id, level, cats_saved, time_played)
         VALUES($1,$2,$3,$4)
         ON CONFLICT (user_id)
         DO UPDATE SET level=$2, cats_saved=$3, time_played=$4, updated_at=NOW()`,
        [req.user.id, level, cats_saved, time_played]
    );

    res.json({ message: "Game data saved" });
};

exports.deleteData = async (req, res) => {
    await pool.query("DELETE FROM game_data WHERE user_id=$1", [req.user.id]);
    res.json({ message: "Game data deleted" });
};
