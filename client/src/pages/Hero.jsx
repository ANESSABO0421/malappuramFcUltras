import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/images/bg1.jpeg",
  "/images/bg2.jpeg",
  "/images/bg3.jpeg",
  "/images/tifo.jpg",
];

const Hero = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section id="Hero">
        <div className="relative w-full h-screen overflow-hidden">
          {/* Cinematic Background Slideshow */}
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src={images[index]}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/80" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/40" />
            </motion.div>
          </AnimatePresence>

          {/* Dynamic Light Flares */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-orange-500/20 blur-xl"
                initial={{
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`,
                  width: `${Math.random() * 300 + 100}px`,
                  height: `${Math.random() * 300 + 100}px`,
                  opacity: 0,
                }}
                animate={{
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`,
                  opacity: [0, 0.3, 0],
                }}
                transition={{
                  duration: Math.random() * 15 + 10,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            ))}
          </div>

          {/* Hero Content */}
          <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="max-w-4xl"
            >
              {/* Animated Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white mb-6"
              >
                <span className="text-stroke">ULTRAS</span>
                <motion.span
                  className="block text-orange-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  MALAPPURAM
                </motion.span>
              </motion.h1>

              {/* Dynamic Tagline */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="overflow-hidden"
              >
                <motion.p
                  className="text-xl sm:text-2xl text-white/90 font-medium mb-10"
                  initial={{ y: 30 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  THE HEARTBEAT OF FOOTBALL IN KERALA
                </motion.p>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row justify-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
              >
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 0 2px rgba(245,158,11,0.8)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full transition-all"
                >
                  JOIN THE ARMY
                </motion.button>
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 0 2px rgba(255,255,255,0.8)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full transition-all"
                >
                  UPCOMING MATCHES
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Scrolling Indicator */}
            <motion.div
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex flex-col items-center"
              >
                <span className="text-white text-sm mb-2">SCROLL DOWN</span>
                <div className="w-px h-10 bg-gradient-to-b from-orange-400 to-transparent" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
