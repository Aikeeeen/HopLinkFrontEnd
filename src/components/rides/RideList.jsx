import { useCallback, useEffect, useMemo, useState } from "react";
import { listRidesByOwner, deleteRide } from "../../lib/db";
import { useAuth } from "../../context/AuthContext";
import RideCard from "./RideCard";

export default function RideList({ refreshKey = 0, onEdit, onOpen }) {
  const { user } = useAuth();
  const userId = user?.id;
  const ownerName = useMemo(
    () => user?.name?.trim() || user?.email || "Unknown user",
    [user]
  );
  const [rides, setRides] = useState([]);

  const load = useCallback(async () => {
    if (!userId) {
      setRides([]);
      return;
    }
    const rows = await listRidesByOwner(userId);
    setRides(rows);
  }, [userId]);

  useEffect(() => {
    load();
  }, [load, refreshKey]);

  const handleDelete = async (ride) => {
    if (!userId) return;
    await deleteRide(ride.id, userId);
    load();
  };

  if (!userId) return null;

  return (
    <div className="grid gap-4">
      {rides.length === 0 ? (
        <p className="text-sm hl-muted">No rides yet. Create one above.</p>
      ) : (
        rides.map((r) => (
          <RideCard
            key={r.id}
            ride={r}
            ownerName={ownerName}
            onDelete={handleDelete}
            onEdit={onEdit}
            onOpen={onOpen}
          />
        ))
      )}
    </div>
  );
}
