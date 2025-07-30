import React from "react";
import { easeInOut, motion } from "framer-motion";

// Animation variants for container and children
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
      className="min-h-screen py-20 px-6 md:px-20 bg-[#1a1737] text-white"
      id="about"
    >
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2
          variants={childVariants}
          className="text-4xl md:text-5xl font-extrabold text-orange-400 mb-6"
        >
          About Ultras Malappuram FC
        </motion.h2>

        <motion.p
          variants={childVariants}
          className="text-lg md:text-xl leading-relaxed text-gray-200 "
          style={{
            textAlign: "justify",
          }}
        >
          ⚽ <strong className="text-white">Ultras Malappuram FC</strong> isn’t
          just a football club — it’s a movement born from the heart of Kerala’s
          most football-passionate district. Representing{" "}
          <strong className="text-white">Malappuram</strong> in the prestigious{" "}
          <strong className="text-white">Kerala Super League</strong>, we carry
          the pride, grit, and dreams of thousands who breathe football every
          day.
        </motion.p>

        <motion.p
          variants={childVariants}
          className="mt-6 text-lg md:text-xl leading-relaxed text-gray-200"
          style={{
            textAlign: "justify",
          }}
        >
          Our legacy is deeply rooted in the local culture — where streets turn
          into stadiums and every goal is a celebration. With a vibrant fanbase
          and the loudest cheers in the league, Ultras Malappuram is known for
          its electrifying atmosphere, young local talents, and fearless
          football.
        </motion.p>

        <motion.p
          variants={childVariants}
          className="mt-6 text-lg md:text-xl leading-relaxed text-gray-200"
          style={{
            textAlign: "justify",
          }}
        >
          We play not just for trophies, but for every soul in Malappuram who
          believes in the beautiful game. Together, we chant, we rise, and we
          fight for glory. This is more than a club —{" "}
          <strong className="text-white">this is Malappuram’s roar.</strong>
        </motion.p>

        <motion.div variants={childVariants} className="mt-10">
          <span className="inline-block px-6 py-3 text-white bg-orange-400 hover:bg-orange-400 transition-colors rounded-full text-xl font-semibold shadow-lg">
            #YellowsOfMalappuram
          </span>
        </motion.div>

        <motion.img
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: easeInOut }}
          className="rounded-2xl h-[400px] md:h-[500px] lg:h-[700px]"
        ></motion.img>
      </div>
    </motion.div>
  );
};

export default About;
