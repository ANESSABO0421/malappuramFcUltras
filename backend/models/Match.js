import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
  homeTeam: { type: String, required: true },
  awayTeam: { type: String, required: true },
  homeImage: { type: String },
  awayImage: { type: String },
  venue: { type: String, required: true },
  date: { type: Date, required: true },
  homeGoals: { type: Number, default: 0 },
  awayGoals: { type: Number, default: 0 },
  highlight: { type: String },
  isFinished: { type: Boolean, default: false },
  status: {
    type: String,
    enum: ["upcoming", "completed"],
    default: "upcoming",
  },
});

export default mongoose.model("Match", matchSchema);
