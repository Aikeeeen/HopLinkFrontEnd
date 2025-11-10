import { NavLink } from "react-router-dom";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import AuthButtons from "../auth/AuthButtons";
import AuthButtonsMobile from "../auth/AuthButtonsMobile";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/90 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <NavLink to="/" className="text-xl font-semibold tracking-tight">
            HopLink<span className="text-indigo-600">Carpooling</span>
          </NavLink>

          {/* Center nav (desktop) */}
          <div className="hidden md:block">
            <DesktopNav />
          </div>

          {/* Right side auth controls */}
          {/* Desktop: full buttons / Mobile: compact icons */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex">
              <AuthButtons />
            </div>
            <div className="md:hidden">
              <AuthButtonsMobile />
            </div>

            {/* Mobile hamburger */}
            <div className="md:hidden">
              <MobileNav />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
