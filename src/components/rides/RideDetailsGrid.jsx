import {
  MapPin,
  Calendar,
  Clock,
  Users,
  User as UserIcon,
} from "lucide-react";

export default function RideDetailsGrid({
  ride,
  ownerName,
  className = "mt-3",
}) {
  if (!ride) return null;

  const displayedOwner = ownerName || ride.ownerName || "Unknown user";

  return (
    <div className={`${className} grid gap-2 text-sm hl-body sm:grid-cols-2`}>
      <div className="flex items-center gap-2">
        <UserIcon className="h-4 w-4" />
        {displayedOwner}
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
      <div className="flex items-center gap-2 sm:col-span-2">
        <Users className="h-4 w-4" />
        {ride.seats} seats • {ride.tripType}
      </div>
    </div>
  );
}
