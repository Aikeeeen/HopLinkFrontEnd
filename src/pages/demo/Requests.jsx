import { Users } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
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

  // Primitive values for hooks / conditions
  const userId = user?.id ?? null;
  const isDriver = user?.role === "driver";

  const [groups, setGroups] = useState([]);
  const [err, setErr] = useState("");

  const load = useCallback(async () => {
    setErr("");

    if (!isDriver || !userId) {
      setGroups([]);
      return;
    }

    try {
      const rows = await listRequestsGroupedForDriver(userId);
      setGroups(rows);
    } catch (e) {
      setErr(e.message || "Failed to load requests");
    }
  }, [isDriver, userId]);

  useEffect(() => {
    load();
  }, [load]);

  // Not signed in
  if (!user) {
    return (
      <div className="hl-page p-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="hl-heading mb-2">Join Requests</h1>
          <p className="hl-body">
            Please log in to view and manage ride requests.
          </p>
        </div>
      </div>
    );
  }

  // Signed in, but not a driver → upsell
  if (!isDriver) {
    return (
      <div className="hl-page p-4">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-6 w-6 text-indigo-600" />
            <h1 className="hl-heading text-xl font-semibold">
              Join Requests
            </h1>
          </div>

          <div className="hl-card p-4 space-y-2">
            <p className="hl-body text-sm">
              Join requests are only available for{" "}
              <span className="font-medium">drivers</span>. Once you&apos;re a
              driver, passengers can request to join rides you create, and
              you&apos;ll be able to review them here.
            </p>
            <p className="hl-body text-sm">
              To become a driver, add your driver&apos;s license and start
              creating rides.
            </p>

            <div className="mt-3 flex flex-wrap gap-3">
              <Link to="/demo/my-rides" className="hl-btn-primary">
                Go to My Rides
              </Link>
              <span className="text-xs hl-muted">
                Tip: From <b>My Rides</b> you can create your first ride as a
                driver.
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Driver: normal requests UI
  const onAccept = async (rideId, passengerId) => {
    try {
      await acceptRideRequest(rideId, passengerId, userId);
      load();
    } catch (e) {
      alert(e.message || "Could not accept request");
    }
  };

  const onDecline = async (rideId, passengerId) => {
    try {
      await declineRideRequest(rideId, passengerId, userId);
      load();
    } catch (e) {
      alert(e.message || "Could not decline request");
    }
  };

  const onRemoveAccepted = async (rideId, passengerId) => {
    try {
      await removeAcceptedPassenger(rideId, passengerId, userId);
      load();
    } catch (e) {
      alert(e.message || "Could not remove passenger");
    }
  };

  return (
    <div className="hl-page p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <Users className="h-6 w-6 text-indigo-600" />
          <h1 className="hl-heading text-xl font-semibold">Join Requests</h1>
        </div>

        {err && (
          <div className="mb-4 hl-card p-3 text-sm bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-200 border-none">
            {err}
          </div>
        )}

        {groups.length === 0 ? (
          <div className="hl-empty">
            You don&apos;t have any rides with pending requests yet.
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
    </div>
  );
}
