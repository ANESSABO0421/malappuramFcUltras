import React, { useEffect, useState } from "react";
import axios from "axios";
import { Calendar, MapPin, PlayCircle } from "lucide-react";

export default function LastMalappuramMatch() {
  const [fixtures, setFixtures] = useState([]);
  const [lastMatch, setLastMatch] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const fix = await axios.get("http://localhost:5000/api/match/fixtures");
      const last = await axios.get("http://localhost:5000/api/match/last-match");
      setFixtures(fix.data);
      setLastMatch(last.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const getYoutubeThumbnail = (url) => {
    if (!url) return null;
    try {
      const videoId = url.split("v=")[1]?.split("&")[0];
      return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    } catch {
      return null;
    }
  };

  return (
    <div className=" text-gray-900 font-[Inter] py-16 px-6 md:px-12 lg:px-24 space-y-24">

      {/* LAST MATCH */}
      <section className="rounded-3xl border border-orange-300 bg-[#101425] shadow-xl p-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-orange-600 mb-8">
          Last Match
        </h2>

        {lastMatch ? (
          <div className="flex flex-col items-center lg:flex-row justify-between gap-10">
            {/* Home Team */}
            <div className="flex flex-col items-center gap-3 text-center">
              <img
                src={`http://localhost:5000/${lastMatch.homeImage}`}
                alt="home"
                className="w-24 h-24 rounded-full border-4 border-orange-500 shadow-md object-cover"
              />
              <h3 className="text-xl font-semibold text-orange-700">{lastMatch.homeTeam}</h3>
              <p className="text-gray-600 text-sm">{lastMatch.venue}</p>
            </div>

            {/* Score */}
            <div className="flex flex-col items-center gap-2">
              <p className="text-5xl font-extrabold text-orange-500">
                {lastMatch.homeGoals} - {lastMatch.awayGoals}
              </p>
              <p className="text-gray-500 text-sm">
                {new Date(lastMatch.date).toLocaleDateString()}
              </p>
              {lastMatch.highlight && (
                <a
                  href={lastMatch.highlight}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-full font-medium shadow hover:bg-orange-600 transition"
                >
                  <PlayCircle className="w-5 h-5" /> Watch Highlights
                </a>
              )}
            </div>

            {/* Away Team */}
            <div className="flex flex-col items-center gap-3 text-center">
              <img
                src={`http://localhost:5000/${lastMatch.awayImage}`}
                alt="away"
                className="w-24 h-24 rounded-full border-4 border-orange-500 shadow-md object-cover"
              />
              <h3 className="text-xl font-semibold text-orange-700">{lastMatch.awayTeam}</h3>
              <p className="text-gray-600 text-sm">{lastMatch.venue}</p>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-4">No match played yet.</p>
        )}
      </section>

      {/* UPCOMING FIXTURES */}
      <section>
        <h2 className="text-center text-4xl font-extrabold text-orange-600 mb-10">
          Upcoming Fixtures
        </h2>

        {fixtures.length ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {fixtures.map((f) => (
              <div
                key={f._id}
                className="p-6 rounded-2xl border border-orange-200 shadow-lg bg-[#191F32] hover:shadow-orange-200 transition-all duration-300 hover:scale-[1.03]"
              >
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    {f.homeImage && (
                      <img
                        src={`http://localhost:5000/${f.homeImage}`}
                        alt="home"
                        className="w-12 h-12 rounded-full border border-orange-400 object-cover"
                      />
                    )}
                    <p className="font-semibold text-gray-800">{f.homeTeam}</p>
                  </div>
                  <span className="text-orange-500 font-bold">VS</span>
                  <div className="flex items-center gap-3">
                    <p className="font-semibold text-gray-800">{f.awayTeam}</p>
                    {f.awayImage && (
                      <img
                        src={`http://localhost:5000/${f.awayImage}`}
                        alt="away"
                        className="w-12 h-12 rounded-full border border-orange-400 object-cover"
                      />
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                  <Calendar size={16} className="text-orange-500" />
                  {new Date(f.date).toLocaleString()}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin size={16} className="text-orange-500" /> {f.venue}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No upcoming fixtures yet.</p>
        )}
      </section>
    </div>
  );
}
