import { useState } from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const navLinkClass = ({ isActive }) =>
  [
    "block px-3 py-2 rounded-xl text-sm font-medium transition",
    isActive ? "bg-indigo-600 text-white" : "text-gray-700 hover:bg-gray-100",
  ].join(" ");

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Toggle */}
      <button
        className="md:hidden inline-flex items-center justify-center rounded-xl border px-3 py-2 text-gray-700 hover:bg-gray-100"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label="Toggle navigation"
      >
        <span className="sr-only">Open main menu</span>
        <svg
          className={`h-5 w-5 ${open ? "hidden" : "block"}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path strokeWidth="2" strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
        </svg>
        <svg
          className={`h-5 w-5 ${open ? "block" : "hidden"}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path strokeWidth="2" strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Menu */}
      <div id="mobile-menu" className={`md:hidden ${open ? "block" : "hidden"} border-t bg-white`}>
        <nav className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8 space-y-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={navLinkClass}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
}
