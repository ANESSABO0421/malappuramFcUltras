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
    <div className="relative  min-h-screen py-16 px-6 text-white overflow-hidden">
      {/* Floating particles background */}
      <div className="absolute inset-0 -z-10">
        <div className="w-full h-full bg-gradient-to-br  opacity-90" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
      </div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center text-5xl md:text-7xl font-extrabold mb-20 tracking-widest uppercase bg-gradient-to-r from-orange-500 via-orange-700 to-orange-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(255,100,0,0.8)]"
      >
        🎥 Video Gallery
      </motion.h1>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
        {videoIds.map((id, index) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            whileHover={{ scale: 1.06, rotateY: 3 }}
            className="rounded-3xl overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_0_30px_rgba(255,100,0,0.4)] hover:shadow-[0_0_40px_rgba(255,150,0,0.7)] transition-all duration-500"
          >
            {/* Video */}
            <div className="overflow-hidden">
              <motion.iframe
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
                width="100%"
                height="auto"
                src={`https://www.youtube.com/embed/${id}`}
                title="YouTube video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full aspect-[16/9] rounded-t-3xl"
              ></motion.iframe>
              
            </div>

            {/* Footer */}
            <div className="p-5 flex justify-between items-center">
              <span className="text-lg font-semibold">🎬 Featured Video</span>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative bg-gradient-to-r from-orange-500 via-orange-700 to-orange-500 px-6 py-2 rounded-full text-sm font-bold shadow-[0_0_20px_rgba(255,100,0,0.6)] overflow-hidden"
              >
                <span className="relative z-10">Watch</span>
                {/* Pulse animation */}
                <span className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-700 animate-pulse opacity-50"></span>
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default VideoGallery;
