import { useState, useEffect } from "react";
import { Cookie, X } from "lucide-react";
import {
  grantAnalyticsConsent,
  denyAnalyticsConsent,
  hasConsentChoice,
} from "../../lib/tracking";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show banner if user hasn't made a choice yet
    if (!hasConsentChoice()) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    grantAnalyticsConsent();
    setIsVisible(false);
  };

  const handleDecline = () => {
    denyAnalyticsConsent();
    setIsVisible(false);
  };

  const handleClose = () => {
    // If they close without choosing, treat as declined
    denyAnalyticsConsent();
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6">
      <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl dark:border-slate-800 dark:bg-slate-950 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-500/10">
            <Cookie className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          </div>

          <div className="flex-1">
            <h3 className="text-base font-semibold hl-heading sm:text-lg">
              Cookie Consent
            </h3>
            <p className="mt-2 text-sm hl-body">
              We use cookies and analytics to improve your experience and understand how you interact with our site. We respect your privacy and comply with GDPR regulations. You can change your preferences at any time in settings.
            </p>

            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={handleAccept}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
              >
                Accept all cookies
              </button>
              <button
                type="button"
                onClick={handleDecline}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium hl-body transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
              >
                Decline analytics
              </button>
            </div>

            <p className="mt-3 text-xs hl-muted">
              By accepting, you agree to our use of cookies for analytics. Essential cookies are always active. Learn more in our{" "}
              <a href="/privacy" className="underline hover:text-indigo-600 dark:hover:text-indigo-400">
                Privacy Policy
              </a>.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="shrink-0 rounded-lg p-1 transition hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Close cookie banner"
          >
            <X className="h-5 w-5 text-slate-500" />
          </button>
        </div>
      </div>
    </div>
  );
}
