import { Car } from "lucide-react";

export default function RideCardHeader({ ride, rightSlot, className = "" }) {
  if (!ride) return null;

  return (
    <div className={`flex items-start justify-between gap-2 ${className}`}>
      <h3 className="text-base font-semibold flex items-center gap-2 hl-heading">
        <Car className="h-4 w-4" />
        {ride.origin} → {ride.destination}
      </h3>

      {rightSlot && <div className="flex items-center gap-1">{rightSlot}</div>}
    </div>
  );
}
