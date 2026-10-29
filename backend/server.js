require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dns = require("dns");

const etudiantRoutes = require("./routes/etudiantRoutes");

try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (e) {}

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173"
}));

app.get("/", (req, res) => {
  res.send("Mon premier serveur MERN !");
});

app.get("/api/test", (req, res) => {
  res.json({
    message: "L'API fonctionne correctement"
  });
});

app.use("/api/etudiants", etudiantRoutes);

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB est connecté");
    app.listen(PORT, () => {
      console.log(`Serveur lancé sur http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Erreur MongoDB :", error.message);
    process.exit(1);
  }
}

startServer();
