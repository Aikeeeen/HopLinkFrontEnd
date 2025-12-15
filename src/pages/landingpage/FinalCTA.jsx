import { ArrowRight, Zap } from "lucide-react";

export default function FinalCTA({ onTryDemo }) {
  return (
    <section className="mt-12">
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-indigo-600 to-purple-600 dark:from-slate-900 dark:to-slate-950 p-8 sm:p-12 shadow-2xl shadow-indigo-600/30 dark:shadow-slate-950/50">
        {/* Decorative blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-white/10 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-white/5 blur-3xl"></div>
        </div>

        <div className="relative">
          <div className="flex items-start gap-2 mb-4">
            <Zap className="h-6 w-6 text-white shrink-0" />
            <span className="text-sm font-semibold text-indigo-100">Ready to join?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          Help shape HopLink before launch
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-indigo-50 leading-relaxed">
          We're building a safer, more structured alternative to Facebook carpool groups.  
          No monetization, no commercial drivers. Just trustworthy, clear intercity travel.
        </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href="#waitlist"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-indigo-600 px-6 py-3 text-base font-semibold shadow-lg hover:bg-indigo-50 transition"
          >
            <span>Join early access</span>
              <ArrowRight className="h-5 w-5" />
          </a>

          <button
            type="button"
            onClick={onTryDemo}
            className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-sm px-6 py-3 text-base font-semibold text-white hover:bg-white/20 hover:border-white/50 transition"
          >
            Explore the demo
          </button>
        </div>

          <p className="mt-6 max-w-sm text-sm text-indigo-100">
          The demo runs locally in your browser, so no real data is stored. The
          final app will include full safety, verification, and payment
          features.
        </p>
        </div>
      </div>
    </section>
  );
}