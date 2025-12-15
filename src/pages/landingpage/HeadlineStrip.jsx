import { X, Check } from "lucide-react";

export default function HeadlineStrip() {
  return (
    <section className="mt-12">
      <div className="text-center mb-12">
        <p className="text-lg font-semibold text-emerald-900 dark:text-emerald-100">
          HopLink keeps intercity rides safe, structured, and trustworthy{" "}
          <span className="font-bold text-emerald-700 dark:text-emerald-300">
            without commercializing carpooling.
          </span>
        </p>
      </div>

      {/* Visual comparison grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* The Problem */}
        <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-red-50/30 to-orange-50/20 dark:from-slate-900 dark:to-slate-950 border border-red-200/40 dark:border-slate-700 p-8">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-0 h-40 w-40 rounded-full bg-red-200/20 blur-3xl dark:bg-red-500/10"></div>
          </div>
          <div className="relative">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 dark:bg-red-500/20 mb-4">
              <X className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-xl font-bold hl-heading">The Old Way</h3>
            <ul className="mt-5 space-y-3 text-sm hl-body">
              <li className="flex gap-3">
                <span className="text-red-600 dark:text-red-400 font-bold">•</span>
                <span>Hours scrolling Facebook groups & forums</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-600 dark:text-red-400 font-bold">•</span>
                <span>No verification or reliability tracking</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-600 dark:text-red-400 font-bold">•</span>
                <span>Unclear costs, hidden fees, last-minute cancellations</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-600 dark:text-red-400 font-bold">•</span>
                <span>Risk of scams, no recourse if something goes wrong</span>
              </li>
            </ul>
          </div>
        </div>

        {/* The Solution */}
        <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-emerald-50/40 to-teal-50/30 dark:from-slate-900 dark:to-slate-950 border border-emerald-200/40 dark:border-slate-700 p-8">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-emerald-200/30 blur-3xl dark:bg-emerald-500/10"></div>
          </div>
          <div className="relative">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-500/20 mb-4">
              <Check className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold hl-heading">HopLink Way</h3>
            <ul className="mt-5 space-y-3 text-sm hl-body">
              <li className="flex gap-3">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                <span>Find verified drivers & passengers in minutes</span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                <span>Transparent profiles, reviews, & reliability scores</span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                <span>Clear pricing, no surprises or hidden costs</span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                <span>Safe, fair cost-sharing without commercialization</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
