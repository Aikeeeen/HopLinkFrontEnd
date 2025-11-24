import { CheckCircle2 } from "lucide-react";

export default function IntroSection() {
  return (
    <section
      id="how-it-works"
      className="mt-14 grid gap-10 lg:grid-cols-[1.4fr,1fr] lg:items-start"
    >
      <div>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Carpooling without the friction
        </h2>
        <p className="mt-4 text-sm text-slate-300 sm:text-base">
          HopLink is built for people who travel the same routes again and again
          — like commuting to work or going to campus. Instead of coordinating
          in messy chats, you define your route, days, and preferences, and let
          the platform suggest compatible drivers and passengers.
        </p>
        <p className="mt-3 text-sm text-slate-300 sm:text-base">
          Our goal is simple: help you share empty seats in cars that are
          already on the road — so everyone spends less, emits less, and travels
          with people they trust.
        </p>

        <ul className="mt-5 grid gap-3 text-sm text-slate-200">
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
            <span>Works for recurring commutes and planned one-off trips.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
            <span>
              Clear visibility on time, route, seats, and contributions — no
              awkward money talks.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
            <span>
              Built with trust in mind: profiles, preferences, and transparent
              reviews.
            </span>
          </li>
        </ul>
      </div>

      {/* Right-hand mock card */}
      <div className="rounded-3xl border border-slate-800 bg-slate-950/60 p-4 shadow-lg shadow-emerald-500/10">
        <p className="text-xs font-medium text-emerald-200">Snapshot</p>
        <p className="mt-1 text-sm text-slate-300">
          A driver planning a weekday commute between Haarlem and Amsterdam
          could:
        </p>
        <ul className="mt-3 space-y-2 text-xs text-slate-200">
          <li>• Offer 3 seats on Mon–Thu, 08:00 → 17:30</li>
          <li>• Set a fair contribution per seat</li>
          <li>• Match with passengers along the route</li>
        </ul>
      </div>
    </section>
  );
}
