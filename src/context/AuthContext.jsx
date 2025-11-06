/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { createUser, loginUser } from "../lib/db";

const SESSION_KEY = "hoplink_session_v1";
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // hydrate session
  useEffect(() => {
  const raw = localStorage.getItem(SESSION_KEY);
  if (raw) {
    try {
      setUser(JSON.parse(raw));
    } catch (e) {
      // handle bad JSON in storage gracefully
      console.warn("Invalid stored session, clearing…", e);
      localStorage.removeItem(SESSION_KEY);
      setUser(null);
    }
  }
}, []);

  // persist session
  useEffect(() => {
    if (user) localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    else localStorage.removeItem(SESSION_KEY);
  }, [user]);

  // API
  const register = async ({ name, email, role, password }) => {
    const u = await createUser({ name, email, role, password });
    setUser(u);
    return u;
  };
  const login = async ({ email, password }) => {
    const u = await loginUser({ email, password });
    setUser(u);
    return u;
  };
  const logout = () => setUser(null);

  const value = useMemo(() => ({ user, register, login, logout }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
