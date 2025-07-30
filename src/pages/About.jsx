import React from "react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.3,
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
      className="min-h-screen py-20 px-6 bg-gradient-to-br from-[#1A1F3C] via-[#1c223f] to-[#1A1F3C] text-white flex flex-col-reverse md:flex-col-reverse lg:flex-row items-center justify-between gap-10"
      id="about"
    >
      <div className="max-w-2xl">
        <motion.h2
          variants={childVariants}
          className="text-4xl md:text-5xl font-extrabold text-orange-400 mb-6 relative"
        >
          <span className="relative z-10">About Ultras Malappuram FC</span>
          <span className=" top-2 left-2 w-full h-full bg-orange-400  "></span>
        </motion.h2>

        <motion.p
          variants={childVariants}
          className="text-base md:text-lg lg:text-xl leading-relaxed text-gray-300 mb-4 text-justify"
        >
          <strong className="text-white">Ultras Malappuram FC</strong> isn’t
          just a football club — it’s a{" "}
          <span className="text-orange-300 font-semibold">movement</span> born
          from the heart of Kerala’s most football-passionate district.
          Representing <strong>Malappuram</strong> in the{" "}
          <strong>Kerala Super League</strong>, we carry the pride, grit, and
          dreams of thousands who breathe football every day.
        </motion.p>

        <motion.p
          variants={childVariants}
          className="text-base md:text-lg lg:text-xl leading-relaxed text-gray-300 mb-4 text-justify"
        >
          Our legacy is deeply rooted in the local culture — where{" "}
          <span className="text-orange-200">streets turn into stadiums</span>{" "}
          and every goal is a celebration. With a vibrant fanbase and the
          loudest cheers in the league, Ultras Malappuram is known for its
          electrifying atmosphere, young local talents, and fearless football.
        </motion.p>

        <motion.p
          variants={childVariants}
          className="text-base md:text-lg lg:text-xl leading-relaxed text-gray-300 text-justify"
        >
          We play not just for trophies, but for every soul in Malappuram who
          believes in the beautiful game. Together, we chant, we rise, and we
          fight for glory. This is more than a club —{" "}
          <strong className="text-white">this is Malappuram’s roar.</strong>
        </motion.p>

        <motion.div variants={childVariants} className="mt-8">
          <span className="inline-block px-6 py-3 text-[#1A1F3C] bg-orange-400 hover:bg-orange-500 transition-colors rounded-full text-xl font-semibold shadow-xl">
            #RoarOfMalappuram{" "}
          </span>
        </motion.div>
      </div>

      {/* Image Section */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
        whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex-shrink-0"
      >
        <img
          src="/ultras.jpeg"
          alt="Ultras Malappuram"
          className="rounded-2xl shadow-2xl w-full max-w-md h-auto object-cover"
        />
      </motion.div>
    </motion.div>
  );
};

export default About;
