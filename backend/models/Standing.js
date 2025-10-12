// models/Standing.js
import mongoose from "mongoose";

const standingSchema = new mongoose.Schema({
  club: { type: String, required: true },
  logo: { type: String },
  played: { type: Number, default: 0 },
  won: { type: Number, default: 0 },
  draw: { type: Number, default: 0 },
  lost: { type: Number, default: 0 },
  gf: { type: Number, default: 0 }, // Goals For
  ga: { type: Number, default: 0 }, // Goals Against
  gd: { type: Number, default: 0 }, // Goal Difference
  points: { type: Number, default: 0 },
  last5: { type: [String], default: [] }, // e.g. ["W", "D", "L"]
});

export default mongoose.model("Standing", standingSchema);
