import {
  Info,
  Home,
  Map,
  ClipboardList,
  Inbox,
  Menu,
  LogIn,
  UserPlus,
  Plus,
} from "lucide-react";

export default function DemoQuickTourMobile({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex md:hidden items-end justify-center px-0">
      {/* Backdrop */}
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/70"
        onClick={onClose}
        aria-label="Close tour"
      />

      {/* Bottom sheet */}
      <div className="relative w-full max-h-[80vh] hl-card rounded-b-none rounded-t-2xl p-5 pt-4 overflow-y-auto">
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-slate-300 dark:bg-slate-600" />

        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-full bg-indigo-100 p-2 dark:bg-indigo-500/20">
            <Info className="h-4 w-4 text-indigo-600 dark:text-indigo-300" />
          </div>
          <div>
            <h2 className="text-lg font-semibold tracking-tight hl-heading">
              Quick tour of the demo
            </h2>
            <p className="mt-2 text-xs hl-body">
              The icons at the top and bottom control where you are in the demo.
              Here&apos;s a quick cheat sheet so you know what everything does.
            </p>
          </div>
        </div>

        {/* Icon legend */}
        <div className="mt-4 rounded-2xl bg-slate-50 p-3 dark:bg-slate-900/70">
          <p className="text-[11px] font-medium hl-heading mb-2">
            Navigation & account icons
          </p>

          <div className="grid grid-cols-2 gap-2">
            {/* Hamburger */}
            <div className="flex items-center gap-2 rounded-full bg-white px-2.5 py-1 text-[11px] hl-body shadow-sm dark:bg-slate-900">
              <Menu className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-300" />
              <span>Menu</span>
            </div>

            {/* Auth: Login / Register */}
            <div className="flex items-center gap-2 rounded-full bg-white px-2.5 py-1 text-[11px] hl-body shadow-sm dark:bg-slate-900">
              <LogIn className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-300" />
              <span>Login</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white px-2.5 py-1 text-[11px] hl-body shadow-sm dark:bg-slate-900">
              <UserPlus className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-300" />
              <span>Register</span>
            </div>

            {/* Bottom nav / main sections */}
            <div className="flex items-center gap-2 rounded-full bg-white px-2.5 py-1 text-[11px] hl-body shadow-sm dark:bg-slate-900">
              <Home className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-300" />
              <span>Home</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white px-2.5 py-1 text-[11px] hl-body shadow-sm dark:bg-slate-900">
              <Map className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-300" />
              <span>Explore</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white px-2.5 py-1 text-[11px] hl-body shadow-sm dark:bg-slate-900">
              <ClipboardList className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-300" />
              <span>Requests</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white px-2.5 py-1 text-[11px] hl-body shadow-sm dark:bg-slate-900">
              <Inbox className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-300" />
              <span>Inbox</span>
            </div>

            {/* FAB: create ride */}
            <div className="flex items-center gap-2 rounded-full bg-white px-2.5 py-1 text-[11px] hl-body shadow-sm dark:bg-slate-900 col-span-2">
              <Plus className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-300" />
              <span>Create ride (driver only)</span>
            </div>
          </div>

          <p className="mt-3 text-[11px] hl-muted">
            Extra sections like <span className="font-medium">History</span>,{" "}
            <span className="font-medium">My Rides</span>,{" "}
            <span className="font-medium">My Car</span>,{" "}
            <span className="font-medium">Settings</span>, and{" "}
            <span className="font-medium">Support</span> appear in the menu once
            you&apos;re logged in.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-4 space-y-3 text-xs hl-body">
          <div className="flex gap-3">
            <div className="mt-0.5 h-6 w-6 rounded-full bg-slate-100 text-slate-700 grid place-items-center text-[11px] font-semibold dark:bg-slate-800 dark:text-slate-100">
              1
            </div>
            <div>
              <p className="font-medium hl-heading text-sm">
                Open the main menu
              </p>
              <p className="text-xs hl-body">
                Tap <span className="font-medium">Menu</span> (the three-line
                icon) in the top-right on mobile to open the sidebar with all
                sections.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="mt-0.5 h-6 w-6 rounded-full bg-slate-100 text-slate-700 grid place-items-center text-[11px] font-semibold dark:bg-slate-800 dark:text-slate-100">
              2
            </div>
            <div>
              <p className="font-medium hl-heading text-sm">
                Login or create a demo account
              </p>
              <p className="text-xs hl-body">
                Use the <span className="font-medium">Login</span> and{" "}
                <span className="font-medium">Register</span> buttons in the
                top-right to switch between guest, passenger, and driver views.
                Always use fake credentials.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="mt-0.5 h-6 w-6 rounded-full bg-slate-100 text-slate-700 grid place-items-center text-[11px] font-semibold dark:bg-slate-800 dark:text-slate-100">
              3
            </div>
            <div>
              <p className="font-medium hl-heading text-sm">
                Use Home & Explore to move around
              </p>
              <p className="text-xs hl-body">
                <span className="font-medium">Home</span> brings you back to this
                overview. <span className="font-medium">Explore</span> lets you
                browse example rides, while{" "}
                <span className="font-medium">Requests</span> and{" "}
                <span className="font-medium">Inbox</span> show how coordination
                and messages might look.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="mt-0.5 h-6 w-6 rounded-full bg-slate-100 text-slate-700 grid place-items-center text-[11px] font-semibold dark:bg-slate-800 dark:text-slate-100">
              4
            </div>
            <div>
              <p className="font-medium hl-heading text-sm">
                Create rides as a driver
              </p>
              <p className="text-xs hl-body">
                When you&apos;re logged in as a{" "}
                <span className="font-medium">driver</span>, use the big{" "}
                <span className="font-medium">plus button</span> in the bottom
                navigation or the <span className="font-medium">My Rides</span>{" "}
                section to create and manage demo rides. Passengers can browse
                and request rides, but only drivers create them.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-5 flex flex-col gap-2">
          <button
            type="button"
            onClick={onClose}
            className="hl-btn-primary"
          >
            Got it, start exploring
          </button>
          <p className="text-[11px] hl-muted text-center px-2">
            We&apos;ll remember this on this device and won&apos;t show the tour
            automatically again. You can always open it from the Home page.
          </p>
        </div>
      </div>
    </div>
  );
}
