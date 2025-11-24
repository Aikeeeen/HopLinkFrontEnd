import {
  Car,
  MapPin,
  Calendar,
  Clock,
  Users,
  User as UserIcon,
  Hourglass,
} from "lucide-react";

export default function BrowseRideCard({ ride, canJoin, joinedStatus, onJoin, onLeave }) {
  const isPending = joinedStatus === "pending";
  const isAccepted = joinedStatus === "accepted";
  const remaining = Number(ride.remaining ?? 0);

  const seatColor =
    remaining <= 0
      ? "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-200"
      : remaining <= 3
      ? "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200"
      : "bg-green-100 text-green-700 dark:bg-emerald-500/20 dark:text-emerald-200";

  const seatLabel = remaining <= 0 ? "Full" : `${remaining} left`;

  return (
    <div className="hl-card p-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <h3 className="text-base font-semibold flex items-center gap-2 hl-heading">
          <Car className="h-4 w-4" />
          {ride.origin} → {ride.destination}
        </h3>

        <div className="flex flex-col items-end gap-1">
          <span
            className={`hl-badge-pill ${seatColor}`}
            title="Seats remaining"
          >
            <Users className="h-3.5 w-3.5" />
            {seatLabel}
          </span>

          {isPending && (
            <span
              className="hl-badge-pill bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-500/20 dark:text-amber-200"
              title="Request pending approval"
            >
              <Hourglass className="h-3.5 w-3.5" />
              Pending
            </span>
          )}

          {isAccepted && (
            <span className="hl-badge-pill bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200">
              Joined
            </span>
          )}
        </div>
      </div>

      {/* Details */}
      <div className="mt-3 grid gap-2 text-sm hl-body sm:grid-cols-2">
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
              className="hl-btn-secondary px-4 py-2"
            >
              Leave ride
            </button>
          ) : isPending ? (
            <>
              <button
                disabled
                className="hl-btn-primary opacity-60 cursor-not-allowed"
              >
                Request sent
              </button>
              <button
                onClick={() => onLeave?.(ride)}
                className="hl-btn-secondary px-4 py-2"
              >
                Withdraw
              </button>
            </>
          ) : (
            <button
              disabled={remaining <= 0}
              onClick={() => onJoin?.(ride)}
              className="hl-btn-primary disabled:opacity-60"
            >
              Join ride
            </button>
          )}
        </div>
      )}
    </div>
  );
}
