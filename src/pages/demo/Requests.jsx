import { Users } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  listRequestsGroupedForDriver,
  acceptRideRequest,
  declineRideRequest,
  removeAcceptedPassenger,
} from "../../lib/db";
import RideRequestGroup from "../../components/requests/RideRequestGroup";

export default function Requests() {
  const { user } = useAuth();
  const isDriver = !!user && user.role === "driver";
  const [groups, setGroups] = useState([]);
  const [err, setErr] = useState("");

  const load = useCallback(async () => {
    setErr("");
    if (!isDriver) {
      setGroups([]);
      return;
    }
    try {
      const rows = await listRequestsGroupedForDriver(user.id);
      setGroups(rows);
    } catch (e) {
      setErr(e.message || "Failed to load requests");
    }
  }, [isDriver, user?.id]);

  useEffect(() => {
    load();
  }, [load]);

  if (!user) {
    return (
      <div className="hl-page">
        <h1 className="hl-heading mb-2">Join Requests</h1>
        <p className="hl-body">
          Please log in to view your ride requests.
        </p>
      </div>
    );
  }

  if (!isDriver) {
    return (
      <div className="hl-page">
        <h1 className="hl-heading mb-2">Join Requests</h1>
        <p className="hl-body">
          Only drivers can view requests for their rides.
        </p>
      </div>
    );
  }

  const onAccept = async (rideId, passengerId) => {
    try {
      await acceptRideRequest(rideId, passengerId, user.id);
      load();
    } catch (e) {
      alert(e.message || "Could not accept request");
    }
  };

  const onDecline = async (rideId, passengerId) => {
    try {
      await declineRideRequest(rideId, passengerId, user.id);
      load();
    } catch (e) {
      alert(e.message || "Could not decline request");
    }
  };

  const onRemoveAccepted = async (rideId, passengerId) => {
    try {
      await removeAcceptedPassenger(rideId, passengerId, user.id);
      load();
    } catch (e) {
      alert(e.message || "Could not remove passenger");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="hl-section-title-icon">
        <Users className="h-6 w-6 text-indigo-600" />
        <h1 className="hl-heading">Join Requests</h1>
      </div>

      {err && (
        <div className="mb-4 hl-card p-3 text-sm bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-200 border-none">
          {err}
        </div>
      )}

      {groups.length === 0 ? (
        <div className="hl-empty">
          You don&apos;t have any rides yet.
        </div>
      ) : (
        <div className="space-y-6">
          {groups.map((group) => (
            <RideRequestGroup
              key={group.rideId}
              group={group}
              onAccept={onAccept}
              onDecline={onDecline}
              onRemove={onRemoveAccepted}
            />
          ))}
        </div>
      )}
    </div>
  );
}
