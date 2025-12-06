const pool = require('../config/db');
const { hashPassword, verifyPassword } = require('../utils/password');
const { signToken } = require('../utils/jwt');

// REGISTER
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const hashed = await hashPassword(password);

    const q = `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, name, email, created_at
    `;

    const r = await pool.query(q, [name, email, hashed]);
    const user = r.rows[0];

    const token = signToken({ id: user.id, email: user.email });

    res.status(201).json({
      message: "User registered",
      user,
      token
    });

  } catch (err) {
    console.error(err);

    if (err.code === "23505")
      return res.status(409).json({ message: "Email already exists" });

    res.status(500).json({ message: "Server Error" });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const q = "SELECT * FROM users WHERE email=$1";
    const r = await pool.query(q, [email]);

    if (r.rows.length === 0)
      return res.status(404).json({ message: "User not found" });

    const user = r.rows[0];

    const valid = await verifyPassword(password, user.password);
    if (!valid)
      return res.status(401).json({ message: "Wrong password" });

    const token = signToken({ id: user.id, email: user.email });

    res.json({
      message: "Login success",
      user,
      token
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
