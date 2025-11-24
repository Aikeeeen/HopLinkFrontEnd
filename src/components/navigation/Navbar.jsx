import { NavLink } from "react-router-dom";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import AuthButtons from "../auth/AuthButtons";
import AuthButtonsMobile from "../auth/AuthButtonsMobile";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/90 backdrop-blur dark:bg-slate-950/90 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
            <NavLink to="/demo" className="flex items-center gap-2">
              {/* Mobile brand text instead of logo */}
              <span className="md:hidden text-lg font-semibold hl-heading tracking-tight">
                Hop
                <span className="text-indigo-600">Link</span>
              </span>

              {/* Desktop brand (unchanged) */}
              <span className="hidden md:inline text-xl font-semibold hl-heading tracking-tight">
                HopLink
                <span className="text-indigo-600">Carpooling</span>
              </span>
            </NavLink>

          {/* Center nav (desktop) */}
          <div className="hidden md:block">
            <DesktopNav />
          </div>

          {/* Right side: theme + auth + mobile nav */}
          <div className="flex items-center gap-3">
            {/* Theme toggle (always visible) */}
            <ThemeToggle />

            {/* Desktop auth buttons */}
            <div className="hidden md:flex">
              <AuthButtons />
            </div>

            {/* Mobile auth buttons */}
            <div className="md:hidden">
              <AuthButtonsMobile />
            </div>

            {/* Mobile hamburger/menu */}
            <div className="md:hidden">
              <MobileNav />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
