


// src/pages/Userview.jsx
import React from "react";
import CreateRide from "../components/CreateRide"; // pas dit pad aan als jouw map anders is

export default function Userview() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-white shadow-md rounded-xl p-6">
        <CreateRide />
      </div>
    </div>
  );
}
