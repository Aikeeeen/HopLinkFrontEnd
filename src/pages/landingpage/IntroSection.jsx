import { CheckCircle2, MapPin, Users, Shield } from "lucide-react";

export default function IntroSection() {
  return (
    <section
      id="how-it-works"
      className="mt-12 grid gap-12 lg:grid-cols-[1fr,1.4fr] lg:items-start"
    >
      {/* Left: Visual element */}
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-emerald-500/20 to-teal-500/10 dark:from-slate-900 dark:to-slate-950 border border-emerald-200/50 dark:border-slate-700 p-8 min-h-96 flex flex-col items-center justify-center order-2 lg:order-1">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 h-48 w-48 rounded-full bg-emerald-300/30 blur-3xl dark:bg-emerald-500/15"></div>
          <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-teal-300/20 blur-3xl dark:bg-teal-500/10"></div>
        </div>

        <div className="relative text-center space-y-4">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-100 dark:bg-emerald-500/20">
            <Users className="h-10 w-10 text-emerald-600 dark:text-emerald-300" />
          </div>
          <div>
            <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-wide">
              How it works
            </p>
            <p className="mt-2 text-lg font-semibold hl-heading">
              Real people, real routes
            </p>
            <p className="mt-1 text-sm hl-body max-w-xs mx-auto">
              Join drivers and passengers on verified intercity rides across Eastern Europe
            </p>
          </div>
        </div>
      </div>

      {/* Right: Content */}
      <div className="order-1 lg:order-2">
        <h2 className="text-3xl font-bold tracking-tight hl-heading sm:text-4xl">
          Carpooling that finally feels
          <span className="block text-emerald-600 dark:text-emerald-300 mt-1">
            reliable
          </span>
        </h2>

        <p className="mt-5 text-base hl-body sm:text-lg leading-relaxed">
          Instead of scrolling through chaotic Facebook groups or relying on
          unpredictable buses, HopLink gives drivers and passengers a safe,
          transparent way to coordinate intercity routes.
        </p>

        <p className="mt-4 text-base hl-body sm:text-lg leading-relaxed">
          Drivers may ask passengers to contribute to fuel costs, but HopLink
          does not allow monetization or profit-making.  
          This keeps the platform fair, non-commercial, and focused on trust.
        </p>

        <ul className="mt-7 grid gap-4 text-sm">
          <li className="flex items-start gap-3 group">
            <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition" />
            <span className="hl-body">Perfect for one-off trips and recurring intercity routes.</span>
          </li>

          <li className="flex items-start gap-3 group">
            <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition" />
            <span className="hl-body">Clear details and expectations, no messy DM negotiations.</span>
          </li>

          <li className="flex items-start gap-3 group">
            <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition" />
            <span className="hl-body">Verification, reliability scores, and reviews to build trust.</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
