import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const images = [
  "/images/Gallery/bg1.jpeg",
  "/images/Gallery/bg2.jpeg",
  "/images/Gallery/bg3.jpeg",
  "/images/Gallery/bg4.jpeg",
];

const Gallery = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000); // 3 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full max-w-6xl mx-auto h-auto flex flex-col items-center justify-center overflow-hidden px-4 py-8">
      <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-orange-500 text-center mb-6 drop-shadow-lg tracking-wide">
        Ninety Minutes, Infinite Stories
      </h2>

      <div className="relative w-full flex items-center justify-center gap-4 min-h-[350px] sm:min-h-[500px] lg:min-h-[700px]">
        {images.map((src, i) => {
          const position = i - index;
          let transformStyle = "";
          let zIndex = 0;

          if (position === 0) {
            transformStyle = "scale-100 rotate-0";
            zIndex = 30;
          } else if (position === -1 || position === images.length - 1) {
            transformStyle =
              "-rotate-6 scale-90 -translate-x-6 sm:-translate-x-10 md:-translate-x-20";
            zIndex = 20;
          } else if (position === 1 || position === -(images.length - 1)) {
            transformStyle =
              "rotate-6 scale-90 translate-x-6 sm:translate-x-10 md:translate-x-20";
            zIndex = 20;
          } else {
            transformStyle = "scale-75 opacity-0 pointer-events-none";
            zIndex = 10;
          }

          return (
            <motion.img
              key={i}
              src={src}
              alt={`Slide ${i}`}
              className={`absolute w-[90%] sm:w-[500px] md:w-[600px] lg:w-[700px] h-auto max-h-[350px] sm:max-h-[450px] md:max-h-[500px] object-cover rounded-xl shadow-lg transition-all duration-500 ease-in-out ${transformStyle}`}
              style={{ zIndex }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Gallery;
