import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Menu, X, Home, Info, Mail, Car, History, Inbox, Settings, LifeBuoy, ListChecks, ClipboardList
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import usePendingCount from "../../hooks/usePendingCount";

const navLinkClass = ({ isActive }) =>
  [
    "relative flex items-center gap-3 rounded-lg px-4 py-2 text-base font-medium transition",
    isActive
      ? "bg-indigo-600 text-white"
      : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-700",
  ].join(" ");

export default function MobileNav() {
  const { user } = useAuth();
  const pending = usePendingCount();
  const [open, setOpen] = useState(false);
  const sidebarRef = useRef(null);

  // Build links based on auth/role
  const links = React.useMemo(() => {
    if (!user) {
      return [
        { to: "/", label: "Home", end: true, Icon: Home },
        { to: "/about", label: "About", Icon: Info },
        { to: "/contact", label: "Contact", Icon: Mail },
        { to: "/rides", label: "Rides", Icon: Car },
      ];
    }
    if (user.role === "driver") {
      return [
        { to: "/", label: "Home", end: true, Icon: Home },
        { to: "/history", label: "History", Icon: History },
        { to: "/inbox", label: "Inbox", Icon: Inbox },
        { to: "/requests", label: "Requests", Icon: ClipboardList, showBadge: true },
        { to: "/my-rides", label: "My Rides", Icon: ListChecks },
        { to: "/my-car", label: "My Car", Icon: Car },
        { to: "/settings", label: "Settings", Icon: Settings },
        { to: "/support", label: "Support", Icon: LifeBuoy },
      ];
    }
    return [
      { to: "/", label: "Home", end: true, Icon: Home },
      { to: "/history", label: "History", Icon: History },
      { to: "/inbox", label: "Inbox", Icon: Inbox },
      { to: "/settings", label: "Settings", Icon: Settings },
      { to: "/support", label: "Support", Icon: LifeBuoy },
    ];
  }, [user]);

  // lock scroll when open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = prev);
  }, [open]);

  // click outside to close
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
      {/* Hamburger / Close */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="md:hidden inline-flex items-center justify-center rounded-xl border px-3 py-2 text-gray-700 hover:bg-gray-100"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed left-0 top-0 z-50 h-dvh w-72 transform bg-white shadow-lg transition-transform duration-300 md:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 shadow-sm">
          <h2 className="text-lg font-semibold">
            HopLink<span className="text-indigo-600">Carpooling</span>
          </h2>
          <button
            onClick={() => setOpen(false)}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="px-4 py-4 space-y-2">
          {links.map(({ to, label, end, Icon, showBadge }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={navLinkClass}
              onClick={() => setOpen(false)}
            >
              {React.createElement(Icon, { className: "h-5 w-5 shrink-0" })}
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
