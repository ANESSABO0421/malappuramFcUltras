import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";

const App = () => {
  return (
    <div className="bg-[#1A1F3C]">
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
};

export default App;
