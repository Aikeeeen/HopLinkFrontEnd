import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import RideFilter from "../components/explore/RideFilter";
import BrowseRideCard from "../components/explore/BrowseRideCard";
import { joinRide, leaveRide, listAllRidesForBrowse } from "../lib/db";

export default function Explore() {
  const { user } = useAuth();
  const [filters, setFilters] = useState({});
  const [rides, setRides] = useState([]);
  const [fallback, setFallback] = useState([]);

  const load = useCallback(async () => {
    // Passengers don’t want to see their own rides in Explore
    const excludeOwner = !!user && user.role === "passenger";

    const rows = await listAllRidesForBrowse(
      { ...filters, excludeOwner, showFull: false },
      user?.id ?? null
    );
    setRides(rows);

    // Fallbacks if no exact matches
    if (rows.length === 0) {
      if (filters.origin) {
        // 1) Exact same origin
        const sameOrigin = await listAllRidesForBrowse(
          { origin: filters.origin, excludeOwner, showFull: false },
          user?.id ?? null
        );
        if (sameOrigin.length) {
          setFallback(sameOrigin);
          return;
        }
        // 2) Prefix on origin
        const prefix = filters.origin.slice(0, 3);
        if (prefix.length >= 2) {
          const originPrefixRows = await listAllRidesForBrowse(
            { originPrefix: prefix, excludeOwner, showFull: false },
            user?.id ?? null
          );
          if (originPrefixRows.length) {
            setFallback(originPrefixRows);
            return;
          }
        }
      }
      // 3) Some rides, no filters
      const anyRows = await listAllRidesForBrowse(
        { excludeOwner, showFull: false },
        user?.id ?? null
      );
      setFallback(anyRows);
    } else {
      setFallback([]);
    }
  }, [filters, user]);

  useEffect(() => {
    load();
  }, [load]);

  const handleSearch = (f) => {
    setFilters(f); // triggers load() via effect
  };

  const handleJoin = async (ride) => {
    if (!user) return alert("Please log in first.");
    try {
      await joinRide(ride.id, user.id); // becomes 'pending'
      await load();
    } catch (e) {
      alert(e.message || "Could not join ride");
    }
  };

  const handleLeave = async (ride) => {
    if (!user) return;
    await leaveRide(ride.id, user.id);
    await load();
  };

  const canJoin = (r) => !!user && user.role === "passenger" && user.id !== r.ownerId;

  const renderList = (list) => (
    <div className="grid gap-4">
      {list.map((r) => (
        <BrowseRideCard
          key={r.id}
          ride={r}
          canJoin={canJoin(r)}
          joinedStatus={r.joinedStatus /* 'pending' | 'accepted' | null */}
          onJoin={handleJoin}
          onLeave={handleLeave}
        />
      ))}
    </div>
  );

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <RideFilter initial={filters} onSearch={handleSearch} />

      {rides.length === 0 ? (
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-700">No exact matches.</p>
          {fallback.length > 0 ? (
            <>
              <p className="mt-2 text-sm text-slate-600">Here are some nearby options:</p>
              <div className="mt-4">{renderList(fallback)}</div>
            </>
          ) : (
            <p className="mt-2 text-sm text-slate-500">
              Try different filters to see available rides.
            </p>
          )}
        </div>
      ) : (
        renderList(rides)
      )}
    </div>
  );
}
