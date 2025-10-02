import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center px-6 py-20"
    >
      <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center gap-16">
        {/* Image Side */}
        <motion.div
          initial={{ opacity: 0, y: -80 }} // 👈 from top
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2 flex justify-center"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-lg border border-orange-400/30 group">
            <img
              src="/ultras.jpeg"
              alt="Ultras Malappuram"
              className="w-full h-auto object-cover rounded-3xl transition-transform duration-500 group-hover:scale-105"
            />
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          </div>
        </motion.div>

        {/* Text Side */}
        <motion.div
          initial={{ opacity: 0, y: 80 }} // 👈 from bottom
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2 text-center lg:text-left"
        >
          <motion.h2
            initial={{ opacity: 0, y: -40 }} // 👈 from top
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold text-orange-400 mb-6 relative inline-block"
          >
            About Ultras Malappuram FC
          </motion.h2>

          <p className="text-lg lg:text-xl leading-relaxed text-gray-300 mb-5">
            <span className="text-orange-400 font-semibold">Ultras Malappuram</span>{" "}
            isn’t just a football club — it’s a{" "}
            <span className="text-orange-300 font-semibold">movement</span> born
            from the heart of Kerala’s most football-passionate district.
          </p>

          <p className="text-lg lg:text-xl leading-relaxed text-gray-300 mb-5">
            Representing{" "}
            <span className="text-white font-bold">Malappuram</span> in the{" "}
            <span className="text-orange-200 font-semibold">Kerala Super League</span>,
            we carry the pride, grit, and dreams of thousands who breathe football
            every day.
          </p>

          <p className="text-lg lg:text-xl leading-relaxed text-gray-300 mb-5 italic">
            “Where streets turn into stadiums and every goal becomes a festival.”
          </p>

          <p className="text-lg lg:text-xl leading-relaxed text-gray-300">
            With{" "}
            <span className="text-orange-400 font-semibold">the loudest fans</span>{" "}
            in the league and fearless football, Ultras Malappuram is not just a
            team — it’s{" "}
            <span className="text-orange-200 font-bold">Malappuram’s roar.</span>
          </p>

          {/* CTA Button */}
          <motion.div whileHover={{ scale: 1.05 }} className="mt-10">
            <a
              href="#contact"
              className="px-8 py-3 rounded-full bg-orange-500 text-white font-semibold text-lg shadow-md hover:bg-orange-600 transition"
            >
              #RoarOfMalappuram
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
