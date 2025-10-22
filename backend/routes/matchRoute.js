import express from "express";
import multer from "multer";
import path from "path";
import Match from "../models/Match.js";
import Standing from "../models/Standing.js";

const matchRouter = express.Router();

/* ==============================
   🧾 Multer Configuration
   ============================== */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/match_logos");
  },
  filename: (req, file, cb) => {
    const uniqueName =
      file.fieldname + "_" + Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

/* ==============================
   ✅ 1. Get all upcoming fixtures
   ============================== */
matchRouter.get("/fixtures", async (req, res) => {
  try {
    // Find all matches not finished and date >= now
    const fixtures = await Match.find({
      isFinished: false,
    }).sort({ date: 1 });

    res.status(200).json(fixtures);
  } catch (error) {
    console.error("❌ Error fetching fixtures:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

/* ==============================
   ✅ 2. Get last played (finished) match
   ============================== */
matchRouter.get("/last-match", async (req, res) => {
  try {
    const lastMatch = await Match.findOne({ isFinished: true })
      .sort({ date: -1 })
      .limit(1);

    res.status(200).json(lastMatch);
  } catch (error) {
    console.error("❌ Error fetching last match:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

/* ==============================
   ✅ 3. Add new fixture (with team logos)
   ============================== */
matchRouter.post(
  "/add-fixture",
  upload.fields([
    { name: "homeImage", maxCount: 1 },
    { name: "awayImage", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { homeTeam, awayTeam, venue, date } = req.body;

      if (!homeTeam || !awayTeam || !venue || !date) {
        return res
          .status(400)
          .json({ success: false, message: "All fields are required" });
      }

      const homeImage = req.files?.homeImage?.[0]?.path || null;
      const awayImage = req.files?.awayImage?.[0]?.path || null;

      const newMatch = new Match({
        homeTeam,
        awayTeam,
        venue,
        date: new Date(date), // ✅ ensure date stored as Date type
        homeImage,
        awayImage,
        isFinished: false,
      });

      await newMatch.save();

      res.status(201).json({
        success: true,
        message: "Fixture added successfully",
        match: newMatch,
      });
    } catch (error) {
      console.error("❌ Error adding fixture:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  }
);

/* ==============================
   ✅ 4. Finish a match and update standings
   ============================== */
matchRouter.post("/finish-match/:id", async (req, res) => {
  try {
    const { homeGoals, awayGoals, highlight } = req.body;

    const match = await Match.findById(req.params.id);
    if (!match)
      return res
        .status(404)
        .json({ success: false, message: "Match not found" });

    // ✅ Safely convert scores to numbers
    const homeG = Number(homeGoals);
    const awayG = Number(awayGoals);
    if (isNaN(homeG) || isNaN(awayG)) {
      return res
        .status(400)
        .json({ success: false, message: "Goals must be numbers" });
    }

    // ✅ Update match info
    match.homeGoals = homeG;
    match.awayGoals = awayG;
    match.highlight = highlight?.trim() || "";
    match.isFinished = true;
    await match.save();

    // ✅ Update standings
    const home = await Standing.findOne({ club: match.homeTeam });
    const away = await Standing.findOne({ club: match.awayTeam });

    if (!home || !away) {
      return res.status(404).json({
        success: false,
        message: "One or both teams not found in standings",
      });
    }

    // Update stats
    home.played++;
    away.played++;

    home.gf += homeG;
    home.ga += awayG;
    away.gf += awayG;
    away.ga += homeG;

    home.gd = home.gf - home.ga;
    away.gd = away.gf - away.ga;

    if (homeG > awayG) {
      home.won++;
      home.points += 3;
      away.lost++;
      home.last5.unshift("W");
      away.last5.unshift("L");
    } else if (homeG < awayG) {
      away.won++;
      away.points += 3;
      home.lost++;
      away.last5.unshift("W");
      home.last5.unshift("L");
    } else {
      home.draw++;
      away.draw++;
      home.points++;
      away.points++;
      home.last5.unshift("D");
      away.last5.unshift("D");
    }

    home.last5 = home.last5.slice(0, 5);
    away.last5 = away.last5.slice(0, 5);

    await home.save();
    await away.save();

    res.json({
      success: true,
      message: "Match finished and standings updated",
      match,
    });
  } catch (error) {
    console.error("❌ Error finishing match:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default matchRouter;
