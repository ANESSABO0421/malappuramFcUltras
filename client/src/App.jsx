import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/AdminDashboard";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import Teams from "./pages/Teams";
import Matches from "./pages/Matches";

const App = () => {
  return (
    <div className="bg-[#1A1F3C]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="teams" element={<Teams />} />
          <Route path="matches" element={<Matches />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
