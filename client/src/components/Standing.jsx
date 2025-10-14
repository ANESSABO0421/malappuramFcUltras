import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

export default function MyStandings() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchStandings = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:5000/api/admin/getstanding"
      );
      const data = res.data;
      console.log(data);

      if (!data || !Array.isArray(data)) {
        throw new Error("Invalid data format");
      }

      // Transform if your backend keys are different
      const formatted = data.map((team) => ({
        name: team.club,
        logo: team.logo,
        played: team.played,
        won: team.won,
        draw: team.draw,
        lost: team.lost,
        gf: team.gf,
        ga: team.ga,
        gd: team.gd,
        points: team.points,
      }));

      setTeams(formatted);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      console.error("Error fetching standings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStandings();
  }, []);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-screen text-white bg-[#0f172a]">
        <div className="animate-spin h-10 w-10 border-4 border-orange-400 border-t-transparent rounded-full mb-4"></div>
        <p className="text-lg font-medium">Fetching live standings...</p>
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-5xl mx-auto mt-12 p-6 bg-[#0f172a]/80 text-white rounded-3xl shadow-2xl border border-gray-700"
    >
      {/* Title Section */}
      <div className="flex flex-col items-center mb-6">
        <motion.img
          src="/images/Gallery/superLeagueLogo.png"
          alt="Super League Kerala"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-64 md:w-80 mb-4 drop-shadow-[0_0_20px_rgba(255,165,0,0.4)]"
        />
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-4xl font-extrabold text-center text-orange-400 drop-shadow-lg"
        >
          League Standings
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
          className="mt-4 px-4 py-2 rounded-full bg-gradient-to-r from-orange-600 to-yellow-400 hover:from-orange-500 hover:to-yellow-300 text-white text-sm font-semibold transition shadow-md"
        >
          🔄 Refresh Now
        </button>
      </div>

      {/* Standings Table */}
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
              const isMalappuram = team.name
                ?.toLowerCase()
                .includes("malappuram");
              return (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`${
                    isMalappuram
                      ? "bg-gradient-to-r from-orange-700 via-orange-600 to-orange-700 border border-orange-400/60 shadow-md shadow-orange-600/40 animate-pulse"
                      : "odd:bg-gray-800/60 even:bg-gray-900/40 hover:bg-gray-700/70"
                  } transition`}
                >
                  <td className="p-3 font-bold text-gray-300">{i + 1}</td>
                  <td className="p-3 flex items-center gap-3">
                    <img
                      src={`http://localhost:5000${team.logo}`} // ✅ use backend URL + logo path
                      alt={team.name}
                      className="w-8 h-8 rounded-full border border-gray-600 object-cover"
                    />

                    <span
                      className={`font-semibold ${
                        isMalappuram
                          ? "text-orange-300 drop-shadow-lg"
                          : "text-white"
                      }`}
                    >
                      {team.name}
                    </span>
                  </td>
                  <td className="p-3 text-center">{team.played}</td>
                  <td className="p-3 text-center text-green-400">{team.won}</td>
                  <td className="p-3 text-center text-yellow-400">
                    {team.draw}
                  </td>
                  <td className="p-3 text-center text-red-400">{team.lost}</td>
                  <td className="p-3 text-center">{team.gf}</td>
                  <td className="p-3 text-center">{team.ga}</td>
                  <td
                    className={`p-3 text-center font-extrabold ${
                      isMalappuram ? "text-orange-300" : "text-amber-400"
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
          className="text-gray-300 hover:text-orange-400 transition"
        >
          SuperLeagueKerala.com
        </a>{" "}
        • Updated Live
      </p>
    </motion.div>
  );
}
