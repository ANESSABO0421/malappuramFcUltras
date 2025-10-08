import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Standings() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchStandings = () => {
    setLoading(true);
    fetch("http://localhost:5000/api/standings")
      .then((res) => res.json())
      .then((data) => {
        setTeams(data);
        setLoading(false);
        setLastUpdated(new Date().toLocaleTimeString());
      })
      .catch((err) => console.error("Error fetching data:", err));
  };

  useEffect(() => {
    fetchStandings();
    const interval = setInterval(fetchStandings, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-screen text-white bg-gray-950">
        <div className="animate-spin h-10 w-10 border-4 border-green-500 border-t-transparent rounded-full mb-4"></div>
        <p className="text-lg font-medium">Fetching live standings...</p>
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-5xl mx-auto mt-12 p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white rounded-3xl shadow-2xl border border-gray-700"
    >
      {/* Title */}
      <div className="flex flex-col items-center mb-6">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-yellow-400 drop-shadow-lg"
        >
          🏆 Super League Kerala Standings
        </motion.h1>

        <p className="text-gray-400 text-sm mt-2 italic">
          Live Updated Rankings •{" "}
          {lastUpdated && (
            <span className="text-gray-300 font-semibold">
              Last Sync: {lastUpdated}
            </span>
          )}
        </p>

        <button
          onClick={fetchStandings}
          className="mt-4 px-4 py-2 rounded-full bg-gradient-to-r from-green-600 to-lime-500 hover:from-green-500 hover:to-yellow-400 text-white text-sm font-semibold transition shadow-md"
        >
          🔄 Refresh Now
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl shadow-inner border border-gray-700 backdrop-blur-sm">
        <table className="w-full border-collapse text-sm md:text-base">
          <thead>
            <tr className="bg-gray-800/80 text-left text-gray-300 uppercase tracking-wider">
              <th className="p-3">#</th>
              <th className="p-3">Club</th>
              <th className="p-3 text-center">P</th>
              <th className="p-3 text-center">W</th>
              <th className="p-3 text-center">D</th>
              <th className="p-3 text-center">L</th>
              <th className="p-3 text-center">GF</th>
              <th className="p-3 text-center">GA</th>
              <th className="p-3 text-center">Pts</th>
            </tr>
          </thead>

          <tbody>
            {teams.map((team, i) => {
              const isMalappuram =
                team.name.toLowerCase().includes("malappuram");

              return (
                <motion.tr
                  key={team.position}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`${
                    isMalappuram
                      ? "bg-gradient-to-r from-green-800 via-green-700 to-green-800 border border-green-400/60 shadow-md shadow-green-600/40 animate-pulse"
                      : "odd:bg-gray-800/60 even:bg-gray-900/40 hover:bg-gray-700/70"
                  } transition`}
                >
                  <td className="p-3 font-bold text-gray-300">
                    {team.position}
                  </td>
                  <td className="p-3 flex items-center gap-3">
                    <img
                      src={`https://superleaguekerala.com/${team.logo}`}
                      alt={team.name}
                      className={`w-8 h-8 rounded-full ${
                        isMalappuram
                          ? "ring-4 ring-green-400"
                          : "ring-2 ring-gray-600"
                      }`}
                    />
                    <span
                      className={`font-semibold ${
                        isMalappuram
                          ? "text-green-300 drop-shadow-lg"
                          : "text-white"
                      }`}
                    >
                      {team.name}
                    </span>
                  </td>
                  <td className="p-3 text-center">{team.played}</td>
                  <td className="p-3 text-center text-green-400">{team.won}</td>
                  <td className="p-3 text-center text-yellow-400">{team.draw}</td>
                  <td className="p-3 text-center text-red-400">{team.lost}</td>
                  <td className="p-3 text-center">{team.gf}</td>
                  <td className="p-3 text-center">{team.ga}</td>
                  <td
                    className={`p-3 text-center font-extrabold ${
                      isMalappuram ? "text-lime-300" : "text-amber-400"
                    }`}
                  >
                    {team.points}
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <p className="text-center text-gray-500 text-xs mt-5">
        Data Source:{" "}
        <a
          href="https://superleaguekerala.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-green-400 transition"
        >
          SuperLeagueKerala.com
        </a>{" "}
        • Updated Live
      </p>
    </motion.div>
  );
}
