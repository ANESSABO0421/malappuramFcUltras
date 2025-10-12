import React, { useState } from "react";
import axios from "axios";

const Admin = () => {
  const [formData, setFormData] = useState({
    club: "",
    played: 0,
    won: 0,
    draw: 0,
    lost: 0,
    gf: 0,
    ga: 0,
    gd: 0,
    points: 0,
    last5: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/standings", formData);
      alert("Team added successfully!");
      setFormData({
        club: "",
        played: 0,
        won: 0,
        draw: 0,
        lost: 0,
        gf: 0,
        ga: 0,
        gd: 0,
        points: 0,
        last5: [],
      });
    } catch (err) {
      alert("Error adding team!");
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Team</h2>
      <form onSubmit={handleSubmit} className="grid gap-2">
        {Object.keys(formData).map((key) => (
          key !== "last5" && (
            <div key={key}>
              <label className="block text-sm font-semibold">{key}</label>
              <input
                type={typeof formData[key] === "number" ? "number" : "text"}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="border p-2 w-full rounded"
              />
            </div>
          )
        ))}
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 mt-4 rounded hover:bg-blue-700"
        >
          Add Team
        </button>
      </form>
    </div>
  );
};

export default Admin;
