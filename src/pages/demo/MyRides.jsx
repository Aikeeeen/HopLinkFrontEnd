import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import CreateRide from "../../components/rides/CreateRide";
import RideCard from "../../components/rides/RideCard";
import BrowseRideCard from "../../components/explore/BrowseRideCard";
import {
  listRidesByOwner,
  listJoinedRidesForUser,
  leaveRide,
} from "../../lib/db";

export default function MyRides() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [refreshKey, setRefreshKey] = useState(0);
  const [editingRide, setEditingRide] = useState(null);
  const [drivingRides, setDrivingRides] = useState([]);
  const [joinedRides, setJoinedRides] = useState([]);

  const isDriver = user?.role === "driver";

  const load = useCallback(async () => {
    if (!user) {
      setDrivingRides([]);
      setJoinedRides([]);
      return;
    }

    // Rides you drive
    const mine = await listRidesByOwner(user.id);
    setDrivingRides(mine);

    // Rides you have joined as accepted passenger
    const joined = await listJoinedRidesForUser(user.id);
    setJoinedRides(joined);
  }, [user]);

  useEffect(() => {
    load();
  }, [load, refreshKey]);

  const handleOpenDetails = (ride) => {
    navigate(`/demo/rides/${ride.id}`);
  };

  const handleOpenChat = (ride) => {
    navigate(`/demo/rides/${ride.id}/chat`);
  };

  const handleLeaveJoinedRide = async (ride) => {
    if (!user) return;
    await leaveRide(ride.id, user.id);
    setRefreshKey((k) => k + 1);
  };

  return (
    <div className="min-h-screen p-6 bg-transparent">
      <div className="mx-auto w-full max-w-5xl space-y-8">
        {/* Create / edit area (drivers only) */}
        {isDriver && (
          <CreateRide
            editingRide={editingRide}
            onCreated={() => setRefreshKey((k) => k + 1)}
            onSaved={() => {
              setRefreshKey((k) => k + 1);
              setEditingRide(null);
            }}
          />
        )}

        {/* Rides you're driving */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold hl-heading">
            Rides you&apos;re driving
          </h2>

          {drivingRides.length === 0 ? (
            <p className="text-sm hl-muted">
              {isDriver
                ? "You haven’t created any rides yet."
                : "You’re not a driver yet. Add your driver’s license to start creating rides."}
            </p>
          ) : (
            <div className="grid gap-4">
              {drivingRides.map((ride) => (
                <RideCard
                  key={ride.id}
                  ride={ride}
                  ownerName={user?.name || user?.email}
                  onEdit={isDriver ? (r) => setEditingRide(r) : undefined}
                  onDelete={undefined /* handled wherever you want */}
                  onOpenDetails={handleOpenDetails}
                  onOpenChat={handleOpenChat}
                />
              ))}
            </div>
          )}
        </section>

        {/* Rides you've joined as passenger (or driver joining someone else's ride) */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold hl-heading">
            Rides you&apos;ve joined
          </h2>

          {joinedRides.length === 0 ? (
            <p className="text-sm hl-muted">
              You haven&apos;t joined any rides yet. Use{" "}
              <span className="font-medium">Explore</span> to find a ride.
            </p>
          ) : (
            <div className="grid gap-4">
              {joinedRides.map((ride) => (
                <BrowseRideCard
                  key={ride.id}
                  ride={ride}
                  // Reuse join/leave UX: you're accepted, so you can leave
                  canJoin={true}
                  joinedStatus="accepted"
                  onJoin={undefined}
                  onLeave={handleLeaveJoinedRide}
                  onOpen={handleOpenDetails}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
