import { Users, Hourglass } from "lucide-react";
import RideDetailsGrid from "../rides/RideDetailsGrid";
import RideCardHeader from "../rides/RideCardHeader";
import OpenGroupChatButton from "../rides/OpenGroupChatButton";

export default function BrowseRideCard({
  ride,
  canJoin,
  joinedStatus,
  onJoin,
  onLeave,
  onOpen,
}) {
  if (!ride) return null;

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

  const handleJoinClick = () => {
    if (!onJoin) return;
    onJoin(ride);
  };

  const handleLeaveClick = () => {
    if (!onLeave) return;
    onLeave(ride);
  };

  const handleOpenClick = (e) => {
    e.stopPropagation();
    if (!onOpen) return;
    onOpen(ride);
  };

  const headerRightSlot = (
    <div className="flex flex-wrap items-center justify-end gap-1">
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
  );

  return (
    <div className="hl-card p-4">
      <RideCardHeader ride={ride} rightSlot={headerRightSlot} />

      <RideDetailsGrid
        ride={ride}
        ownerName={ride.ownerName}
        className="mt-2"
      />

      {/* Actions */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        {/* Join / leave area (left) */}
        {canJoin && (
          <div className="flex flex-wrap gap-2">
            {isAccepted ? (
              <button
                type="button"
                onClick={handleLeaveClick}
                className="hl-btn-secondary px-4 py-2"
              >
                Leave ride
              </button>
            ) : isPending ? (
              <>
                <button
                  type="button"
                  disabled
                  className="hl-btn-primary opacity-60 cursor-not-allowed"
                >
                  Request sent
                </button>
                <button
                  type="button"
                  onClick={handleLeaveClick}
                  className="hl-btn-secondary px-4 py-2"
                >
                  Withdraw
                </button>
              </>
            ) : (
              <button
                type="button"
                disabled={remaining <= 0}
                onClick={handleJoinClick}
                className="hl-btn-primary disabled:opacity-60"
              >
                Join ride
              </button>
            )}
          </div>
        )}

        {/* View / chat (right) */}
        {onOpen && (
          <OpenGroupChatButton onClick={handleOpenClick} />
        )}
      </div>
    </div>
  );
}
