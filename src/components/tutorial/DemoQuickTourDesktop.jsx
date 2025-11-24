import { Info } from "lucide-react";

export default function DemoQuickTourDesktop({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 hidden md:flex items-center justify-center px-4">
      {/* Backdrop */}
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/70"
        onClick={onClose}
        aria-label="Close tour"
      />

      {/* Card */}
      <div className="relative max-w-lg w-full hl-card p-6 sm:p-8">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-full bg-indigo-100 p-2 dark:bg-indigo-500/20">
            <Info className="h-4 w-4 text-indigo-600 dark:text-indigo-300" />
          </div>
          <div>
            <h2 className="text-xl font-semibold tracking-tight hl-heading">
              Welcome to the HopLink demo
            </h2>
            <p className="mt-2 text-sm hl-body">
              This demo runs entirely in your browser with fake data. Nothing is
              stored securely or sent to a real server.
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-3 text-sm hl-body">
          <div className="flex gap-3">
            <div className="mt-0.5 h-6 w-6 rounded-full bg-slate-100 text-slate-700 grid place-items-center text-xs font-semibold dark:bg-slate-800 dark:text-slate-100">
              1
            </div>
            <div>
              <p className="font-medium hl-heading text-sm">
                Use the main navigation
              </p>
              <p className="text-sm hl-body">
                On desktop, the top navigation and bottom taskbar are your main
                way around the demo. Use them to jump between Home, Explore,
                Inbox, Requests, History, My Rides, Settings, and more.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="mt-0.5 h-6 w-6 rounded-full bg-slate-100 text-slate-700 grid place-items-center text-xs font-semibold dark:bg-slate-800 dark:text-slate-100">
              2
            </div>
            <div>
              <p className="font-medium hl-heading text-sm">
                Login or create a demo account
              </p>
              <p className="text-sm hl-body">
                Use the Login and Register buttons in the top-right to switch
                between guest, passenger, and driver views. This reveals extra
                sections like History, My Rides, My Car, Settings, and Support.
                Always use fake credentials.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="mt-0.5 h-6 w-6 rounded-full bg-slate-100 text-slate-700 grid place-items-center text-xs font-semibold dark:bg-slate-800 dark:text-slate-100">
              3
            </div>
            <div>
              <p className="font-medium hl-heading text-sm">
                Explore rides, requests, and messages
              </p>
              <p className="text-sm hl-body">
                <strong>Home</strong> brings you back to this overview.{" "}
                <strong>Explore</strong> shows example rides,{" "}
                <strong>Requests</strong> simulates coordination between drivers
                and passengers, and <strong>Inbox</strong> gives a feel for
                messaging and notifications.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="mt-0.5 h-6 w-6 rounded-full bg-slate-100 text-slate-700 grid place-items-center text-xs font-semibold dark:bg-slate-800 dark:text-slate-100">
              4
            </div>
            <div>
              <p className="font-medium hl-heading text-sm">
                Create rides as a driver
              </p>
              <p className="text-sm hl-body">
                When you&apos;re logged in as a <strong>driver</strong>, you can
                create and manage demo rides from the <strong>My Rides</strong>{" "}
                area and the primary actions in the interface. Passengers can
                browse and request rides, but only drivers create them.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={onClose}
            className="hl-btn-primary"
          >
            Got it, start exploring
          </button>
          <p className="text-xs hl-muted max-w-xs sm:text-right">
            We&apos;ll remember this on this device and won&apos;t show the tour
            automatically again. You can always open it from the Home page.
          </p>
        </div>
      </div>
    </div>
  );
}
