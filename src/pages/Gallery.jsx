import React from "react";
import { motion } from "framer-motion";

const images = [
  "/images/Gallery/Gal2.jpeg",
  "/images/Gallery/Gal8.jpeg",
  "/images/Gallery/Gal3.jpeg",
  "/images/Gallery/Gal4.jpeg",
  "/images/Gallery/Gal5.jpeg",
  "/images/Gallery/Gal6.jpeg",
];

const Gallery = () => {
  return (
    <section className="relative py-10 flex flex-col w-full px-4">
      {/* Background overlay */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#0d1117] via-[#121C26]/90 to-[#0d1117] backdrop-blur-xl rounded-xl z-0" />

      {/* Content */}
      <div className="relative z-10">
        <h1 className="text-center p-2 text-2xl md:text-4xl font-extrabold text-orange-400 mb-6 drop-shadow-lg tracking-widest uppercase">
          The Roar Behind the Glory
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 p-4 text-white">
          {images.map((img, i) => (
            <motion.div
              key={i}
              className="relative group overflow-hidden rounded-2xl shadow-2xl ring-1 ring-orange-400/50"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              viewport={{ once: false }}
            >
              <img
                src={img}
                alt="fan pic"
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
             
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
