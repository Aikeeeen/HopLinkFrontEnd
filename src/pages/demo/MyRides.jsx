import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateRide from "../../components/rides/CreateRide";
import RideList from "../../components/rides/RideList";

export default function MyRides() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [editingRide, setEditingRide] = useState(null);
  const navigate = useNavigate();

  const handleOpenRide = (ride) => {
    navigate(`/demo/rides/${ride.id}`);
  };

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
          onOpen={handleOpenRide}
        />
      </div>
    </div>
  );
}
