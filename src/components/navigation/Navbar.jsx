import { NavLink } from "react-router-dom";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import AuthButtons from "./AuthButtons";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/90 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid h-16 grid-cols-3 items-center">
          {/* Left */}
          <div className="justify-self-start">
            <NavLink to="/" className="text-xl font-semibold tracking-tight">
              HopLink<span className="text-indigo-600">Carpooling</span>
            </NavLink>
          </div>

          {/* Center */}
          <div className="justify-self-center">
            <DesktopNav />
          </div>

          {/* Right */}
          <div className="flex items-center justify-end gap-3">
            <AuthButtons />
            <div className="md:hidden">
              <MobileNav />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
