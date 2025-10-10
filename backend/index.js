// src/index.js
require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const NodeCache = require("node-cache");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const rateLimit = require("express-rate-limit");

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "*";
const CACHE_TTL = Number(process.env.CACHE_TTL_SECONDS || 120); // seconds

// Remote data URLs
const STANDINGS_URL = "https://superleaguekerala.com/assets/standings.json";
const RESULTS_URL = "https://superleaguekerala.com/assets/results.json";

const cache = new NodeCache({ stdTTL: CACHE_TTL, checkperiod: CACHE_TTL / 2 });

// ---------- Middlewares ----------
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(morgan("tiny"));
app.use(cors({ origin: FRONTEND_ORIGIN }));

// Basic rate limiting
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 120,
});
app.use(limiter);

// ---------- Routes ----------

// ✅ Health check
app.get("/health", (req, res) => res.json({ status: "ok" }));

// ✅ Standings Proxy
app.get("/api/standings", async (req, res) => {
  try {
    const KEY = "standings";
    const cached = cache.get(KEY);
    if (cached) return res.json(cached);

    const response = await axios.get(STANDINGS_URL, { timeout: 5000 });
    cache.set(KEY, response.data);
    res.json(response.data);
  } catch (err) {
    console.error("Error fetching standings:", err.message || err);
    res.status(502).json({ error: "Failed to fetch standings" });
  }
});

// ✅ Latest Malappuram FC Match
app.get("/api/malappuram-last", async (req, res) => {
  try {
    const KEY = "malappuram-last";
    const cached = cache.get(KEY);
    if (cached) return res.json(cached);

    const response = await axios.get(RESULTS_URL, { timeout: 5000 });
    const results = response.data;

    // Filter for matches involving Malappuram FC
    const malappuramMatches = results.filter(
      (m) =>
        m.homeTeam.name.toLowerCase().includes("malappuram") ||
        m.awayTeam.name.toLowerCase().includes("malappuram")
    );

    if (malappuramMatches.length === 0)
      return res.status(404).json({ message: "No matches found for Malappuram FC" });

    // Sort by ID (assuming higher ID = latest match)
    const latestMatch = malappuramMatches.sort((a, b) => b.id - a.id)[0];

    // Cache the result
    cache.set(KEY, latestMatch);

    res.json(latestMatch);
  } catch (err) {
    console.error("Error fetching Malappuram match:", err.message || err);
    res.status(502).json({ error: "Failed to fetch Malappuram last match" });
  }
});

// ---------- Start Server ----------
app.listen(PORT, () => {
  console.log(`⚽ Proxy server running at http://localhost:${PORT}`);
});
