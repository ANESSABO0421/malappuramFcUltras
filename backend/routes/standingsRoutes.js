import express from "express";
import multer from "multer";
import path from "path";
import Standing from "../models/Standing.js";

const router = express.Router();

// --- Multer setup for logo upload ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/logos"); // Folder where logos will be saved
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

// --- ROUTES ---

// GET all standings
router.get("/", async (req, res) => {
  try {
    const standings = await Standing.find().sort({ points: -1 });
    res.json(standings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST new team (with logo)
router.post("/standing", upload.single("logo"), async (req, res) => {
  try {
    const logoPath = req.file ? `/uploads/logos/${req.file.filename}` : null;
    const newTeam = new Standing({
      ...req.body,
      logo: logoPath,
    });
    await newTeam.save();
    res.json(newTeam);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update team info
router.put("/:id", upload.single("logo"), async (req, res) => {
  try {
    const updatedData = { ...req.body };
    if (req.file) {
      updatedData.logo = `/uploads/logos/${req.file.filename}`;
    }

    const updated = await Standing.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE team
router.delete("/:id", async (req, res) => {
  try {
    await Standing.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- UPDATE STANDINGS AFTER A MATCH ---
router.post("/update-match", async (req, res) => {
  try {
    const { homeTeam, awayTeam, homeGoals, awayGoals } = req.body;

    const home = await Standing.findOne({ club: homeTeam });
    const away = await Standing.findOne({ club: awayTeam });

    if (!home || !away) {
      return res.status(404).json({ message: "One or both teams not found" });
    }

    // Update basic stats
    home.played += 1;
    away.played += 1;

    home.gf += homeGoals;
    home.ga += awayGoals;
    away.gf += awayGoals;
    away.ga += homeGoals;

    home.gd = home.gf - home.ga;
    away.gd = away.gf - away.ga;

    // Result logic
    if (homeGoals > awayGoals) {
      home.won += 1;
      home.points += 3;
      away.lost += 1;
      home.last5.unshift("W");
      away.last5.unshift("L");
    } else if (homeGoals < awayGoals) {
      away.won += 1;
      away.points += 3;
      home.lost += 1;
      away.last5.unshift("W");
      home.last5.unshift("L");
    } else {
      home.draw += 1;
      away.draw += 1;
      home.points += 1;
      away.points += 1;
      home.last5.unshift("D");
      away.last5.unshift("D");
    }

    // Keep only last 5 results
    home.last5 = home.last5.slice(0, 5);
    away.last5 = away.last5.slice(0, 5);

    await home.save();
    await away.save();

    res.json({ message: "Standings updated successfully", home, away });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating standings" });
  }
});

export default router;
