import React from "react";

const Hero = () => {
  return (
    <div className="pt-[100px]">
      <section
        className="relative flex items-center justify-center w-full h-[500px] sm:h-screen md:h-[500px] lg:h-screen overflow-hidden"
        id="hero"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src="/video/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute z-10 text-center px-4">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white drop-shadow-lg text-center">
            Malappuram FC – One Passion. One Team.
          </h1>
          <p className="text-sm sm:text-lg mt-4 text-white drop-shadow-md text-center">
            Join the journey. Witness every goal, tackle, and triumph.
          </p>
          <button className="mt-6 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-full text-white font-semibold transition duration-300">
            Explore Matches
          </button>
        </div>
      </section>
    </div>
  );
};

export default Hero;
