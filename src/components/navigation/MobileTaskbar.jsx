import { NavLink, useNavigate } from "react-router-dom";
import { Home, ClipboardList, Inbox, Plus, Map } from "lucide-react";
import usePendingCount from "../../hooks/usePendingCount";
import { useAuth } from "../../context/AuthContext";

const baseBtn = "hl-bottom-nav-link";
const navClass = ({ isActive }) =>
  [baseBtn, isActive ? "hl-bottom-nav-link-active" : ""].join(" ");

export default function MobileTaskbar() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const pending = usePendingCount();

  return (
    <div className="md:hidden">
      <nav
        className="
          fixed bottom-0 inset-x-0 z-40
          hl-bottom-nav
          h-16
          pb-[env(safe-area-inset-bottom)]
        "
        aria-label="Mobile navigation"
      >
        <div className="flex h-full items-center justify-between px-6">
          {/* Left side */}
          <div className="flex items-center gap-8">
            <NavLink
              to="/demo/explore"
              className={navClass}
              aria-label="Explore"
            >
              <Map className="h-5 w-5" />
              <span>Explore</span>
            </NavLink>

            <NavLink
              to="/demo"
              end
              className={navClass}
              aria-label="Home"
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </NavLink>
          </div>

          {/* Center FAB */}
          <button
            aria-label="Create ride"
            onClick={() => navigate("/demo/my-rides")}
            className="
              hl-bottom-nav-fab
              -translate-y-1
            "
          >
            <Plus className="h-6 w-6" />
          </button>

          {/* Right side */}
          <div className="flex items-center gap-8">
            <NavLink
              to="/demo/requests"
              className={navClass}
              aria-label="Requests"
            >
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

            <NavLink
              to="/demo/inbox"
              className={navClass}
              aria-label="Inbox"
            >
              <Inbox className="h-5 w-5" />
              <span>Inbox</span>
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Spacer so content doesn't sit behind the bar */}
      <div className="h-20" />
    </div>
  );
}
