import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import authRoutes from "./authRoutes.js";
app.use("/auth", authRoutes);


const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Server is running!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
