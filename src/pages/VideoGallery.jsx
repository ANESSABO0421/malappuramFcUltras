import React from "react";
import { motion } from "framer-motion";

const VideoGallery = () => {
  const videoIds = [
    "CF3stVeql0I",
    "fpcLLksnkbM",
    "F0Br6mcFwTg",
    "VBa17Lhu-4E",
    "RNvBzmK5ImU",
    "oeqv85YP7wU",
  ];

  return (
    <div className="bg-black min-h-screen py-12 px-4 text-white">
      {/* Title */}
      <h1 className="text-center text-4xl md:text-6xl font-extrabold mb-16 tracking-widest uppercase text-orange-500 drop-shadow-lg">
        Video Gallery
      </h1>

      {/* Grid layout inspired by App Store */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {videoIds.map((id, index) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="rounded-2xl overflow-hidden bg-white/5 backdrop-blur-lg border border-white/10 shadow-lg hover:shadow-orange-500/30 transition-all duration-300"
          >
            {/* Video */}
            <iframe
              width="100%"
              height="auto"
              src={`https://www.youtube.com/embed/${id}`}
              title="YouTube video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full aspect-[9/16]"
            ></iframe>

            {/* Footer */}
            <div className="p-4 flex justify-between items-center">
              <span className="text-lg font-semibold">🎬 Video</span>
              <button className="bg-gradient-to-r from-orange-500 to-pink-500 px-5 py-1.5 rounded-full text-sm font-bold hover:from-pink-500 hover:to-orange-500 transition-all duration-300 shadow-[0_0_15px_rgba(255,165,0,0.7)]">
                Watch
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default VideoGallery;
