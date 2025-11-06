// src/components/CreateCard.jsx
import React from "react";

export default function CreateCard({ ride }) {
  if (!ride) return null;

  return (
    <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-lg">
      <h2 className="text-base font-semibold text-slate-800 mb-2">
        Ride {ride.isEdited ? "updated" : "created"}
      </h2>
      <p className="text-sm text-slate-700">
        {ride.from} → {ride.to}
      </p>
      <p className="text-sm text-slate-700">
        Date: <span className="font-medium">{ride.date || "—"}</span>
      </p>
      <p className="text-sm text-slate-700">
        Status: <span className="font-medium capitalize">{ride.status}</span>
      </p>
      <p className="text-sm text-slate-700">
        Trip type:{" "}
        <span className="font-medium">
          {ride.tripType === "return" ? "Return (round trip)" : "Single"}
        </span>
      </p>
      <p className="text-sm text-slate-700">
        Seats: <span className="font-medium">{ride.seats}</span>
      </p>
      <p className="text-sm text-slate-700">
        Departure: <span className="font-medium">{ride.departureTime || "—"}</span>
      </p>
      <p className="text-sm text-slate-700">
        Arrival: <span className="font-medium">{ride.arrivalTime || "—"}</span>
      </p>
      <p className="text-sm text-slate-700">
        Distance: <span className="font-medium">{ride.km} km</span>
      </p>
      <p className="text-xs text-slate-400 mt-2">
        {ride.isEdited
          ? "You updated this ride."
          : "This is the ride you just created."}
      </p>
    </div>
  );
}
