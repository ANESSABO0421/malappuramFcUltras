import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function LastMalappuramMatch() {
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/malappuram-last");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        console.log("Fetched data:", data);

        if (!data || !data.homeTeam || !data.awayTeam) {
          throw new Error("Invalid match data format");
        }

        const isMalappuramMatch =
          data.homeTeam.name?.toLowerCase().includes("malappuram") ||
          data.awayTeam.name?.toLowerCase().includes("malappuram");

        if (!isMalappuramMatch)
          throw new Error("No Malappuram FC match found in response");

        setMatch(data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMatchData();
  }, []);

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-300 animate-pulse text-lg">
        Loading Malappuram FC’s latest match...
      </p>
    );

  if (error)
    return (
      <p className="text-center mt-10 text-red-400 text-lg">
        ⚠️ {error || "Something went wrong fetching match data"}
      </p>
    );

  if (!match)
    return (
      <p className="text-center mt-10 text-gray-300 text-lg">
        No match data available.
      </p>
    );

  const isHome = match.homeTeam.name.toLowerCase().includes("malappuram");
  const result =
    match.homeTeam.score === match.awayTeam.score
      ? "Draw"
      : (isHome && match.homeTeam.score > match.awayTeam.score) ||
        (!isHome && match.awayTeam.score > match.homeTeam.score)
      ? "Win"
      : "Loss";

  // Extract YouTube video ID from "hightlights" URL (supports normal + share links)
  const extractYouTubeId = (url) => {
    if (!url) return null;
    const regex =
      /(?:youtube\.com\/(?:.*v=|embed\/|shorts\/)|youtu\.be\/)([^"&?/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const videoId = extractYouTubeId(match.hightlights);
  const thumbnailUrl = videoId
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative max-w-2xl mx-auto mt-12 rounded-3xl overflow-hidden bg-gradient-to-br from-green-950 via-gray-900 to-black p-1 shadow-2xl border border-lime-500/30"
    >
      {/* Glowing Background */}
      <div className="absolute inset-0 bg-lime-400/10 blur-3xl opacity-20"></div>

      <div className="relative z-10 p-8 text-white backdrop-blur-md rounded-3xl">
        {/* Header */}
        <div className="flex items-center justify-center mb-6 gap-2">
          <span className="text-2xl">🏆</span>
          <h2 className="text-2xl font-bold text-lime-300 tracking-wide">
            Malappuram FC — Last Match
          </h2>
        </div>

        {/* Teams Section */}
        <div className="flex justify-between items-center mb-6">
          {/* Home Team */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center"
          >
            <img
              src={`https://superleaguekerala.com/${match.homeTeam.logo}`}
              alt={match.homeTeam.name}
              className={`w-16 h-16 rounded-full border-2 ${
                isHome ? "border-lime-400" : "border-gray-500"
              } shadow-lg`}
            />
            <span
              className={`mt-3 font-semibold text-sm ${
                isHome ? "text-lime-300" : "text-gray-300"
              }`}
            >
              {match.homeTeam.name}
            </span>
          </motion.div>

          {/* Score */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div
              className={`text-5xl font-extrabold ${
                result === "Win"
                  ? "text-lime-400"
                  : result === "Loss"
                  ? "text-red-400"
                  : "text-yellow-300"
              }`}
            >
              {match.homeTeam.score}
              <span className="text-gray-400 mx-2">–</span>
              {match.awayTeam.score}
            </div>
            <p className="uppercase text-sm tracking-wider mt-2 text-gray-400">
              {result}
            </p>
          </motion.div>

          {/* Away Team */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center"
          >
            <img
              src={`https://superleaguekerala.com/${match.awayTeam.logo}`}
              alt={match.awayTeam.name}
              className={`w-16 h-16 rounded-full border-2 ${
                !isHome ? "border-lime-400" : "border-gray-500"
              } shadow-lg`}
            />
            <span
              className={`mt-3 font-semibold text-sm ${
                !isHome ? "text-lime-300" : "text-gray-300"
              }`}
            >
              {match.awayTeam.name}
            </span>
          </motion.div>
        </div>

        {/* Match Details */}
        <div className="flex justify-center gap-6 text-gray-400 text-sm mb-6">
          <div className="flex items-center gap-1">
            <span>📅</span>
            <span>{match.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>🏟️</span>
            <span>{match.venue}</span>
          </div>
        </div>

        {/* Highlights Section */}
        <div className="text-center">
          {videoId ? (
            <motion.a
              whileHover={{ scale: 1.05 }}
              href={match.hightlights}
              target="_blank"
              rel="noopener noreferrer"
              className="block relative rounded-2xl overflow-hidden shadow-lg group"
            >
              <img
                src={thumbnailUrl}
                alt="Match Highlights Thumbnail"
                className="w-full h-56 object-cover rounded-2xl border border-lime-500/30 group-hover:brightness-110 transition-all duration-300"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/30 transition">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="bg-red-600 text-white rounded-full p-3"
                >
                  ▶
                </motion.div>
              </div>
            </motion.a>
          ) : (
            <p className="text-gray-500 italic">
              🎬 Highlights not available yet
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
