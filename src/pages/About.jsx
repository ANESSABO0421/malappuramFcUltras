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
      className="min-h-screen py-20 px-6  text-white flex flex-col-reverse md:flex-col-reverse lg:flex-row items-center justify-between gap-10"
      id="about"
    >
      <div className="max-w-2xl">
        <motion.h2
          variants={childVariants}
          className="text-4xl md:text-5xl font-extrabold text-orange-400 mb-6 relative inline-block"
        >
          <span className="relative z-10">About Ultras Malappuram FC</span>
          <span className=" left-0 -bottom-1 w-full h-1 bg-orange-400  animate-pulse"></span>
        </motion.h2>

        <motion.p
          variants={childVariants}
          className="text-lg lg:text-xl leading-relaxed text-gray-300 mb-5 text-justify"
        >
          <strong className="text-white">Ultras Malappuram</strong> isn’t just a
          football club — it’s a{" "}
          <span className="text-orange-300 font-semibold  underline-offset-4">
            movement
          </span>{" "}
          born from the heart of Kerala’s most football-passionate district.
          Representing <strong>Malappuram</strong> in the{" "}
          <strong className="text-orange-200">Kerala Super League</strong>, we
          carry the pride, grit, and dreams of thousands who breathe football
          every day.
        </motion.p>

        <motion.p
          variants={childVariants}
          className="text-lg lg:text-xl leading-relaxed text-gray-300 mb-5 text-justify"
        >
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
        </motion.p>

        <motion.p
          variants={childVariants}
          className="text-lg lg:text-xl leading-relaxed text-gray-300 text-justify"
        >
          We play not just for trophies, but for every soul in Malappuram who
          lives for the game. Together, we chant, we rise, and we fight for
          glory. This is more than a club —{" "}
          <strong className="text-white">this is Malappuram’s roar.</strong>
        </motion.p>

        <motion.div variants={childVariants} className="mt-8">
          <span className="inline-block px-6 py-3 bg-gradient-to-r from-orange-400 to-orange-600 text-[#1A1F3C] hover:from-orange-500 hover:to-orange-700 transition-all duration-300 rounded-full text-xl font-bold shadow-lg">
            #RoarOfMalappuram
          </span>
        </motion.div>
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        whileInView={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex-shrink-0 hover:scale-105 transition-transform duration-500"
      >
        <img
          src="/ultras.jpeg"
          alt="Ultras Malappuram"
          className="rounded-3xl shadow-2xl w-full max-w-md h-auto object-cover border-4 border-orange-500"
        />
      </motion.div>
    </motion.div>
  );
};

export default About;
