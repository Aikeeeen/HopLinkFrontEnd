// src/pages/Requests.jsx
import { Users } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import {
  listRequestsGroupedForDriver,
  acceptRideRequest,
  declineRideRequest,
  removeAcceptedPassenger,
} from "../lib/db";
import RideRequestGroup from "../components/requests/RideRequestGroup";

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
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-semibold text-slate-800 mb-2">Join Requests</h1>
        <p className="text-gray-600">Please log in to view your ride requests.</p>
      </div>
    );
  }

  if (!isDriver) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-semibold text-slate-800 mb-2">Join Requests</h1>
        <p className="text-gray-600">Only drivers can view requests for their rides.</p>
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
      <div className="flex items-center gap-3 mb-6">
        <Users className="h-6 w-6 text-indigo-600" />
        <h1 className="text-2xl font-semibold text-slate-800">Join Requests</h1>
      </div>

      {err && (
        <div className="mb-4 rounded-xl bg-red-50 text-red-700 p-3 text-sm">{err}</div>
      )}

      {groups.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 p-6 text-center text-gray-500">
          You don't have any rides yet.
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
