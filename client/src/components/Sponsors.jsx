import React from "react";
import { motion } from "framer-motion";

const sponsors = [
  { name: "Kalliyath", img: "/images/Gallery/Kalliyath.png" },
  { name: "Roadmate", img: "/images/Gallery/Roadmate.png" },

  { name: "Ajmi", img: "/images/Gallery/Ajmi.png" },
  { name: "edRoot", img: "/images/Gallery/edRoot.png" },
];

const Sponsors = () => {
  return (
    <section className="w-full py-20 relative overflow-hidden bg-transparent">
      {/* Title */}
      <div className="text-center mb-14">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold text-orange-500 uppercase tracking-wider drop-shadow-lg flex items-center justify-center gap-3"
        >
          Our Sponsors
        </motion.h2>
        <p className="text-white text-lg mt-3 max-w-2xl mx-auto font-medium">
          Proudly powered by our incredible partners and supporters.
        </p>
      </div>

      {/* Floating animation for each sponsor */}
      <div className="flex flex-wrap justify-center items-center gap-12 px-6">
        {sponsors.map((sponsor, i) => (
          <motion.div
            key={i}
            className="relative w-48 h-32 md:w-56 md:h-36 flex items-center justify-center bg-white/60 backdrop-blur-md rounded-2xl shadow-[0_0_20px_rgba(255,140,0,0.3)] border border-orange-300 hover:shadow-[0_0_30px_rgba(255,165,0,0.6)] transition-all overflow-hidden"
            initial={{ y: 0 }}
            animate={{ y: [0, -8, 0] }}
            transition={{
              repeat: Infinity,
              duration: 4 + i,
              ease: "easeInOut",
            }}
          >
            {/* Shine Effect */}
            <motion.div
              className="absolute top-0 left-[-75%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent rotate-12"
              whileHover={{
                left: "150%",
                transition: { duration: 1.2 },
              }}
            />

            <img
              src={sponsor.img}
              alt={sponsor.name}
              className="w-full h-full object-contain p-4"
            />
          </motion.div>
        ))}
      </div>

      {/* Bottom glowing divider */}
      <motion.div
        className="mt-16 h-1 w-40 bg-gradient-to-r from-orange-400 to-yellow-400 mx-auto rounded-full"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
    </section>
  );
};

export default Sponsors;
