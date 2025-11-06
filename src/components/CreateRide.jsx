// src/components/CreateRide.jsx
import React, { useState } from "react";
import CreateCard from "./CreateCard";

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

// demo distance
function estimateDistance(from, to) {
  if (!from || !to) return null;
  if (from === to) return 0;
  const hash = (str) =>
    str
      .toLowerCase()
      .split("")
      .reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const base = Math.abs(hash(from) - hash(to));
  return 60 + (base % 940);
}

function formatDurationFromKm(km, avgSpeed = 80) {
  const hours = km / avgSpeed;
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return { h, m };
}

function addDurationToTime(timeStr, duration) {
  if (!timeStr) return "";
  const [hStr, mStr] = timeStr.split(":");
  const baseMins = parseInt(hStr, 10) * 60 + parseInt(mStr, 10);
  const durMins = duration.h * 60 + duration.m;
  const total = (baseMins + durMins) % (24 * 60);
  const finalH = Math.floor(total / 60);
  const finalM = total % 60;
  const pad = (n) => (n < 10 ? `0${n}` : `${n}`);
  return `${pad(finalH)}:${pad(finalM)}`;
}

// date helper
function isUpcoming(dateStr) {
  if (!dateStr) return true;
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];
  return dateStr >= todayStr;
}

export default function CreateRide() {
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [date, setDate] = useState("");
  const [seats, setSeats] = useState("4");
  const [tripType, setTripType] = useState("single");
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [lastRide, setLastRide] = useState(null);
  const [rides, setRides] = useState([]);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);

  // <- hier checken we of from en to hetzelfde zijn
  const sameCity =
    fromCity.trim() !== "" &&
    toCity.trim() !== "" &&
    fromCity.trim().toLowerCase() === toCity.trim().toLowerCase();

  const handleSubmitRide = () => {
    // basic validation
    if (!fromCity || !toCity) {
      setError("Please select both a start and destination city.");
      setLastRide(null);
      return;
    }

    if (sameCity) {
      setError("Start and destination can’t be the same.");
      setLastRide(null);
      return;
    }

    setError("");

    const baseKm = estimateDistance(fromCity, toCity);
    if (baseKm === null) {
      setLastRide(null);
      setError("Could not calculate route.");
      return;
    }

    const finalKm = tripType === "return" ? baseKm * 2 : baseKm;
    const duration = formatDurationFromKm(finalKm);

    let calculatedArrival = "";
    if (departureTime) {
      calculatedArrival = addDurationToTime(departureTime, duration);
      setArrivalTime(calculatedArrival);
    } else {
      setArrivalTime("");
    }

    if (editingId) {
      // update
      const updated = rides.map((r) =>
        r.id === editingId
          ? {
              ...r,
              from: fromCity,
              to: toCity,
              date,
              km: finalKm,
              time: duration,
              seats,
              tripType,
              departureTime,
              arrivalTime: departureTime ? calculatedArrival : "",
              isEdited: true
            }
          : r
      );
      setRides(updated);
      const updatedRide = updated.find((r) => r.id === editingId);
      setLastRide(updatedRide);
      setEditingId(null);
    } else {
      // create
      const newRide = {
        id: Date.now().toString(),
        from: fromCity,
        to: toCity,
        date,
        km: finalKm,
        time: duration,
        seats,
        tripType,
        departureTime,
        arrivalTime: departureTime ? calculatedArrival : "",
        isEdited: false
      };
      setRides((prev) => [...prev, newRide]);
      setLastRide(newRide);
    }
  };

  const handleEdit = (ride) => {
    setFromCity(ride.from);
    setToCity(ride.to);
    setDate(ride.date || "");
    setSeats(ride.seats || "4");
    setTripType(ride.tripType || "single");
    setDepartureTime(ride.departureTime || "");
    setArrivalTime(ride.arrivalTime || "");
    setEditingId(ride.id);
    setError("");
  };

  const handleDelete = (id) => {
    setRides((prev) => prev.filter((r) => r.id !== id));
    if (editingId === id) {
      setEditingId(null);
    }
    setLastRide((prev) => (prev && prev.id === id ? null : prev));
  };

  const upcomingRides = rides.filter((r) => isUpcoming(r.date));

  return (
    <>
      <h1 className="text-xl font-semibold mb-4 text-slate-800">
        {editingId ? "Edit Ride" : "Create Ride"}
      </h1>

      {/* inputs */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
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

        {/* DATE */}
        <div className="flex flex-col gap-2">
          <label htmlFor="date" className="text-sm font-medium text-slate-700">
            Date
          </label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* DEPARTURE TIME */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="departureTime"
            className="text-sm font-medium text-slate-700"
          >
            Departure time
          </label>
          <input
            id="departureTime"
            type="time"
            value={departureTime}
            onChange={(e) => setDepartureTime(e.target.value)}
            className="px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* ARRIVAL TIME */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="arrivalTime"
            className="text-sm font-medium text-slate-700"
          >
            Arrival time
          </label>
          <input
            id="arrivalTime"
            type="time"
            value={arrivalTime}
            readOnly
            className="px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:outline-none"
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

      {/* datalist */}
      <datalist id="european-cities">
        {europeanCities.map((city) => (
          <option key={city} value={city} />
        ))}
      </datalist>

      {/* trip type */}
      <div className="mt-4 flex gap-6 items-center flex-wrap">
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

      {/* button */}
      <div className="mt-4 flex gap-3 items-center">
        <button
          onClick={handleSubmitRide}
          disabled={sameCity}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition ${
            sameCity
              ? "bg-slate-300 text-slate-500 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {editingId ? "Save changes" : "Create ride"}
          <span aria-hidden="true">→</span>
        </button>
        {editingId && (
          <button
            onClick={() => {
              setEditingId(null);
              setError("");
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition"
          >
            Cancel
          </button>
        )}
      </div>

      {/* warning for same city */}
      {sameCity && (
        <div className="mt-3 p-2 bg-red-50 text-red-600 rounded text-sm">
          Start and destination can’t be the same.
        </div>
      )}

      {/* other errors */}
      {error && !sameCity && (
        <div className="mt-3 p-2 bg-red-50 text-red-600 rounded text-sm">
          {error}
        </div>
      )}

      {/* last created/updated */}
      {lastRide && <CreateCard ride={lastRide} />}

      {/* upcoming rides */}
      {upcomingRides.length > 0 && (
        <div className="mt-6">
          <h2 className="text-sm font-semibold text-slate-800 mb-2">
            Upcoming rides
          </h2>
          <div className="max-h-56 overflow-y-auto border border-slate-100 rounded-lg">
            <ul className="divide-y divide-slate-100">
              {upcomingRides.map((r) => (
                <li key={r.id} className="p-3 flex justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate-800">
                      {r.from} → {r.to}
                    </p>
                    <p className="text-xs text-slate-500">
                      {r.date || "no date"} • {r.tripType} • {r.km} km
                    </p>
                    <p className="text-xs text-slate-500">
                      Seats: {r.seats}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    <div className="text-xs text-slate-500 text-right">
                      <p>Dep: {r.departureTime || "—"}</p>
                      <p>Arr: {r.arrivalTime || "—"}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(r)}
                        className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded hover:bg-amber-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(r.id)}
                        className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
