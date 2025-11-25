import { Trash2, Pencil } from "lucide-react";
import RideDetailsGrid from "./RideDetailsGrid";
import RideCardHeader from "./RideCardHeader";
import OpenGroupChatButton from "./OpenGroupChatButton";

export default function RideCard({
  ride,
  ownerName,
  onDelete,
  onEdit,
  // new explicit handlers:
  onOpenDetails,
  onOpenChat,
  // legacy fallback (will still work):
  onOpen,
}) {
  if (!ride) return null;

  const handleEditClick = (e) => {
    e.stopPropagation();
    if (onEdit) onEdit(ride);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (onDelete) onDelete(ride);
  };

  const handleOpenDetailsClick = (e) => {
    e.stopPropagation();
    const cb = onOpenDetails || onOpen;
    if (cb) cb(ride);
  };

  const handleOpenChatClick = (e) => {
    e.stopPropagation();
    const cb = onOpenChat || onOpen;
    if (cb) cb(ride);
  };

  const headerRightSlot = (
    <>
      {onEdit && (
        <button
          type="button"
          onClick={handleEditClick}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          aria-label="Edit ride"
          title="Edit ride"
        >
          <Pencil className="h-4 w-4" />
        </button>
      )}
      {onDelete && (
        <button
          type="button"
          onClick={handleDeleteClick}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          aria-label="Delete ride"
          title="Delete ride"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      )}
    </>
  );

  return (
    <div className="hl-card p-4 hover:shadow-md transition">
      <RideCardHeader ride={ride} rightSlot={headerRightSlot} />

      <RideDetailsGrid ride={ride} ownerName={ownerName} />

      {ride.km != null && (
        <p className="mt-2 text-xs hl-muted">Estimated {ride.km} km</p>
      )}

      {(onOpenDetails || onOpen || onOpenChat) && (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs hl-muted">
            You are the driver for this ride.
          </p>

          <div className="flex flex-wrap gap-2">
            {(onOpenDetails || onOpen) && (
              <button
                type="button"
                onClick={handleOpenDetailsClick}
                className="hl-btn-secondary px-4 py-2 text-xs"
              >
                View details
              </button>
            )}

            {(onOpenChat || onOpen) && (
              <OpenGroupChatButton onClick={handleOpenChatClick} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
