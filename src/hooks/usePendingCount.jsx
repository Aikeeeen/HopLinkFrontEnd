// src/hooks/usePendingCount.js
import { useEffect, useState, useCallback } from "react";
import { countPendingRequests, subscribeToDB } from "../lib/db";
import { useAuth } from "../context/AuthContext";

export default function usePendingCount() {
  const { user } = useAuth();
  const driverId = user?.role === "driver" ? user.id : null;
  const [count, setCount] = useState(0);

  const refresh = useCallback(async () => {
    if (!driverId) return setCount(0);
    const n = await countPendingRequests(driverId);
    setCount(n);
  }, [driverId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    const unsub = subscribeToDB(() => refresh());
    const onFocus = () => refresh();
    window.addEventListener("focus", onFocus);
    return () => {
      unsub();
      window.removeEventListener("focus", onFocus);
    };
  }, [refresh]);

  return count;
}
