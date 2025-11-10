import { useState } from "react";
import { MapPin, Calendar, Users, Filter } from "lucide-react";
import cities from "../../data/cities.json";

export default function RideFilter({ initial = {}, onSearch }) {
  const [origin, setOrigin] = useState(initial.origin || "");
  const [destination, setDestination] = useState(initial.destination || "");
  const [date, setDate] = useState(initial.date || "");
  const [minSeats, setMinSeats] = useState(initial.minSeats || "");

  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-lg font-semibold flex items-center gap-2">
        <Filter className="h-5 w-5" /> Find a ride
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        <div className="flex flex-col gap-1 md:col-span-2">
          <label className="text-sm text-slate-700 flex items-center gap-2">
            <MapPin className="h-4 w-4" /> From
          </label>
          <select className="rounded-lg border px-3 py-2 bg-white" value={origin} onChange={(e)=>setOrigin(e.target.value)}>
            <option value="">Any</option>
            {cities.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1 md:col-span-2">
          <label className="text-sm text-slate-700 flex items-center gap-2">
            <MapPin className="h-4 w-4" /> To
          </label>
          <select className="rounded-lg border px-3 py-2 bg-white" value={destination} onChange={(e)=>setDestination(e.target.value)}>
            <option value="">Any</option>
            {cities.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-slate-700 flex items-center gap-2">
            <Calendar className="h-4 w-4" /> Date
          </label>
          <input type="date" className="rounded-lg border px-3 py-2" value={date} onChange={(e)=>setDate(e.target.value)} />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-slate-700 flex items-center gap-2">
            <Users className="h-4 w-4" /> Min seats
          </label>
          <select className="rounded-lg border px-3 py-2 bg-white" value={minSeats} onChange={(e)=>setMinSeats(e.target.value)}>
            <option value="">Any</option>
            {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>

        <div className="md:col-span-4" />

        <div>
          <button
            onClick={() => onSearch?.({
              origin: origin || undefined,
              destination: destination || undefined,
              date: date || undefined,
              minSeats: minSeats || undefined,
            })}
            className="w-full rounded-xl bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
