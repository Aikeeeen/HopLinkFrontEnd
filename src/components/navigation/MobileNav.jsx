import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  Info,
  Mail,
  Car,
  History,
  Inbox,
  Settings,
  LifeBuoy,
  ListChecks,
  ClipboardList,
  Map,
  UserCircle,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import usePendingCount from "../../hooks/usePendingCount";

const navLinkClass = ({ isActive }) =>
  [
    "relative flex items-center gap-3 rounded-lg px-4 py-2 text-base font-medium transition",
    isActive
      ? "bg-indigo-600 text-white"
      : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-slate-50",
  ].join(" ");

function initialsFrom(nameOrEmail = "") {
  const src = String(nameOrEmail).trim();
  if (!src) return "U";
  if (src.includes("@")) return src[0]?.toUpperCase() || "U";
  const parts = src.split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0][0]?.toUpperCase() || "U";
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function getMockRating(seedInput) {
  const s = String(seedInput || "");
  const seed = s.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const rating = (4 + (seed % 11) / 10).toFixed(1);
  const reviews = 12 + (seed % 88);
  return { rating, reviews };
}

function UserHeader({ user }) {
  const hasUser = !!user;
  const name = user?.name || user?.email || "Guest";
  const role = user?.role || "guest";
  const initials = initialsFrom(user?.name || user?.email);
  const showRating = hasUser && role !== "guest";
  const { rating, reviews } = showRating
    ? getMockRating(user?.email || user?.name || "")
    : { rating: null, reviews: null };

  const roleClasses =
    role === "driver"
      ? "bg-emerald-100 text-emerald-700"
      : role === "passenger"
      ? "bg-sky-100 text-sky-700"
      : "bg-slate-100 text-slate-600";

  return (
    <div className="px-4 py-3 border-b bg-linear-to-r from-white to-indigo-50">
      <div className="flex items-center gap-3">
        <div className="relative h-10 w-10 rounded-full bg-indigo-600 text-white grid place-items-center font-semibold">
          {initials}
          <span className="absolute inset-0 rounded-full ring-2 ring-white/70" />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="truncate font-semibold text-slate-900">{name}</p>
            <span
              className={`text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded-full ${roleClasses}`}
            >
              {role}
            </span>
          </div>

          {showRating ? (
            <p className="text-xs text-slate-600 mt-0.5">
              <span className="font-medium text-amber-600">{rating} ★</span>{" "}
              <span className="text-slate-500">({reviews})</span>
            </p>
          ) : (
            <p className="text-xs text-slate-500 mt-0.5 italic">
              Not signed in
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MobileNav() {
  const { user } = useAuth();
  const pending = usePendingCount();
  const [open, setOpen] = useState(false);
  const sidebarRef = useRef(null);

  const links = React.useMemo(() => {
    if (!user) {
      return [
        { to: "/demo", label: "Home", end: true, Icon: Home },
        { to: "/demo/about", label: "About", Icon: Info },
        { to: "/demo/contact", label: "Contact", Icon: Mail },
        { to: "/demo/explore", label: "Explore", Icon: Map },
      ];
    }
    if (user.role === "driver") {
      return [
        { to: "/demo", label: "Home", end: true, Icon: Home },
        { to: "/demo/history", label: "History", Icon: History },
        { to: "/demo/inbox", label: "Inbox", Icon: Inbox },
        {
          to: "/demo/requests",
          label: "Requests",
          Icon: ClipboardList,
          showBadge: true,
        },
        { to: "/demo/my-rides", label: "My Rides", Icon: ListChecks },
        { to: "/demo/my-car", label: "My Car", Icon: Car },
        { to: "/demo/settings", label: "Settings", Icon: Settings },
        { to: "/demo/support", label: "Support", Icon: LifeBuoy },
      ];
    }
    // passenger
    return [
      { to: "/demo", label: "Home", end: true, Icon: Home },
      { to: "/demo/history", label: "History", Icon: History },
      { to: "/demo/inbox", label: "Inbox", Icon: Inbox },
      { to: "/demo/settings", label: "Settings", Icon: Settings },
      { to: "/demo/support", label: "Support", Icon: LifeBuoy },
    ];
  }, [user]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = prev);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handle = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="md:hidden inline-flex items-center justify-center rounded-xl border px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-slate-200 dark:border-slate-700 dark:hover:bg-slate-800"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <aside
        ref={sidebarRef}
        className={`fixed left-0 top-0 z-50 h-dvh w-72 transform bg-white shadow-lg transition-transform duration-300 md:hidden dark:bg-slate-950 dark:text-slate-50 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-between px-4 py-4 shadow-sm bg-white dark:bg-slate-950">
          <h2 className="text-lg font-semibold">
            HopLink<span className="text-indigo-600">Carpooling</span>
          </h2>
          <button
            onClick={() => setOpen(false)}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-slate-300 dark:hover:bg-slate-800"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <UserHeader user={user} />

        <nav className="px-4 py-4 space-y-2">
          {links.map(({ to, label, end, Icon, showBadge }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={navLinkClass}
              onClick={() => setOpen(false)}
            >
              {React.createElement(Icon || UserCircle, {
                className: "h-5 w-5 shrink-0",
              })}
              <span>{label}</span>

              {showBadge && pending > 0 && (
                <span className="ml-auto inline-flex min-w-5 h-5 px-1 rounded-full bg-red-600 text-white text-[10px] leading-5 justify-center">
                  {pending > 99 ? "99+" : pending}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
