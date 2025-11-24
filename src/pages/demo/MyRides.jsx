import { useState } from "react";
import CreateRide from "../../components/rides/CreateRide";
import RideList from "../../components/rides/RideList";

export default function MyRides() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [editingRide, setEditingRide] = useState(null);

  return (
    <div className="min-h-screen p-6 bg-transparent">
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <CreateRide
          editingRide={editingRide}
          onCreated={() => setRefreshKey((k) => k + 1)}
          onSaved={() => {
            setRefreshKey((k) => k + 1);
            setEditingRide(null);
          }}
        />
        <RideList
          refreshKey={refreshKey}
          onEdit={(ride) => setEditingRide(ride)}
        />
      </div>
    </div>
  );
}
