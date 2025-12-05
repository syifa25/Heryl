import db from '../config/db.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashed = await bcrypt.hash(password, 10);

        await pool.query(
            "INSERT INTO players (username, email, password) VALUES ($1, $2, $3)",
            [username, email, hashed]
        );

        res.json({ message: "User registered!" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const result = await pool.query(
            "SELECT * FROM players WHERE username = $1",
            [username]
        );

        const user = result.rows[0];
        if (!user) return res.status(404).json({ error: "User not found!" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ error: "Wrong password!" });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        res.json({ message: "Login success", token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
