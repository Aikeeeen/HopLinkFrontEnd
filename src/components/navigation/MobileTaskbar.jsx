import { NavLink, useNavigate } from "react-router-dom";
import { Home, ClipboardList, Inbox, Plus, Map } from "lucide-react";
import usePendingCount from "../../hooks/usePendingCount";
import { useAuth } from "../../context/AuthContext";

const baseBtn =
  "relative flex flex-col items-center justify-center gap-1 text-xs font-medium transition-colors";
const navClass = ({ isActive }) =>
  [
    baseBtn,
    "text-gray-600 hover:text-indigo-600",
    isActive ? "text-indigo-600" : "",
  ].join(" ");

export default function MobileTaskbar() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const pending = usePendingCount();

  return (
    <div className="md:hidden">
      <nav
        className="
          fixed bottom-0 inset-x-0 z-40
          border-t bg-white/90 backdrop-blur
          h-16
          pb-[env(safe-area-inset-bottom)]
        "
        aria-label="Mobile navigation"
      >
        <div className="relative flex h-full items-center justify-between px-6">
          {/* Left side */}
          <div className="flex items-center gap-8">
            <NavLink to="/explore" className={navClass} aria-label="Explore">
              <Map className="h-5 w-5" />
              <span>Explore</span>
            </NavLink>

            <NavLink to="/" end className={navClass} aria-label="Home">
              <Home className="h-5 w-5" />
              <span>Home</span>
            </NavLink>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-8">
            <NavLink to="/requests" className={navClass} aria-label="Requests">
              <div className="relative">
                <ClipboardList className="h-5 w-5" />
                {user?.role === "driver" && pending > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-red-600 text-white text-[10px] leading-4 text-center">
                    {pending > 99 ? "99+" : pending}
                  </span>
                )}
              </div>
              <span>Requests</span>
            </NavLink>

            <NavLink to="/inbox" className={navClass} aria-label="Inbox">
              <Inbox className="h-5 w-5" />
              <span>Inbox</span>
            </NavLink>
          </div>

          {/* Center FAB */}
          <button
            aria-label="Create ride"
            onClick={() => navigate("/my-rides")}
            className="
              absolute -top-6 left-1/2 -translate-x-1/2
              h-14 w-14 rounded-full
              bg-indigo-600 text-white shadow-lg
              inline-flex items-center justify-center
              ring-4 ring-white
              active:scale-95 transition
            "
          >
            <Plus className="h-7 w-7" />
          </button>
        </div>
      </nav>

      <div className="h-20" />
    </div>
  );
}
