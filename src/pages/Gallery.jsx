import { div } from "framer-motion/client";
import React from "react";
import { motion } from "framer-motion";

const images = [
  "/images/Gallery/bg1.jpeg",
  "/images/Gallery/bg2.jpeg",
  "/images/Gallery/bg3.jpeg",
  "/images/Gallery/bg4.jpeg",
];

const Gallery = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 gap-5  text-white">
      {images.map((img, i) => (
        <motion.div
          key={i}
          className="relative group overflow-hidden rounded-2xl shadow-lg"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          viewport={{ once: false }}
        >
          <img
            src={img}
            alt="fan pic"
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </motion.div>
      ))}
    </div>
  );
};

export default Gallery;
