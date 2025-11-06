import React, { useState } from "react";

const europeanCities = [
  // Romania
  "Bucharest",
  "Cluj-Napoca",
  "Timișoara",
  "Iași",
  "Constanța",
  "Craiova",
  "Brașov",
  "Galați",
  "Ploiești",
  "Oradea",
  "Brăila",
  "Arad",
  "Pitești",
  "Sibiu",
  "Bacău",
  "Târgu Mureș",
  "Baia Mare",
  "Buzău",
  "Satu Mare",
  "Suceava",
  "Piatra Neamț",
  "Drobeta-Turnu Severin",
  "Târgoviște",

  // Bulgaria
  "Sofia",
  "Plovdiv",
  "Varna",
  "Burgas",
  "Ruse",
  "Stara Zagora",
  "Pleven",
  "Sliven",
  "Dobrich",
  "Shumen",
  "Pernik",
  "Haskovo",
  "Yambol",
  "Blagoevgrad",
  "Veliko Tarnovo",
  "Vidin",

  // Slovakia
  "Bratislava",
  "Košice",
  "Prešov",
  "Žilina",
  "Nitra",
  "Banská Bystrica",
  "Trnava",
  "Trenčín",
  "Martin",
  "Poprad",

  // Poland
  "Warsaw",
  "Kraków",
  "Łódź",
  "Wrocław",
  "Poznań",
  "Gdańsk",
  "Szczecin",
  "Bydgoszcz",
  "Lublin",
  "Białystok",
  "Katowice",
  "Gdynia",
  "Częstochowa",
  "Radom",
  "Sosnowiec",
  "Rzeszów",
  "Toruń",
  "Kielce",
  "Gliwice",
  "Zabrze",
  "Bytom",
  "Olsztyn",
  "Bielsko-Biała",
  "Rybnik",
  "Ruda Śląska",
  "Tychy",
  "Opole",
  "Elbląg",
  "Płock",
  "Gorzów Wielkopolski",
  "Zielona Góra"
];

// fake distance calculator so UI works
function estimateDistance(from, to) {
  if (!from || !to) return null;
  if (from === to) return 0;

  const hash = (str) =>
    str
      .toLowerCase()
      .split("")
      .reduce((acc, ch) => acc + ch.charCodeAt(0), 0);

  const base = Math.abs(hash(from) - hash(to));
  const distance = 60 + (base % 940); // 60..1000 km
  return distance;
}

function formatDurationFromKm(km, avgSpeed = 80) {
  const hours = km / avgSpeed;
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return { h, m };
}

export default function Userview() {
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [seats, setSeats] = useState("4");
  const [tripType, setTripType] = useState("single"); // single | return
  const [route, setRoute] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = () => {
    if (!fromCity || !toCity) {
      setError("Please select both a start and destination city.");
      setRoute(null);
      return;
    }
    setError("");
    const baseKm = estimateDistance(fromCity, toCity);
    if (baseKm === null) {
      setRoute(null);
      setError("Could not calculate route.");
      return;
    }

    // if return -> double distance
    const finalKm = tripType === "return" ? baseKm * 2 : baseKm;
    const time = formatDurationFromKm(finalKm);

    setRoute({
      from: fromCity,
      to: toCity,
      km: finalKm,
      time,
      seats,
      tripType
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-xl p-6">
        <h1 className="text-xl font-semibold mb-4 text-slate-800">
          Eastern Europe Route Planner
        </h1>

        {/* inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* FROM */}
          <div className="flex flex-col gap-2">
            <label htmlFor="from" className="text-sm font-medium text-slate-700">
              From
            </label>
            <input
              id="from"
              list="european-cities"
              value={fromCity}
              onChange={(e) => setFromCity(e.target.value)}
              className="px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type or select a city..."
            />
          </div>

          {/* TO */}
          <div className="flex flex-col gap-2">
            <label htmlFor="to" className="text-sm font-medium text-slate-700">
              To
            </label>
            <input
              id="to"
              list="european-cities"
              value={toCity}
              onChange={(e) => setToCity(e.target.value)}
              className="px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type or select a city..."
            />
          </div>

          {/* SEATS */}
          <div className="flex flex-col gap-2">
            <label htmlFor="seats" className="text-sm font-medium text-slate-700">
              Seats in car
            </label>
            <select
              id="seats"
              value={seats}
              onChange={(e) => setSeats(e.target.value)}
              className="px-3 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="1">1 person</option>
              <option value="2">2 persons</option>
              <option value="3">3 persons</option>
              <option value="4">4 persons</option>
              <option value="5">5 persons</option>
              <option value="6">6 persons</option>
              <option value="7">7 persons</option>
              <option value="8">8 persons</option>
            </select>
          </div>
        </div>

        {/* shared datalist for cities */}
        <datalist id="european-cities">
          {europeanCities.map((city) => (
            <option key={city} value={city} />
          ))}
        </datalist>

        {/* trip type: single / return */}
        <div className="mt-4 flex gap-6 items-center">
          <span className="text-sm font-medium text-slate-700">Trip type:</span>
          <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
            <input
              type="radio"
              name="tripType"
              value="single"
              checked={tripType === "single"}
              onChange={(e) => setTripType(e.target.value)}
            />
            Single
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
            <input
              type="radio"
              name="tripType"
              value="return"
              checked={tripType === "return"}
              onChange={(e) => setTripType(e.target.value)}
            />
            Return
          </label>
        </div>

        {/* search button */}
        <div className="mt-4">
          <button
            onClick={handleSearch}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Search route
            <span aria-hidden="true">→</span>
          </button>
        </div>

        {/* error */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* route result */}
        {route && (
          <div className="mt-6 p-4 bg-slate-50 border border-slate-100 rounded-lg">
            <h2 className="text-lg font-semibold text-slate-800 mb-2">
              Route found
            </h2>
            <p className="text-sm text-slate-700 mb-1">
              {route.from} → {route.to}
            </p>
            <p className="text-sm text-slate-700">
              Trip type:{" "}
              <span className="font-medium">
                {route.tripType === "return" ? "Return (round trip)" : "Single"}
              </span>
            </p>
            <p className="text-sm text-slate-700">
              Distance: <span className="font-medium">{route.km} km</span>
            </p>
            <p className="text-sm text-slate-700">
              Estimated driving time:{" "}
              <span className="font-medium">
                {route.time.h}h {route.time.m}m
              </span>{" "}
              (at ~80 km/h)
            </p>
            <p className="text-sm text-slate-700">
              Seats available: <span className="font-medium">{route.seats}</span>
            </p>
            <p className="text-xs text-slate-400 mt-2">
              *Demo estimate. Plug in a real maps API for accurate routes.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
