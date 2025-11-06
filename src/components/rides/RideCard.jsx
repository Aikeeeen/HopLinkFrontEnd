import { Car, MapPin, Calendar, Clock, Users, Trash2, Pencil, User as UserIcon } from "lucide-react";

export default function RideCard({ ride, ownerName, onDelete, onEdit }) {
  if (!ride) return null;

  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <h3 className="text-base font-semibold flex items-center gap-2">
          <Car className="h-4 w-4" />
          {ride.origin} → {ride.destination}
        </h3>
        <div className="flex items-center gap-1">
          {onEdit && (
            <button
              onClick={() => onEdit(ride)}
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              aria-label="Edit ride"
              title="Edit ride"
            >
              <Pencil className="h-4 w-4" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(ride)}
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              aria-label="Delete ride"
              title="Delete ride"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="mt-2 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
        <div className="flex items-center gap-2">
          <UserIcon className="h-4 w-4" />
          {ownerName || "Unknown user"}
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          {ride.origin} → {ride.destination}
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          {ride.date}
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          {ride.departTime || "—"} → {ride.arriveTime || "—"}
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          {ride.seats} seats • {ride.tripType}
        </div>
      </div>

      {ride.km != null && (
        <p className="mt-2 text-xs text-slate-500">Estimated {ride.km} km</p>
      )}
    </div>
  );
}
