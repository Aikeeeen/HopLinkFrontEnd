import { ArrowRight } from "lucide-react";

export default function FinalCTA({ onTryDemo }) {
  return (
    <section className="mt-16">
      <div className="hl-card-soft p-6 sm:p-8">
        <h2 className="text-2xl font-semibold tracking-tight hl-heading sm:text-3xl">
          Help shape HopLink before launch
        </h2>
        <p className="mt-3 max-w-2xl text-sm hl-body sm:text-base">
          We’re building a safer, more structured alternative to Facebook carpool groups.  
          No monetization, no commercial drivers — just trustworthy, clear intercity travel.  
          Join the early access list and help shape HopLink before launch.
        </p>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href="#waitlist"
            className="hl-btn-primary inline-flex items-center gap-2 rounded-2xl bg-emerald-500 px-5 py-2.5 text-sm font-medium text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400"
          >
            <span>Join early access</span>
            <ArrowRight className="h-4 w-4" />
          </a>

          <button
            type="button"
            onClick={onTryDemo}
            className="rounded-2xl border border-slate-300 px-4 py-2 text-sm font-medium hl-body hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-900"
          >
            Explore the current demo
          </button>
        </div>

        <p className="mt-3 max-w-sm text-xs hl-muted">
          The demo runs locally in your browser — no real data is stored. The
          final app will include full safety, verification, and payment
          features.
        </p>
      </div>
    </section>
  );
}
