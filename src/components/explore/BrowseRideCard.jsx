import {
  Car,
  MapPin,
  Calendar,
  Clock,
  Users,
  User as UserIcon,
  Hourglass,
} from "lucide-react";

/**
 * Props:
 * - ride: { origin, destination, date, departTime, arriveTime, seats, tripType, remaining, ownerName, joinedStatus }
 * - canJoin: boolean
 * - joinedStatus: 'pending' | 'accepted' | null
 * - onJoin(ride), onLeave(ride)
 */
export default function BrowseRideCard({ ride, canJoin, joinedStatus, onJoin, onLeave }) {
  const isPending = joinedStatus === "pending";
  const isAccepted = joinedStatus === "accepted";
  const remaining = Number(ride.remaining ?? 0);

  // color logic for seat badge
  const seatColor =
    remaining <= 0
      ? "bg-red-100 text-red-700"
      : remaining <= 3
      ? "bg-amber-100 text-amber-700"
      : "bg-green-100 text-green-700";

  const seatLabel = remaining <= 0 ? "Full" : `${remaining} left`;

  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between">
        <h3 className="text-base font-semibold flex items-center gap-2">
          <Car className="h-4 w-4" />
          {ride.origin} → {ride.destination}
        </h3>

        {/* Status badges (stack for mobile) */}
        <div className="flex flex-col items-end gap-1">
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium ${seatColor}`}
            title="Seats remaining"
          >
            <Users className="h-3.5 w-3.5" />
            {seatLabel}
          </span>

          {isPending && (
            <span
              className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200"
              title="Request pending approval"
            >
              <Hourglass className="h-3.5 w-3.5" />
              Pending
            </span>
          )}

          {isAccepted && (
            <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium bg-emerald-100 text-emerald-700">
              Joined
            </span>
          )}
        </div>
      </div>

      {/* Details */}
      <div className="mt-3 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
        <div className="flex items-center gap-2">
          <UserIcon className="h-4 w-4" />
          {ride.ownerName || "Unknown"}
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

      {/* Actions */}
      {canJoin && (
        <div className="mt-3 flex flex-wrap gap-2">
          {isAccepted ? (
            <button
              onClick={() => onLeave?.(ride)}
              className="rounded-xl border px-4 py-2 text-sm hover:bg-gray-100"
            >
              Leave ride
            </button>
          ) : isPending ? (
            <>
              <button
                disabled
                className="rounded-xl bg-indigo-600 px-4 py-2 text-sm text-white opacity-60 cursor-not-allowed"
              >
                Request sent
              </button>
              <button
                onClick={() => onLeave?.(ride)}
                className="rounded-xl border px-4 py-2 text-sm hover:bg-gray-100"
              >
                Withdraw
              </button>
            </>
          ) : (
            <button
              disabled={remaining <= 0}
              onClick={() => onJoin?.(ride)}
              className="rounded-xl bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700 disabled:opacity-60"
            >
              Join ride
            </button>
          )}
        </div>
      )}
    </div>
  );
}
