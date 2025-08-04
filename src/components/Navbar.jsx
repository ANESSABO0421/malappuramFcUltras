import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  anticipate,
} from "framer-motion";

const Navbar = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const toggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let current = "home";

      sections.forEach((section) => {
        const top = section.offsetTop;
        if (window.scrollY >= top - 100) {
          current = section.id;
        }
      });
      setActive(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="fixed bg-[#1A1F3C]/80 backdrop-blur-xl z-50 h-25 w-full flex justify-between transition-all duration-300 ease-out ">
        <div className="flex items-center justify-center sm:px-2 md:px-3 lg:px-4 py-3">
          <motion.img
            src="/ultras2.png"
            alt=""
            className="h-20 px-2 cursor-pointer"
            onClick={() => navigate("/")}
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.05, rotate: 1 }}
          />
        </div>
        <div className="px-4 py-3 hidden lg:flex items-center justify-center text-2xl gap-5 text-white font-bold">
          <a
            href="#hero"
            className={active === "hero" ? "text-[#cf5416]" : "text-white"}
          >
            Home
          </a>
          <a
            href="#about"
            className={active === "about" ? "text-[#cf5416]" : "text-white"}
          >
            About
          </a>
          <a
            href="#players"
            className={active === "players" ? "text-[#cf5416]" : "text-white"}
          >
            Players
          </a>
          <a
            href="#match"
            className={active === "match" ? "text-[#cf5416]" : "text-white"}
          >
            Matches
          </a>
          <a
            href="#gallery"
            className={active === "about" ? "text-[#cf5416]" : "text-white"}
          >
            Gallery
          </a>
          <a
            href="#contact"
            className={active === "contact" ? "text-[#cf5416]" : "text-white"}
          >
            Contact
          </a>
        </div>
        {/* mobile menu */}
        <div className="flex lg:hidden items-center justify-center px-4 py-3 text-3xl">
          {!open ? (
            <button onClick={toggle}>
              <GiHamburgerMenu className="text-[#cf5416]" />
            </button>
          ) : (
            <button onClick={toggle}>
              <AiOutlineClose className="text-[#cf5416]" />
            </button>
          )}
        </div>
        {open && (
          <div
            className="fixed left-0 right-0 bottom-0 top-[100px] z-30 bg-black/50"
            onClick={toggle}
          ></div>
        )}

        <div
          className={`fixed bg-[#1A1F3C] backdrop-blur-sm h-[calc(100vh-100px)] w-full top-[100px] z-50 right-0 flex items-center justify-center flex-col gap-5 text-3xl transition-transform ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <a
            href="#home"
            onClick={toggle}
            className={active === "home" ? "text-[#cf5416]" : "text-white"}
          >
            Home
          </a>
          <a
            href="#about"
            onClick={toggle}
            className={active === "about" ? "text-[#cf5416]" : "text-white"}
          >
            About
          </a>
          <a
            href="#players"
            onClick={toggle}
            className={active === "players" ? "text-[#cf5416]" : "text-white"}
          >
            Players
          </a>
          <a
            href="#match"
            onClick={toggle}
            className={active === "match" ? "text-[#cf5416]" : "text-white"}
          >
            Matches
          </a>
          <a
            href="#gallery"
            onClick={toggle}
            className={active === "gallery" ? "text-[#cf5416]" : "text-white"}
          >
            Gallery
          </a>
          <a
            href="#contact"
            onClick={toggle}
            className={active === "contact" ? "text-[#cf5416]" : "text-white"}
          >
            Contact
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
