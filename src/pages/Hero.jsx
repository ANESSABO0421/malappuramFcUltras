import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ✅ Ensure images are stored in the public/images directory
const images = [
  "/images/bg1.jpeg",
  "/images/bg2.jpeg",
  "/images/bg3.jpeg",
  "/images/bg4.jpeg",
];

const Hero = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pt-[100px]">
      <section
        className="relative w-full h-[600px] sm:h-screen overflow-hidden"
        id="hero"
      >
        {/* 🌄 Background Images with Zoom-Parallax Effect */}
        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={images[index]}
            alt="Hero Background"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
          />
        </AnimatePresence>

        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10" />

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl sm:text-6xl font-extrabold text-white drop-shadow-lg"
          >
            Ultras Malappuram – More Than Just Fans.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-base sm:text-xl mt-4 text-white drop-shadow-md max-w-2xl"
          >
            United by loyalty. Driven by passion. We stand, we sing, we roar for
            Malappuram!
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-6 bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-full text-white font-semibold transition-all shadow-lg"
          >
            Explore Matches
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default Hero;
