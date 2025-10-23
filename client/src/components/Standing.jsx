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

      if (!data || !Array.isArray(data)) {
        throw new Error("Invalid data format");
      }

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
      <div className="flex flex-col items-center justify-center h-screen bg-[#0f172a] text-white">
        <div className="animate-spin h-10 w-10 border-4 border-orange-400 border-t-transparent rounded-full mb-4"></div>
        <p className="text-lg font-medium">Fetching live standings...</p>
      </div>
    );

  return (
    <motion.section
      id="Standings"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-6xl mx-auto mt-12 p-6 md:p-10 bg-gradient-to-b from-[#101727]/95 to-[#0a0f1a]/95 backdrop-blur-xl rounded-3xl shadow-[0_0_40px_rgba(255,140,0,0.15)] border border-orange-400/20"
    >
      {/* Header */}
      <div className="flex flex-col items-center mb-8">
        <motion.img
          src="/images/Gallery/superLeagueLogo.png"
          alt="Super League Kerala"
          className="w-36 md:w-52 mb-4 drop-shadow-[0_0_25px_rgba(255,165,0,0.5)]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        />
        <h1 className="text-3xl md:text-5xl font-extrabold text-center text-orange-400 drop-shadow-lg tracking-wide">
          League Standings
        </h1>
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
          className="mt-4 px-5 py-2 rounded-full bg-gradient-to-r from-orange-600 to-yellow-400 hover:from-orange-500 hover:to-yellow-300 text-white text-sm font-semibold transition transform hover:scale-105 shadow-lg"
        >
          🔄 Refresh Now
        </button>
      </div>

      {/* Table (Desktop) */}
      <div className="hidden md:block overflow-x-auto rounded-2xl border border-gray-700/60 shadow-inner backdrop-blur-md">
        <table className="w-full text-sm md:text-base">
          <thead className="bg-[#121a2b]/80 text-gray-300 uppercase tracking-wider text-xs md:text-sm">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Club</th>
              <th className="p-3 text-center">P</th>
              <th className="p-3 text-center">W</th>
              <th className="p-3 text-center">D</th>
              <th className="p-3 text-center">L</th>
              <th className="p-3 text-center">GF</th>
              <th className="p-3 text-center">GA</th>
              <th className="p-3 text-center">GD</th>
              <th className="p-3 text-center">Pts</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, i) => {
              const isMalappuram = team.name
                ?.toLowerCase()
                .includes("malappuram");
              const gradient = isMalappuram
                ? "bg-gradient-to-r from-orange-700 via-orange-600 to-orange-700 border border-orange-400/50 animate-pulse"
                : "odd:bg-[#141b2b]/60 even:bg-[#0f1523]/60 hover:bg-[#1b243a]/70";

              return (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`${gradient} transition duration-300`}
                >
                  <td className="p-3 text-gray-400 font-semibold text-center">
                    {i + 1}
                  </td>
                  <td className="p-3 flex items-center gap-3 min-w-[160px]">
                    <img
                      src={`http://localhost:5000${team.logo}`}
                      alt={team.name}
                      className="w-9 h-9 rounded-full border border-gray-600 object-cover"
                    />
                    <span
                      className={`font-semibold ${
                        isMalappuram
                          ? "text-orange-300 drop-shadow-lg"
                          : "text-gray-100"
                      }`}
                    >
                      {team.name}
                    </span>
                  </td>
                  <td className="p-3 text-white text-center">{team.played}</td>
                  <td className="p-3 text-center text-green-400">{team.won}</td>
                  <td className="p-3 text-center text-yellow-400">
                    {team.draw}
                  </td>
                  <td className="p-3 text-center text-red-400">{team.lost}</td>
                  <td className="p-3 text-white text-center">{team.gf}</td>
                  <td className="p-3 text-white text-center">{team.ga}</td>
                  <td className="p-3 text-white text-center text-gray-300">
                    {team.gd}
                  </td>
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

      {/* Mobile View (Cards) */}
      <div className="grid md:hidden gap-4">
        {teams.map((team, i) => {
          const isMalappuram = team.name?.toLowerCase().includes("malappuram");
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`rounded-2xl p-4 flex items-center justify-between border backdrop-blur-md ${
                isMalappuram
                  ? "bg-gradient-to-r from-orange-700 via-orange-600 to-orange-700 border-orange-400/50 animate-pulse"
                  : "bg-[#121a2b]/70 border-gray-700"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-gray-400 font-semibold">{i + 1}</span>
                <img
                  src={`http://localhost:5000${team.logo}`}
                  alt={team.name}
                  className="w-10 h-10 rounded-full border border-gray-600 object-cover"
                />
                <div>
                  <h3
                    className={`font-bold ${
                      isMalappuram ? "text-orange-300" : "text-white"
                    }`}
                  >
                    {team.name}
                  </h3>
                  <p className="text-xs text-gray-400">
                    {team.played}P • {team.won}W • {team.draw}D • {team.lost}L
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={`text-lg font-extrabold ${
                    isMalappuram ? "text-orange-300" : "text-amber-400"
                  }`}
                >
                  {team.points}
                </p>
                <p className="text-xs text-gray-400">Pts</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer */}
      <p className="text-center text-gray-500 text-xs mt-6">
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
    </motion.section>
  );
}
