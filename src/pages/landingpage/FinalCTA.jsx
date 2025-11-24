import { ArrowRight } from "lucide-react";

export default function FinalCTA({ onTryDemo }) {
  return (
    <section className="mt-16">
      <div className="rounded-3xl border border-emerald-500/20 bg-slate-950/60 p-6 sm:p-8">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl text-slate-50">
          Try the HopLink demo today
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-slate-300 sm:text-base">
          Click around, create a test account, and see how planning shared rides
          could work for your commute. This is a local demo environment — we
          don&apos;t store your data on a server, but we still recommend using
          fake credentials.
        </p>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={onTryDemo}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400"
          >
            Open demo app
            <ArrowRight className="h-4 w-4" />
          </button>
          <p className="text-xs text-slate-400 max-w-sm">
            No signup emails, no real payments, no commitments. Just a preview
            of the experience.
          </p>
        </div>
      </div>
    </section>
  );
}
