const pool = require('../config/db');

exports.getProgress = async (req, res) => {
    const result = await db.query(
        `SELECT * FROM game_progress WHERE user_id=$1`,
        [req.user.id]
    );

    if (result.rows.length === 0) {
        const insert = await db.query(
            `INSERT INTO game_progress (user_id) VALUES ($1) RETURNING *`,
            [req.user.id]
        );
        return res.json(insert.rows[0]);
    }

    res.json(result.rows[0]);
};

exports.updateProgress = async (req, res) => {
    console.log("DATA MASUK:", req.body);

    const { cats_saved, time_played, level } = req.body;

    const update = await db.query(
        `UPDATE game_progress
         SET cats_saved=$1, time_played=$2, level=$3
         WHERE user_id=$4
         RETURNING *`,
        [cats_saved, time_played, level, req.user.id]
    );

    res.json(update.rows[0]);
};
