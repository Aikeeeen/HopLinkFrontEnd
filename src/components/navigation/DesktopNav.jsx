// src/components/navigation/DesktopNav.jsx
import { useEffect, useRef, useState, useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { MoreHorizontal } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import usePendingCount from "../../hooks/usePendingCount";

const linkClass = ({ isActive }) =>
  [
    "relative px-3 py-2 rounded-xl text-sm font-medium transition",
    isActive ? "bg-indigo-600 text-white" : "text-gray-700 hover:bg-gray-100",
  ].join(" ");

function Badge({ count }) {
  if (!count) return null;
  return (
    <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-red-600 text-white text-[10px] leading-4 text-center">
      {count > 99 ? "99+" : count}
    </span>
  );
}

function MoreMenu({ items }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const location = useLocation();

  // close on route change
  useEffect(() => setOpen(false), [location.pathname]);

  // click outside
  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  if (!items?.length) return null;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="px-3 py-2 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 inline-flex items-center gap-2"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <MoreHorizontal className="h-4 w-4" />
        More
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-xl border bg-white shadow-lg"
        >
          <div className="p-2">
            {items.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  [
                    "block rounded-lg px-3 py-2 text-sm transition",
                    isActive
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-gray-700 hover:bg-gray-50",
                  ].join(" ")
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function DesktopNav() {
  const { user } = useAuth();
  const pending = usePendingCount(); // driver badge

  // Build role-aware primary/secondary sets
  const { primary, secondary } = useMemo(() => {
    if (!user) {
      // Guest
      return {
        primary: [
          { to: "/", label: "Home", end: true },
          { to: "/explore", label: "Explore" },
          { to: "/rides", label: "Rides" },
        ],
        secondary: [
          { to: "/about", label: "About" },
          { to: "/contact", label: "Contact" },
        ],
      };
    }

    if (user.role === "driver") {
      // Driver
      return {
        primary: [
          { to: "/", label: "Home", end: true },
          { to: "/explore", label: "Explore" },
          { to: "/inbox", label: "Inbox" },
          { to: "/requests", label: "Requests", showBadge: true },
          { to: "/my-rides", label: "My Rides" },
        ],
        secondary: [
          { to: "/history", label: "History" },
          { to: "/my-car", label: "My Car" },
          { to: "/settings", label: "Settings" },
          { to: "/support", label: "Support" },
        ],
      };
    }

    // Passenger
    return {
      primary: [
        { to: "/", label: "Home", end: true },
        { to: "/explore", label: "Explore" },
        { to: "/inbox", label: "Inbox" },
      ],
      secondary: [
        { to: "/history", label: "History" },
        { to: "/settings", label: "Settings" },
        { to: "/support", label: "Support" },
      ],
    };
  }, [user]);

  return (
    <nav className="hidden md:flex items-center gap-2">
      {/* Primary inline */}
      {primary.map((l) => (
        <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
          {l.label}
          {l.showBadge && <Badge count={pending} />}
        </NavLink>
      ))}

      {/* Secondary in a compact dropdown */}
      <MoreMenu items={secondary} />
    </nav>
  );
}
