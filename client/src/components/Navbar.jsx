import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { id: "Hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "Gallery", label: "Gallery" },
  // { id: "Standings", label: "Standings" },
  // { id: "Last-Match", label: "Upcoming-Match" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("hero");
  const [open, setOpen] = useState(false);
  const [shrink, setShrink] = useState(false);

  const toggle = () => setOpen(!open);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let current = "hero";

      sections.forEach((section) => {
        const top = section.offsetTop;
        if (window.scrollY >= top - 120) {
          current = section.id;
        }
      });
      setActive(current);

      // Shrink effect after scrolling 80px
      setShrink(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 backdrop-blur-xl transition-all duration-300 ${
        shrink
          ? "bg-[#0f172a]/80 py-2 shadow-lg"
          : "bg-gradient-to-r from-[#0f172a]/70 via-[#1e293b]/70 to-[#0f172a]/70 py-4"
      }`}
    >
      {/* Floating glowing orb background */}
      <div className="absolute -top-10 left-10 w-40 h-40 bg-orange-500/20 blur-3xl rounded-full animate-pulse" />
      <div className="absolute -bottom-10 right-10 w-40 h-40 bg-sky-500/20 blur-3xl rounded-full animate-pulse" />

      <div className="relative container mx-auto flex justify-between items-center px-6">
        {/* Logo */}
        <motion.img
          src="/ultras2.png"
          alt="Logo"
          className={`cursor-pointer transition-all ${
            shrink ? "h-12" : "h-16"
          }`}
          onClick={() => navigate("/")}
          whileHover={{ scale: 1.1, rotate: 3 }}
          transition={{ type: "spring", stiffness: 200 }}
        />

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8 text-lg font-semibold tracking-wide">
          {navLinks.map((link) => (
            <motion.a
              key={link.id}
              href={`#${link.id}`}
              className={`relative transition-colors duration-300 ${
                active === link.id
                  ? "text-orange-400 drop-shadow-[0_0_10px_rgba(255,165,0,0.8)]"
                  : "text-gray-200 hover:text-orange-300"
              }`}
              whileHover={{ scale: 1.05 }}
            >
              {link.label}
              {/* underline animation */}
              <motion.span
                className="absolute left-0 -bottom-1 h-[2px] bg-gradient-to-r from-orange-400 via-red-500 to-yellow-400 rounded"
                initial={{ width: 0 }}
                animate={{ width: active === link.id ? "100%" : 0 }}
                transition={{ duration: 0.4 }}
              />
            </motion.a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggle}
          className="lg:hidden text-3xl text-orange-400 focus:outline-none"
        >
          {open ? <AiOutlineClose /> : <GiHamburgerMenu />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 20, stiffness: 120 }}
            className="fixed top-0 right-0 h-screen w-3/4 bg-[#0f172a]/95 shadow-2xl z-40 flex flex-col items-center justify-center gap-10 text-2xl"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.id}
                href={`#${link.id}`}
                onClick={toggle}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`tracking-wider ${
                  active === link.id
                    ? "text-orange-400 drop-shadow-[0_0_10px_rgba(255,165,0,0.8)]"
                    : "text-gray-200 hover:text-orange-300"
                }`}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
