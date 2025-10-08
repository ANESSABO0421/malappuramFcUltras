import { useEffect, useState } from "react";

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

        // ✅ Since API returns a single match object, not an array
        if (!data || !data.homeTeam || !data.awayTeam) {
          throw new Error("Invalid match data format");
        }

        // ✅ Check if this match involves Malappuram FC
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
      <p className="text-center mt-10 text-gray-300 animate-pulse">
        Loading Malappuram FC’s latest match...
      </p>
    );

  if (error)
    return (
      <p className="text-center mt-10 text-red-400">
        ⚠️ {error || "Something went wrong fetching match data"}
      </p>
    );

  if (!match)
    return (
      <p className="text-center mt-10 text-gray-300">
        No match data available.
      </p>
    );

  const isHome = match.homeTeam.name
    .toLowerCase()
    .includes("malappuram");
  const opponent = isHome ? match.awayTeam : match.homeTeam;

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 rounded-2xl bg-gradient-to-br from-green-900 via-gray-900 to-green-800 text-white shadow-xl border border-green-600 backdrop-blur-md">
      <h2 className="text-2xl font-bold text-center mb-5 text-lime-300 tracking-wide">
        ⚽ Malappuram FC — Last Match Result
      </h2>

      <div className="flex justify-between items-center mb-5">
        {/* Home Team */}
        <div className="flex items-center gap-2">
          <img
            src={`https://superleaguekerala.com/${match.homeTeam.logo}`}
            alt={match.homeTeam.name}
            className="w-10 h-10 rounded-full border border-lime-400"
          />
          <span
            className={`font-semibold ${
              isHome ? "text-lime-300" : "text-gray-200"
            }`}
          >
            {match.homeTeam.name}
          </span>
        </div>

        {/* Score */}
        <div className="text-3xl font-bold text-white text-center">
          {match.homeTeam.score}{" "}
          <span className="text-gray-400">–</span>{" "}
          {match.awayTeam.score}
        </div>

        {/* Away Team */}
        <div className="flex items-center gap-2">
          <span
            className={`font-semibold ${
              !isHome ? "text-lime-300" : "text-gray-200"
            }`}
          >
            {match.awayTeam.name}
          </span>
          <img
            src={`https://superleaguekerala.com/${match.awayTeam.logo}`}
            alt={match.awayTeam.name}
            className="w-10 h-10 rounded-full border border-lime-400"
          />
        </div>
      </div>

      <div className="text-center text-gray-300 text-sm">
        📅 {match.date} • 🏟 {match.venue}
      </div>

      {match.highlights && (
        <div className="text-center mt-5">
          <a
            href={match.highlights}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-lime-600 hover:bg-lime-500 text-white rounded-full shadow-md transition-all"
          >
            🎥 Watch Highlights
          </a>
        </div>
      )}
    </div>
  );
}
