import React, { useEffect, useMemo, useState } from "react";
import cities from "../../data/cities.json";
import {
  Car, MapPin, Calendar, Clock, Users, Repeat, AlertCircle,
  IdCard, LogIn
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { createRideRow, updateRideRow } from "../../lib/db";

const estimateDistance = (from, to) => {
  if (!from || !to) return null;
  if (from === to) return 0;
  const hash = (s) => s.toLowerCase().split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const base = Math.abs(hash(from) - hash(to));
  return 60 + (base % 940);
};
const formatDurationFromKm = (km, avg = 80) => {
  const h = Math.floor(km / avg);
  const m = Math.round(((km / avg) - h) * 60);
  return { h, m };
};
const addDurationToTime = (timeStr, duration) => {
  if (!timeStr) return "";
  const [hh, mm] = timeStr.split(":").map((n) => parseInt(n, 10));
  const base = hh * 60 + mm;
  const dur = duration.h * 60 + duration.m;
  const total = (base + dur) % (24 * 60);
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
};

export default function CreateRide({ onCreated, onSaved, editingRide = null }) {
  const { user } = useAuth();

  const [origin, setOrigin] = useState(editingRide?.origin || "");
  const [destination, setDestination] = useState(editingRide?.destination || "");
  const [date, setDate] = useState(editingRide?.date || "");
  const [seats, setSeats] = useState(String(editingRide?.seats ?? "4"));
  const [tripType, setTripType] = useState(editingRide?.tripType || "single");
  const [departTime, setDepartTime] = useState(editingRide?.departTime || "");
  const [arriveTime, setArriveTime] = useState(editingRide?.arriveTime || "");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingRide) {
      setOrigin(editingRide.origin || "");
      setDestination(editingRide.destination || "");
      setDate(editingRide.date || "");
      setSeats(String(editingRide.seats ?? "4"));
      setTripType(editingRide.tripType || "single");
      setDepartTime(editingRide.departTime || "");
      setArriveTime(editingRide.arriveTime || "");
      setErrors({});
    }
  }, [editingRide]);

  const distanceKm = useMemo(() => {
    const base = estimateDistance(origin, destination);
    if (base == null) return null;
    return tripType === "return" ? base * 2 : base;
  }, [origin, destination, tripType]);

  const validate = () => {
    const e = {};
    if (!origin) e.origin = "Please select origin";
    if (!destination) e.destination = "Please select destination";
    if (origin && destination && origin === destination) e.destination = "Destination must differ";
    if (!date) e.date = "Please choose a date";
    if (!departTime) e.departTime = "Please choose a departure time";
    if (!seats) e.seats = "Please choose seats";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleCreateOrUpdate = async () => {
    if (!user) {
      setErrors({ form: "Please log in first." });
      return;
    }
    if (!validate()) return;

    const km = distanceKm ?? 0;
    const dur = formatDurationFromKm(km);
    const computedArrive = addDurationToTime(departTime, dur);

    let ride;
    if (editingRide) {
      ride = await updateRideRow(editingRide.id, user.id, {
        origin, destination, date, departTime,
        arriveTime: computedArrive, seats, tripType, km,
      });
      setArriveTime(computedArrive);
      onSaved?.(ride);
    } else {
      ride = await createRideRow({
        ownerId: user.id,
        origin,
        destination,
        date,
        departTime,
        arriveTime: computedArrive,
        seats,
        tripType,
        km,
      });
      setArriveTime(computedArrive);
      onCreated?.(ride);

      // optional reset
      setOrigin(""); setDestination(""); setDate("");
      setDepartTime(""); setArriveTime(""); setSeats("4"); setTripType("single");
    }
  };

  // --- GATING UI ---

  // Not logged in
  if (!user) {
    return (
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="mb-2 text-xl font-semibold flex items-center gap-2">
          <Car className="h-5 w-5" /> Create Ride
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          You need an account to create rides.
        </p>
        <div className="flex gap-3">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm hover:bg-gray-100"
          >
            <LogIn className="h-4 w-4" /> Login
          </Link>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700"
          >
            Create account
          </Link>
        </div>
      </div>
    );
  }

  // Passenger
  if (user.role !== "driver") {
    return (
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-indigo-50 p-3">
            <IdCard className="h-6 w-6 text-indigo-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold">
              Would you also like to create rides?
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Add your driver’s license to become a{" "}
              <span className="font-medium">Driver</span>.  
              You’ll be able to post rides and manage requests.
            </p>

            <button
              onClick={() => alert("Driver verification coming soon!")}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
            >
              <IdCard className="h-4 w-4" />
              Add driver’s license
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Driver show form
  const Help = ({ msg }) =>
    msg ? (
      <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
        <AlertCircle className="h-3.5 w-3.5" /> {msg}
      </p>
    ) : null;

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-slate-800 flex items-center gap-2">
        <Car className="h-5 w-5" /> {editingRide ? "Edit Ride" : "Create Ride"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        {/* FROM */}
        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <MapPin className="h-4 w-4" /> From
          </label>
          <select
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className={`px-3 py-2 rounded-lg border ${errors.origin ? "border-red-300 ring-red-200" : "border-slate-200"} focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white`}
          >
            <option value="">Select a city…</option>
            {cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <Help msg={errors.origin} />
        </div>

        {/* TO */}
        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <MapPin className="h-4 w-4" /> To
          </label>
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className={`px-3 py-2 rounded-lg border ${errors.destination ? "border-red-300 ring-red-200" : "border-slate-200"} focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white`}
          >
            <option value="">Select a city…</option>
            {cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <Help msg={errors.destination} />
        </div>

        {/* DATE */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <Calendar className="h-4 w-4" /> Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={`px-3 py-2 rounded-lg border ${errors.date ? "border-red-300 ring-red-200" : "border-slate-200"} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          />
          <Help msg={errors.date} />
        </div>

        {/* DEPART */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <Clock className="h-4 w-4" /> Departure
          </label>
          <input
            type="time"
            value={departTime}
            onChange={(e) => setDepartTime(e.target.value)}
            className={`px-3 py-2 rounded-lg border ${errors.departTime ? "border-red-300 ring-red-200" : "border-slate-200"} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          />
          <Help msg={errors.departTime} />
        </div>

        {/* ARRIVAL (auto) */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <Clock className="h-4 w-4" /> Arrival (auto)
          </label>
          <input
            type="time"
            value={arriveTime}
            readOnly
            className="px-3 py-2 rounded-lg border border-slate-200 bg-slate-50"
          />
        </div>

        {/* SEATS */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <Users className="h-4 w-4" /> Seats
          </label>
          <select
            value={seats}
            onChange={(e) => setSeats(e.target.value)}
            className={`px-3 py-2 rounded-lg border ${errors.seats ? "border-red-300 ring-red-200" : "border-slate-200"} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          >
            <option value="">Select seats…</option>
            {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
          <Help msg={errors.seats} />
        </div>
      </div>

      {/* Trip type */}
      <div className="mt-4 flex gap-6 items-center flex-wrap">
        <span className="text-sm font-medium text-slate-700">Trip type:</span>
        <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
          <input
            type="radio"
            name="tripType"
            value="single"
            checked={tripType === "single"}
            onChange={() => setTripType("single")}
          />
          Single
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
          <input
            type="radio"
            name="tripType"
            value="return"
            checked={tripType === "return"}
            onChange={() => setTripType("return")}
          />
          <Repeat className="h-4 w-4" /> Return
        </label>
      </div>

      <div className="mt-4">
        <button
          onClick={handleCreateOrUpdate}
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          {editingRide ? "Save changes" : "Create ride"}
        </button>
      </div>

      {/* Live summary */}
      {distanceKm != null && (
        <p className="mt-3 text-sm text-slate-600">
          Estimated distance: <span className="font-medium">{distanceKm} km</span>
        </p>
      )}

      {/* Form-level error */}
      {errors.form && (
        <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{errors.form}</div>
      )}
    </div>
  );
}
