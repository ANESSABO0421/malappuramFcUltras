// routes/standingsRoutes.js
import express from "express";
import Standing from "../models/Standing.js";

const router = express.Router();

// GET all standings
router.get("/", async (req, res) => {
  try {
    const standings = await Standing.find().sort({ points: -1 });
    res.json(standings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST new team
router.post("/standing", async (req, res) => {
  try {
    const newTeam = new Standing(req.body);
    await newTeam.save();
    res.json(newTeam);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update team
router.put("/:id", async (req, res) => {
  try {
    const updated = await Standing.findByIdAndUpdate(req.params.id, req.body, { new: true });
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

export default router;
