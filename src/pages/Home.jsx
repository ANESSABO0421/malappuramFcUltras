
import React from "react";
import Navbar from "../components/Navbar";
import Hero from "./Hero";
import Contact from "./Contact";
import Gallery from "./Gallery";
import About from "./About";
import "../App.css"; // make sure your CSS is imported
import VideoGallery from "./VideoGallery";
import CustomCursor from "../CustomCursor";

const Home = () => {
  return (
    <div className="relative">
      {/* Scrolling Background */}
      <div className="fixed top-0 left-0 w-full h-full z-0 bg-scroll">
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Gallery />
        {/* <CustomCursor/> */}
        {/* <Contact /> */}
        <VideoGallery/>
      </div>
    </div>
  );
};

export default Home;  