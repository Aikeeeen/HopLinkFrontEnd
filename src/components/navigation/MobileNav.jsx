import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, Home, Info, Mail, User } from "lucide-react";

const links = [
  { to: "/", label: "Home", end: true, Icon: Home },
  { to: "/about", label: "About", Icon: Info },
  { to: "/contact", label: "Contact", Icon: Mail },
  { to: "/userview", label: "Userview", Icon: User },
];

const navLinkClass = ({ isActive }) =>
  [
    "flex items-center gap-3 rounded-lg px-4 py-2 text-base font-medium transition",
    isActive
      ? "bg-indigo-600 text-white"
      : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-700",
  ].join(" ");

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const sidebarRef = useRef(null);

  // Prevent background scrolling when sidebar is open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => (document.body.style.overflow = prev);
    }
  }, [open]);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    if (open) document.addEventListener("mousedown", handleClickOutside);
    else document.removeEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <>
      {/* Hamburger / Close button */}
      <button
        onClick={() => setOpen((prev) => !prev)} // toggle open/close
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
          {links.map(({ to, label, end, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={navLinkClass}
              onClick={() => setOpen(false)}
            >
              {React.createElement(Icon, { className: "h-5 w-5" })}
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
