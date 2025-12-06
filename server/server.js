const express = require("express");
const cors = require("cors");
const authRoutes = require("./authRoutes");
const gameRoutes = require("./routes/gameRoutes");
const progressRoutes = require("./routes/progressRoutes");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// ROUTES
app.use("/auth", authRoutes);
app.use("/game", gameRoutes);
app.use("/progress", progressRoutes);

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
