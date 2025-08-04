import React from "react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.25,
      type: "spring",
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const About = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="min-h-screen py-20 px-6 text-white flex flex-col-reverse md:flex-col-reverse lg:flex-row items-center justify-center gap-10"
      id="about"
    >
      {/* Text Box */}
      <motion.div
        variants={childVariants}
        className="w-full max-w-2xl backdrop-blur-lg bg-white/5 border border-orange-400/20 shadow-xl rounded-3xl p-8 transition-all hover:scale-[1.01]"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-orange-400 mb-6 relative inline-block">
          <span className="relative z-10">About Ultras Malappuram FC</span>
        </h2>

        <p className="text-lg lg:text-xl leading-relaxed text-gray-300 mb-5 text-justify">
          <strong className="text-white">Ultras Malappuram</strong> isn’t just a
          football club — it’s a{" "}
          <span className="text-orange-300 font-semibold underline-offset-4">
            movement
          </span>{" "}
          born from the heart of Kerala’s most football-passionate district.
          Representing <strong>Malappuram</strong> in the{" "}
          <strong className="text-orange-200">Kerala Super League</strong>, we
          carry the pride, grit, and dreams of thousands who breathe football
          every day.
        </p>

        <p className="text-lg lg:text-xl leading-relaxed text-gray-300 mb-5 text-justify">
          Our legacy is rooted in the culture — where{" "}
          <span className="text-orange-200 italic">
            streets turn into stadiums
          </span>{" "}
          and every goal is a celebration. With a passionate fanbase and the
          loudest cheers in the league, Ultras Malappuram is known for its
          <span className="text-orange-300 font-semibold">
            {" "}
            electrifying atmosphere
          </span>
          , local talents, and fearless football.
        </p>

        <p className="text-lg lg:text-xl leading-relaxed text-gray-300 text-justify">
          We play not just for trophies, but for every soul in Malappuram who
          lives for the game. Together, we chant, we rise, and we fight for
          glory. This is more than a club —{" "}
          <strong className="text-white">this is Malappuram’s roar.</strong>
        </p>

        <div className="mt-8">
          <span className="inline-block px-6 py-3 bg-gradient-to-r from-orange-400 to-orange-600 text-[#1A1F3C] hover:from-orange-500 hover:to-orange-700 transition-all duration-300 rounded-full text-xl font-bold shadow-lg">
            #RoarOfMalappuram
          </span>
        </div>
      </motion.div>

      {/* Image Box */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 60 }}
        whileInView={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="backdrop-blur-lg bg-white/5 border border-orange-400/20 shadow-2xl rounded-3xl p-4 max-w-md w-full hover:scale-105 transition-transform duration-500"
      >
        <img
          src="/ultras.jpeg"
          alt="Ultras Malappuram"
          className="rounded-2xl object-cover w-full h-auto border-4 border-orange-500 shadow-lg"
        />
      </motion.div>
    </motion.div>
  );
};

export default About;
