import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { MoreHorizontal } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import usePendingCount from "../../hooks/usePendingCount";
import useInboxUnreadCount from "../../hooks/useInboxUnreadCount";

const linkClass = ({ isActive }) =>
  [
    "relative px-3 py-2 rounded-xl text-sm font-medium transition",
    isActive
      ? "bg-indigo-600 text-white"
      : "text-gray-700 hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-slate-800",
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

  useEffect(() => setOpen(false), [location.pathname]);

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
        className="px-3 py-2 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 inline-flex items-center gap-2 dark:text-slate-200 dark:hover:bg-slate-800"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <MoreHorizontal className="h-4 w-4" />
        More
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-xl border bg-white shadow-lg dark:bg-slate-900 dark:border-slate-700"
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
                      ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-600/20 dark:text-indigo-200"
                      : "text-gray-700 hover:bg-gray-50 dark:text-slate-200 dark:hover:bg-slate-800",
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
  const pending = usePendingCount();
  const inboxUnread = useInboxUnreadCount();

  let primary = [];
  let secondary = [];

  if (!user) {
    // Guest demo nav (inside /demo shell)
    primary = [
      { to: "/demo", label: "Home", end: true },
      { to: "/demo/explore", label: "Explore" },
      { to: "/demo/about", label: "About" },
      { to: "/demo/contact", label: "Contact" },
    ];
    secondary = [];
  } else if (user.role === "driver") {
    // Driver: align with mobile (plus Explore)
    primary = [
      { to: "/demo", label: "Home", end: true },
      { to: "/demo/explore", label: "Explore" },
      { to: "/demo/inbox", label: "Inbox", showInboxBadge: true },
      { to: "/demo/requests", label: "Requests", showPendingBadge: true },
      { to: "/demo/my-rides", label: "My Rides" },
    ];
    secondary = [
      { to: "/demo/history", label: "History" },
      { to: "/demo/my-car", label: "My Car" },
      { to: "/demo/settings", label: "Settings" },
      { to: "/demo/support", label: "Support" },
    ];
    } else {
    // Passenger
    primary = [
      { to: "/demo", label: "Home", end: true },
      { to: "/demo/explore", label: "Explore" },
      { to: "/demo/inbox", label: "Inbox", showInboxBadge: true },
      { to: "/demo/my-rides", label: "My Rides" },
      { to: "/demo/requests", label: "Requests" }, // driver upsell page
    ];
    secondary = [
      { to: "/demo/history", label: "History" },
      { to: "/demo/settings", label: "Settings" },
      { to: "/demo/support", label: "Support" },
    ];
  }



  return (
    <nav className="hidden md:flex items-center gap-2">
      {primary.map((l) => (
        <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
          {l.label}
          {l.showPendingBadge && <Badge count={pending} />}
          {l.showInboxBadge && <Badge count={inboxUnread} />}
        </NavLink>
      ))}
      <MoreMenu items={secondary} />
    </nav>
  );
}
