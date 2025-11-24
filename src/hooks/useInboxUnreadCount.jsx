import { useEffect, useState, useCallback } from "react";
import { countUnreadMessages, subscribeToDB } from "../lib/db";
import { useAuth } from "../context/AuthContext";

export default function useInboxUnreadCount() {
  const { user } = useAuth();
  const userId = user?.id ?? null;
  const [count, setCount] = useState(0);

  const refresh = useCallback(async () => {
    if (!userId) return setCount(0);
    const n = await countUnreadMessages(userId);
    setCount(n);
  }, [userId]);

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
