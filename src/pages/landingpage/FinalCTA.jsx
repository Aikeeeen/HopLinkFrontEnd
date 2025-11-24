import { ArrowRight } from "lucide-react";

export default function FinalCTA({ onTryDemo }) {
  return (
    <section className="mt-16">
      <div className="hl-card-soft p-6 sm:p-8">
        <h2 className="text-2xl font-semibold tracking-tight hl-heading sm:text-3xl">
          Try the HopLink demo today
        </h2>
        <p className="mt-3 max-w-2xl text-sm hl-body sm:text-base">
          Click around, create a test account, and see how planning shared rides
          could work for your commute. This is a local demo environment — we
          don&apos;t store your data on a server, but we still recommend using
          fake credentials.
        </p>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={onTryDemo}
            className="hl-btn-primary rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/30"
          >
            <span>Open demo app</span>
            <ArrowRight className="h-4 w-4" />
          </button>
          <p className="max-w-sm text-xs hl-muted">
            No signup emails, no real payments, no commitments. Just a preview
            of the experience.
          </p>
        </div>
      </div>
    </section>
  );
}
