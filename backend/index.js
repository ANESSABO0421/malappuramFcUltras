// // ------------------------------
// // 🌐 Backend Server for MFC Data Proxy (Local Version)
// // ------------------------------

// require("dotenv").config();
// const express = require("express");
// const axios = require("axios");
// const cors = require("cors");
// const NodeCache = require("node-cache");
// const helmet = require("helmet");
// const morgan = require("morgan");
// const compression = require("compression");
// const rateLimit = require("express-rate-limit");

// const app = express();

// // ------------------------------
// // 🔧 Environment Variables
// // ------------------------------
// const PORT = process.env.PORT || 5000;
// const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:5173";
// const CACHE_TTL = Number(process.env.CACHE_TTL_SECONDS || 120); // in seconds

// // ------------------------------
// // 🌍 Remote API URLs
// // ------------------------------
// const STANDINGS_URL = "https://superleaguekerala.com/api/standings";
// const RESULTS_URL = "https://superleaguekerala.com/assets/results.jsons";

// // ------------------------------
// // 🧠 Cache Configuration
// // ------------------------------
// const cache = new NodeCache({
//   stdTTL: CACHE_TTL,
//   checkperiod: CACHE_TTL / 2,
// });

// // ------------------------------
// // 🧱 Middlewares
// // ------------------------------
// app.use(helmet());
// app.use(compression());
// app.use(express.json());
// app.use(morgan("dev"));
// app.use(cors({ origin: FRONTEND_ORIGIN }));

// // 🚦 Rate Limiting
// const limiter = rateLimit({
//   windowMs: 60 * 1000, // 1 minute
//   max: 100, // Max 100 requests/min per IP
// });
// app.use(limiter);

// // ------------------------------
// // 🩺 Health Check
// // ------------------------------
// app.get("/health", (req, res) => {
//   res.json({ status: "ok" });
// });

// // ------------------------------
// // 🏆 Fetch Standings
// // ------------------------------
// app.get("/api/standings", async (req, res) => {
//   try {
//     const CACHE_KEY = "standings";
//     const cachedData = cache.get(CACHE_KEY);
//     if (cachedData) return res.json(cachedData);

//     const response = await axios.get(STANDINGS_URL, { timeout: 7000 });
//     cache.set(CACHE_KEY, response.data);
//     res.json(response.data);
//   } catch (error) {
//     console.error("❌ Error fetching standings:", error.message);
//     res.status(502).json({ error: "Failed to fetch standings" });
//   }
// });

// // ------------------------------
// // ⚽ Latest Malappuram FC Match
// // ------------------------------
// app.get("/api/malappuram-last", async (req, res) => {
//   try {
//     const CACHE_KEY = "malappuram-last";
//     const cachedData = cache.get(CACHE_KEY);
//     if (cachedData) return res.json(cachedData);

//     const { data: results } = await axios.get(RESULTS_URL, { timeout: 7000 });

//     const malappuramMatches = results.filter(
//       (m) =>
//         m.homeTeam?.name?.toLowerCase().includes("malappuram") ||
//         m.awayTeam?.name?.toLowerCase().includes("malappuram")
//     );

//     if (malappuramMatches.length === 0)
//       return res
//         .status(404)
//         .json({ message: "No matches found for Malappuram FC" });

//     const latestMatch = malappuramMatches.sort((a, b) => b.id - a.id)[0];

//     cache.set(CACHE_KEY, latestMatch);
//     res.json(latestMatch);
//   } catch (error) {
//     console.error("❌ Error fetching Malappuram match:", error.message);
//     res
//       .status(502)
//       .json({ error: "Failed to fetch Malappuram FC match data" });
//   }
// });

// // ------------------------------
// // 🚫 Handle Unknown Routes
// // ------------------------------
// app.use((req, res) => {
//   res.status(404).json({ error: "Route not found" });
// });

// // ------------------------------
// // 🚀 Start the Server
// // ------------------------------
// app.listen(PORT, () => {
//   console.log(`⚽ Server running locally at http://localhost:${PORT}`);
// });

// index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db.js";
import standingsRoutes from "./routes/standingsRoutes.js";
import router from "./routes/standingsRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to DB
connectDB();

// Routes
app.use("/api/admin", router);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
