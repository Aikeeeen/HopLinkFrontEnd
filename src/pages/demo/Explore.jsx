import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../../context/AuthContext";
import RideFilter from "../../components/explore/RideFilter";
import BrowseRideCard from "../../components/explore/BrowseRideCard";
import { joinRide, leaveRide, listAllRidesForBrowse } from "../../lib/db";

export default function Explore() {
  const { user } = useAuth();
  const [filters, setFilters] = useState({});
  const [rides, setRides] = useState([]);
  const [fallback, setFallback] = useState([]);

  const load = useCallback(async () => {
    const excludeOwner = !!user && user.role === "passenger";

    const rows = await listAllRidesForBrowse(
      { ...filters, excludeOwner, showFull: false },
      user?.id ?? null
    );
    setRides(rows);

    if (rows.length === 0) {
      if (filters.origin) {
        const sameOrigin = await listAllRidesForBrowse(
          { origin: filters.origin, excludeOwner, showFull: false },
          user?.id ?? null
        );
        if (sameOrigin.length) {
          setFallback(sameOrigin);
          return;
        }
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

  const handleSearch = (f) => setFilters(f);

  const handleJoin = async (ride) => {
    if (!user) return alert("Please log in first.");
    try {
      await joinRide(ride.id, user.id);
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

  const canJoin = (r) =>
    !!user && user.role === "passenger" && user.id !== r.ownerId;

  const renderList = (list) => (
    <div className="grid gap-4">
      {list.map((r) => (
        <BrowseRideCard
          key={r.id}
          ride={r}
          canJoin={canJoin(r)}
          joinedStatus={r.joinedStatus}
          onJoin={handleJoin}
          onLeave={handleLeave}
        />
      ))}
    </div>
  );

  return (
    <div className="hl-page-wide space-y-6">
      <RideFilter initial={filters} onSearch={handleSearch} />

      {rides.length === 0 ? (
        <div className="hl-card p-6">
          <p className="text-sm hl-body">No exact matches.</p>
          {fallback.length > 0 ? (
            <>
              <p className="mt-2 text-sm hl-body">
                Here are some nearby options:
              </p>
              <div className="mt-4">{renderList(fallback)}</div>
            </>
          ) : (
            <p className="mt-2 text-sm hl-muted">
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
