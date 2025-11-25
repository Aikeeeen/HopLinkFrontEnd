import { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, Car, MapPin, Clock, Users } from "lucide-react";
import { getRideWithParticipants } from "../../lib/db";
import OpenGroupChatButton from "../../components/rides/OpenGroupChatButton";
import { useAuth } from "../../context/AuthContext";
import { userIsRideMember } from "../../lib/rideAccess";

export default function RideDetail() {
  const { rideId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const userId = user?.id ?? null;

  const [ride, setRide] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const data = await getRideWithParticipants(Number(rideId));
        if (!cancelled) setRide(data);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [rideId]);

  const costEstimate = useMemo(() => {
    if (!ride?.km) return null;
    const pricePerKm = 0.21; // demo-only estimate
    const total = ride.km * pricePerKm;
    const perSeat = total / ride.seats;
    return {
      km: ride.km,
      total: total.toFixed(2),
      perSeat: perSeat.toFixed(2),
    };
  }, [ride]);

  if (loading) {
    return (
      <div className="hl-page p-4">
        <p className="hl-body">Loading ride details…</p>
      </div>
    );
  }

  if (!ride) {
    return (
      <div className="hl-page p-4">
        <p className="hl-body">Ride not found.</p>
      </div>
    );
  }

  const isOwner = ride.owner.id === userId;
  const isMember = userIsRideMember(ride, userId);

  // Only owner or accepted passengers may view details
  if (!isMember) {
    return (
      <div className="hl-page p-4">
        <button
          type="button"
          onClick={() => navigate("/demo/explore")}
          className="mb-4 inline-flex items-center gap-2 text-sm hl-link-muted"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Explore
        </button>

        <div className="hl-card p-4">
          <p className="hl-body">
            You don&apos;t have access to this ride. Only the driver and
            passengers who have joined this ride can view the details.
          </p>
        </div>
      </div>
    );
  }

  const acceptedPassengers = ride.passengers.filter(
    (p) => p.status === "accepted"
  );

  return (
    <div className="hl-page p-4">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-4 inline-flex items-center gap-2 text-sm hl-link-muted"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <div className="grid gap-6 lg:grid-cols-[2fr,1.3fr]">
        {/* Left: main ride info */}
        <div className="hl-card p-5 sm:p-6 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="inline-flex items-center gap-2 text-[11px] uppercase tracking-wide hl-muted">
                <Car className="h-3.5 w-3.5" />
                Ride overview
              </p>
              <h1 className="mt-1 text-xl sm:text-2xl font-semibold hl-heading">
                {ride.origin} → {ride.destination}
              </h1>
              <p className="mt-1 text-sm hl-muted">
                {ride.date}
                {ride.departTime ? ` · Depart ${ride.departTime}` : ""}
                {ride.arriveTime ? ` · Arrive ${ride.arriveTime}` : ""}
              </p>
              <p className="mt-1 text-xs hl-muted">
                {isOwner
                  ? "You are the driver for this ride."
                  : "You have joined this ride as a passenger."}
              </p>
            </div>

            {/* Small chat button, reusing shared component */}
            <OpenGroupChatButton
              onClick={() => navigate(`/demo/rides/${ride.id}/chat`)}
            />
          </div>

          {/* Map-ish placeholder */}
          <div className="mt-2 rounded-2xl bg-linear-to-r from-indigo-500/10 via-emerald-500/10 to-slate-100 p-4 flex items-center justify-between gap-4 dark:from-indigo-500/20 dark:via-emerald-500/20 dark:to-slate-900">
            <div>
              <p className="text-xs font-medium hl-muted mb-1.5">
                Demo map placeholder
              </p>
              <p className="text-sm hl-body">
                In a real app, this could show the planned route between{" "}
                <span className="font-medium">{ride.origin}</span> and{" "}
                <span className="font-medium">{ride.destination}</span>.
              </p>
            </div>
            <div className="hidden sm:flex flex-col items-end gap-1 text-xs hl-muted">
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {ride.origin}
              </span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {ride.destination}
              </span>
              {ride.departTime && (
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {ride.departTime}
                  {ride.arriveTime ? ` → ${ride.arriveTime}` : ""}
                </span>
              )}
            </div>
          </div>

          {/* Driver + seats */}
          <div className="grid gap-4 sm:grid-cols-2 mt-3">
            <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-900/60">
              <p className="text-xs font-medium hl-muted mb-1">Driver</p>
              <p className="text-sm font-semibold hl-heading">
                {ride.owner.name || ride.owner.email}
              </p>
              <p className="text-xs hl-muted mt-1">
                {ride.owner.role === "driver"
                  ? "Primary driver"
                  : "Demo driver"}
              </p>
              <p className="mt-2 text-xs hl-body break-all">
                <span className="font-medium">Contact:</span>{" "}
                {ride.owner.email}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-900/60">
              <p className="text-xs font-medium hl-muted mb-1">
                Seats & passengers
              </p>
              <p className="text-sm hl-heading">
                {acceptedPassengers.length} / {ride.seats} seats filled
              </p>
              <ul className="mt-2 space-y-1 text-xs hl-body">
                <li className="inline-flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span className="font-medium">Joined passengers:</span>
                </li>
                {acceptedPassengers.length === 0 ? (
                  <li className="hl-muted mt-1">No accepted passengers yet.</li>
                ) : (
                  acceptedPassengers.map((p) => (
                    <li key={p.userId} className="pl-4">
                      {p.name || p.email}{" "}
                      <span className="hl-muted">(accepted)</span>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>

          {/* Cost estimate */}
          <div className="mt-3 rounded-xl bg-emerald-50 p-3 text-xs sm:text-sm dark:bg-emerald-500/10">
            <p className="font-medium text-emerald-800 dark:text-emerald-200">
              Cost estimate (demo only)
            </p>
            {costEstimate ? (
              <p className="mt-1 text-emerald-900 dark:text-emerald-100">
                Approx.{" "}
                <span className="font-semibold">
                  €{costEstimate.total} total
                </span>{" "}
                for ~{costEstimate.km} km, around{" "}
                <span className="font-semibold">
                  €{costEstimate.perSeat} per seat
                </span>{" "}
                if split evenly.
              </p>
            ) : (
              <p className="mt-1 text-emerald-900 dark:text-emerald-100">
                Add an approximate distance (km) in <b>My Rides</b> to see a
                rough cost suggestion here.
              </p>
            )}
          </div>
        </div>

        {/* Right: quick actions / meta */}
        <aside className="space-y-4">
          <div className="hl-card p-4 space-y-3">
            <p className="text-xs font-medium hl-muted uppercase tracking-wide">
              Quick actions
            </p>

            <OpenGroupChatButton
              onClick={() => navigate(`/demo/rides/${ride.id}/chat`)}
              className="w-full justify-center"
              showLabelOnMobile
              variant="primary"
            />

            <Link
              to="/demo/my-rides"
              className="text-xs hl-link-muted inline-flex items-center gap-1"
            >
              Manage this ride in My Rides
            </Link>
          </div>

          <div className="hl-card p-4 text-xs hl-body space-y-1.5">
            <p className="font-semibold hl-heading text-sm">Ride metadata</p>
            <p>
              <span className="font-medium">Trip type:</span>{" "}
              {ride.tripType === "return" ? "Return trip" : "Single trip"}
            </p>
            <p>
              <span className="font-medium">Created:</span> {ride.createdAt}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
