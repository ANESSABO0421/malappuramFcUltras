import React from "react";
// Uncomment if using framer-motion for animation
// import { motion } from "framer-motion";

// Replace these YouTube video IDs and sponsor data with your own
const videos = [
  { id: "bYbIKkz5d7s", title: "Malappuram Highlights" },
  { id: "dQw4w9WgXcQ", title: "Ultras Chant Compilation" },
  { id: "E7wJTI-1dvQ", title: "Top Goals & Celebrations" },
  { id: "J---aiyznGQ", title: "Victory Parade 2024" },
];

const sponsors = [
  {
    name: "Sponsor One",
    logo: "/images/sponsors/s1.png",
    url: "https://sponsor1.com",
  },
  {
    name: "Sponsor Two",
    logo: "/images/sponsors/s2.png",
    url: "https://sponsor2.com",
  },
  {
    name: "Sponsor Three",
    logo: "/images/sponsors/s3.png",
    url: "https://sponsor3.com",
  },
];

const VideoGallery = () => (
  <section className="relative py-14 px-4 md:px-10 bg-gradient-to-b from-[#0d1117] via-[#181f2a]/90 to-black/95 w-full">
    {/* Headline */}
    <h2 className="text-3xl md:text-5xl font-extrabold text-orange-400 text-center mb-10 uppercase tracking-widest drop-shadow-lg">
      Ultras Video Gallery
    </h2>

    {/* YouTube Video Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 z-10 mb-16">
      {videos.map((video, i) => (
        // If using framer-motion, wrap in <motion.div>
        <div
          key={video.id}
          className="rounded-2xl overflow-hidden shadow-2xl border-2 border-orange-400/30 bg-black/70 group hover:bg-orange-950/30 transition"
        >
          <div className="w-full aspect-w-16 aspect-h-9 bg-black">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${video.id}`}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
              allowFullScreen
              loading="lazy"
            />
          </div>
          <div className="p-2 text-white text-center font-semibold bg-[#111722]/80 text-lg">
            {video.title}
          </div>
        </div>
      ))}
    </div>

    {/* Sponsors Section */}
    <div className="relative rounded-2xl bg-gradient-to-tr from-orange-600/30 via-orange-400/10 to-orange-900/40 px-6 py-10 mb-2 shadow-2xl border-t-2 border-orange-400/80 max-w-4xl mx-auto">
      <h3 className="text-2xl text-center font-bold text-orange-300 mb-5 tracking-wide uppercase">
        Proudly Supported By
      </h3>
      <div className="flex flex-wrap gap-8 justify-center items-center">
        {sponsors.map((s, idx) => (
          // Wrap each sponsor in a link and optional hover effect
          <a
            href={s.url}
            key={s.name}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform duration-300 hover:scale-110 flex flex-col items-center group"
          >
            <img
              src={s.logo}
              alt={s.name}
              className="h-20 w-24 object-contain mb-2 drop-shadow-lg rounded-xl bg-white/80 p-2 group-hover:shadow-orange-400/50"
            />
            <span className="text-orange-100 text-sm font-medium">
              {s.name}
            </span>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default VideoGallery;
