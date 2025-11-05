import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const navLinkClass = ({ isActive }) =>
  [
    "px-3 py-2 rounded-xl text-sm font-medium transition",
    isActive ? "bg-indigo-600 text-white" : "text-gray-700 hover:bg-gray-100",
  ].join(" ");

export default function DesktopNav() {
  return (
    <nav className="hidden md:flex items-center gap-2">
      {links.map((l) => (
        <NavLink key={l.to} to={l.to} end={l.end} className={navLinkClass}>
          {l.label}
        </NavLink>
      ))}
    </nav>
  );
}
