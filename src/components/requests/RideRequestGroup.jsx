import { MapPin, Clock, Check, X, UserMinus, Users } from "lucide-react";

export default function RideRequestGroup({
  group,
  onAccept,
  onDecline,
  onRemove,
}) {
  return (
    <div className="hl-card p-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-base font-semibold hl-heading flex items-center gap-2">
            <Users className="h-4 w-4 text-indigo-600" />
            {group.title}
          </h3>
          <p className="mt-1 text-sm hl-body flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gray-400 dark:text-slate-400" />
            <span className="font-medium">{group.origin}</span> →{" "}
            <span className="font-medium">{group.destination}</span>
          </p>
          <p className="text-sm hl-muted flex items-center gap-1">
            <Clock className="h-4 w-4 text-gray-400 dark:text-slate-400" />{" "}
            {group.date}
            {group.departTime && ` • ${group.departTime}`}
          </p>
        </div>
      </div>

      {/* Pending */}
      <div className="mt-4">
        <h4 className="text-sm font-semibold hl-body mb-2">Pending</h4>
        {group.pending.length === 0 ? (
          <div className="hl-empty text-left">
            No pending requests.
          </div>
        ) : (
          <div className="space-y-2">
            {group.pending.map((p) => (
              <div
                key={`p-${group.rideId}-${p.userId}`}
                className="rounded-lg border border-slate-200 dark:border-slate-700 p-3 flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <div className="font-medium hl-heading truncate">
                    {p.name}
                  </div>
                  <div className="text-xs hl-muted truncate">{p.email}</div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => onAccept(group.rideId, p.userId)}
                    aria-label="Accept"
                    title="Accept"
                    className="p-2 sm:px-3 sm:py-1.5 rounded-full sm:rounded-lg bg-green-600 text-white hover:bg-green-700 active:scale-95 transition inline-flex items-center gap-2"
                  >
                    <Check className="h-4 w-4" />
                    <span className="hidden sm:inline text-sm">Accept</span>
                  </button>
                  <button
                    onClick={() => onDecline(group.rideId, p.userId)}
                    aria-label="Decline"
                    title="Decline"
                    className="p-2 sm:px-3 sm:py-1.5 rounded-full sm:rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-800 active:scale-95 transition inline-flex items-center gap-2"
                  >
                    <X className="h-4 w-4" />
                    <span className="hidden sm:inline text-sm">Decline</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Accepted */}
      <div className="mt-5">
        <h4 className="text-sm font-semibold hl-body mb-2">Accepted</h4>
        {group.accepted.length === 0 ? (
          <div className="hl-empty text-left">
            No accepted passengers yet.
          </div>
        ) : (
          <div className="space-y-2">
            {group.accepted.map((a) => (
              <div
                key={`a-${group.rideId}-${a.userId}`}
                className="rounded-lg border border-slate-200 dark:border-slate-700 p-3 flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <div className="font-medium hl-heading truncate">
                    {a.name}
                  </div>
                  <div className="text-xs hl-muted truncate">
                    {a.email}
                  </div>
                </div>

                <button
                  onClick={() => onRemove(group.rideId, a.userId)}
                  aria-label="Remove passenger"
                  title="Remove passenger"
                  className="p-2 sm:px-3 sm:py-1.5 rounded-full sm:rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-800 active:scale-95 transition inline-flex items-center gap-2"
                >
                  <UserMinus className="h-4 w-4" />
                  <span className="hidden sm:inline text-sm">Remove</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
