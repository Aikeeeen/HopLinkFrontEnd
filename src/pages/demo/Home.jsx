import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Car,
  Map,
  Inbox,
  ClipboardList,
  Settings,
  Info,
  LifeBuoy,
} from "lucide-react";
import DemoQuickTourDesktop from "../../components/tutorial/DemoQuickTourDesktop";
import DemoQuickTourMobile from "../../components/tutorial/DemoQuickTourMobile";

const TOUR_STORAGE_KEY = "hoplink_demo_quick_tour_seen_v1";

export default function Home() {
  const [showTour, setShowTour] = useState(false);

  // Show the tour only the first time for this browser
  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      const seen = window.localStorage.getItem(TOUR_STORAGE_KEY);
      if (!seen) {
        setShowTour(true);
        window.localStorage.setItem(TOUR_STORAGE_KEY, "true");
      }
    } catch {
      // localStorage might fail in some environments; ignore
    }
  }, []);

  const closeTour = () => setShowTour(false);

  return (
    <>
      <DemoQuickTourDesktop open={showTour} onClose={closeTour} />
      <DemoQuickTourMobile open={showTour} onClose={closeTour} />

      <section className="min-h-[70vh] flex flex-col gap-8 sm:gap-10">
        {/* Top: page title + quick actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight hl-heading">
              HopLink demo home
            </h1>
            <p className="mt-2 text-sm hl-body max-w-xl">
              This is a local, fake environment to explore what a carpooling
              app could feel like. Use the links below to jump into the main
              areas of the demo.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 justify-start sm:justify-end">
            <button
              type="button"
              className="hl-btn-secondary"
              onClick={() => setShowTour(true)}
            >
              Show quick tour again
            </button>
            <NavLink to="/demo/explore" className="hl-btn-primary">
              Go to Explore
            </NavLink>
          </div>
        </div>

        {/* Quick links grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <NavLink to="/demo/explore" className="hl-card p-4 flex gap-3">
            <div className="mt-1 h-9 w-9 rounded-2xl bg-indigo-100 flex items-center justify-center dark:bg-indigo-500/20">
              <Map className="h-5 w-5 text-indigo-600 dark:text-indigo-300" />
            </div>
            <div>
              <h2 className="text-sm font-semibold hl-heading">
                Explore routes & rides
              </h2>
              <p className="mt-1 text-xs hl-body">
                Browse example commutes and see how shared rides could be
                suggested along a route.
              </p>
            </div>
          </NavLink>

          <NavLink to="/demo/my-rides" className="hl-card p-4 flex gap-3">
            <div className="mt-1 h-9 w-9 rounded-2xl bg-emerald-100 flex items-center justify-center dark:bg-emerald-500/20">
              <Car className="h-5 w-5 text-emerald-600 dark:text-emerald-300" />
            </div>
            <div>
              <h2 className="text-sm font-semibold hl-heading">
                Manage your rides
              </h2>
              <p className="mt-1 text-xs hl-body">
                View and tweak your demo rides as a driver or passenger. Great
                for testing flows.
              </p>
            </div>
          </NavLink>

          <NavLink to="/demo/requests" className="hl-card p-4 flex gap-3">
            <div className="mt-1 h-9 w-9 rounded-2xl bg-amber-100 flex items-center justify-center dark:bg-amber-500/20">
              <ClipboardList className="h-5 w-5 text-amber-700 dark:text-amber-200" />
            </div>
            <div>
              <h2 className="text-sm font-semibold hl-heading">
                Ride requests
              </h2>
              <p className="mt-1 text-xs hl-body">
                See how requests could look for drivers, with simple accept and
                decline flows.
              </p>
            </div>
          </NavLink>

          <NavLink to="/demo/inbox" className="hl-card p-4 flex gap-3">
            <div className="mt-1 h-9 w-9 rounded-2xl bg-sky-100 flex items-center justify-center dark:bg-sky-500/20">
              <Inbox className="h-5 w-5 text-sky-700 dark:text-sky-200" />
            </div>
            <div>
              <h2 className="text-sm font-semibold hl-heading">
                Demo inbox
              </h2>
              <p className="mt-1 text-xs hl-body">
                Check how basic messaging or status updates could appear between
                riders.
              </p>
            </div>
          </NavLink>

          <NavLink to="/demo/settings" className="hl-card p-4 flex gap-3">
            <div className="mt-1 h-9 w-9 rounded-2xl bg-slate-100 flex items-center justify-center dark:bg-slate-700/50">
              <Settings className="h-5 w-5 text-slate-700 dark:text-slate-200" />
            </div>
            <div>
              <h2 className="text-sm font-semibold hl-heading">
                Demo settings
              </h2>
              <p className="mt-1 text-xs hl-body">
                Adjust basic preferences to get a feel for how settings screens
                could behave.
              </p>
            </div>
          </NavLink>

          {/* Support card: help-only wording */}
          <NavLink to="/demo/support" className="hl-card p-4 flex gap-3">
            <div className="mt-1 h-9 w-9 rounded-2xl bg-rose-100 flex items-center justify-center dark:bg-rose-500/20">
              <LifeBuoy className="h-5 w-5 text-rose-700 dark:text-rose-200" />
            </div>
            <div>
              <h2 className="text-sm font-semibold hl-heading">Support</h2>
              <p className="mt-1 text-xs hl-body">
                See how a help and support area could look – for questions,
                issues with rides, or general app guidance.
              </p>
            </div>
          </NavLink>
        </div>

        {/* Demo info box */}
        <div className="mt-6">
          {/* Mobile: simple text block */}
          <div className="md:hidden hl-empty text-left text-xs sm:text-sm">
            <p className="font-medium hl-heading text-sm mb-1.5">
              About this demo
            </p>
            <ul className="list-disc pl-4 space-y-1 hl-body">
              <li>Data lives only in your browser (no real backend).</li>
              <li>Use fake emails and passwords — this is not secure.</li>
              <li>
                You can switch between driver and passenger by creating
                different demo accounts.
              </li>
            </ul>
          </div>

          {/* Desktop: nicer info card */}
          <div className="hidden md:flex hl-card p-5 items-start gap-4">
            <div className="mt-1 rounded-2xl bg-indigo-50 p-2.5 dark:bg-indigo-500/20">
              <Info className="h-5 w-5 text-indigo-600 dark:text-indigo-300" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-semibold hl-heading text-sm">
                  About this demo
                </p>
                <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium hl-muted dark:bg-slate-800">
                  Local only · Not production
                </span>
              </div>

              <div className="mt-2 grid gap-3 md:grid-cols-2 text-sm">
                <ul className="list-disc pl-4 space-y-1 hl-body">
                  <li>
                    Data lives only in your browser using a local demo database.
                    There is no real backend.
                  </li>
                  <li>
                    Passwords are not hashed and nothing is stored securely.
                    Always use fake credentials.
                  </li>
                </ul>
                <ul className="list-disc pl-4 space-y-1 hl-body">
                  <li>
                    Create different demo accounts to switch between driver and
                    passenger views.
                  </li>
                  <li>
                    Treat this as a prototype to explore flows, not a live
                    service.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
