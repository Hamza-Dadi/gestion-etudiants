require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

if (process.platform === "win32" && !process.env.VERCEL) {
  try {
    const dns = require("dns");
    dns.setServers(["8.8.8.8", "1.1.1.1"]);
  } catch (e) {}
}

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

let isConnected = false;
async function connectDB() {
  if (isConnected || mongoose.connection.readyState === 1) {
    isConnected = true;
    return;
  }
  if (!process.env.MONGO_URI) return;
  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("MongoDB est connecté");
  } catch (error) {
    console.error("Erreur MongoDB :", error.message);
  }
}

connectDB();

app.use(async (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    await connectDB();
  }
  next();
});

const etudiantRoutes = require("./routes/etudiantRoutes");

app.get("/", (req, res) => {
  res.send("Mon premier serveur MERN !");
});

app.get("/api/test", (req, res) => {
  res.json({
    message: "L'API fonctionne correctement"
  });
});

app.use("/api/etudiants", etudiantRoutes);

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
  });
}

module.exports = app;
