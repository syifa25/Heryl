require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes'); 
const gameRoutes = require('./routes/gameRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "*",
  credentials: true
}));
app.use(express.json());

// Auth endpoints
app.use('/auth', authRoutes);
app.use('/api/auth', authRoutes);

// Game endpoints
app.use('/game', gameRoutes);
app.use('/api/game', gameRoutes);

app.get('/', (req, res) => {
  res.json({ message: "Heryl Backend Running" });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

