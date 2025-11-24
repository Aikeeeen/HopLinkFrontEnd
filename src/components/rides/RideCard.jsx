import { Trash2, Pencil } from "lucide-react";
import RideDetailsGrid from "./RideDetailsGrid";
import RideCardHeader from "./RideCardHeader";
import OpenGroupChatButton from "./OpenGroupChatButton";

export default function RideCard({ ride, ownerName, onDelete, onEdit, onOpen }) {
  if (!ride) return null;

  const handleEditClick = (e) => {
    e.stopPropagation();
    if (onEdit) onEdit(ride);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (onDelete) onDelete(ride);
  };

  const handleOpenClick = (e) => {
    e.stopPropagation();
    if (onOpen) onOpen(ride);
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

      {onOpen && (
        <div className="mt-3 flex justify-end">
          <OpenGroupChatButton onClick={handleOpenClick} />
        </div>
      )}
    </div>
  );
}
