import { useState, useEffect } from "react";
import { Cookie, Check, X } from "lucide-react";
import {
  grantAnalyticsConsent,
  denyAnalyticsConsent,
  hasAnalyticsConsent,
} from "../../lib/tracking";

export default function CookieSettings() {
  const [isOpen, setIsOpen] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  useEffect(() => {
    setAnalyticsEnabled(hasAnalyticsConsent());
  }, [isOpen]);

  const handleToggle = () => {
    if (analyticsEnabled) {
      denyAnalyticsConsent();
      setAnalyticsEnabled(false);
    } else {
      grantAnalyticsConsent();
      setAnalyticsEnabled(true);
    }
  };

  const handleClearAll = () => {
    localStorage.removeItem('analytics_consent');
    denyAnalyticsConsent();
    setAnalyticsEnabled(false);
    // Optionally reload to show consent banner again
    // window.location.reload();
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 z-40 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium shadow-lg transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-900"
        title="Cookie Settings"
      >
        <Cookie className="h-4 w-4" />
        <span className="hidden sm:inline">Cookies</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 z-40 w-80 max-w-[calc(100vw-2rem)] rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl dark:border-slate-800 dark:bg-slate-950">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <Cookie className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          <h3 className="font-semibold hl-heading">Cookie Settings</h3>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="rounded-lg p-1 transition hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-4 space-y-3">
        <div className="rounded-lg border border-slate-200 p-3 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium hl-heading">Essential</p>
              <p className="text-xs hl-muted">Required for basic functionality</p>
            </div>
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-500/10">
              <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 p-3 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium hl-heading">Analytics</p>
              <p className="text-xs hl-muted">Help us improve your experience</p>
            </div>
            <button
              onClick={handleToggle}
              className={`relative h-6 w-11 rounded-full transition ${
                analyticsEnabled
                  ? "bg-indigo-600 dark:bg-indigo-500"
                  : "bg-slate-300 dark:bg-slate-600"
              }`}
              aria-label="Toggle analytics"
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${
                  analyticsEnabled ? "left-5" : "left-0.5"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={handleClearAll}
        className="mt-3 w-full rounded-lg border border-slate-300 px-3 py-2 text-xs font-medium hl-body transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
      >
        Clear all preferences & reset
      </button>

      <p className="mt-3 text-[11px] hl-muted">
        Changes take effect immediately. Visit our Privacy Policy to learn more.
      </p>
    </div>
  );
}
