import { CheckCircle2 } from "lucide-react";

export default function IntroSection() {
  return (
    <section
      id="how-it-works"
      className="mt-14 grid gap-10 lg:grid-cols-[1.4fr,1fr] lg:items-start"
    >
      <div>
        <h2 className="text-2xl font-semibold tracking-tight hl-heading sm:text-3xl">
          Carpooling that finally feels reliable
        </h2>

        <p className="mt-4 text-sm hl-body sm:text-base">
          Instead of scrolling through chaotic Facebook groups or relying on
          unpredictable buses, HopLink gives drivers and passengers a safe,
          transparent way to coordinate intercity routes.
        </p>

        <p className="mt-3 text-sm hl-body sm:text-base">
          Drivers may ask passengers to contribute to fuel costs, but HopLink
          does not allow monetization or profit-making.  
          This keeps the platform fair, non-commercial, and focused on trust.
        </p>

        <ul className="mt-5 grid gap-3 text-sm hl-body">
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500 dark:text-emerald-400" />
            <span>Perfect for one-off trips and recurring intercity routes.</span>
          </li>

          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500 dark:text-emerald-400" />
            <span>Clear details and expectations — no messy DM negotiations.</span>
          </li>

          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500 dark:text-emerald-400" />
            <span>Verification, reliability scores, and reviews to build trust.</span>
          </li>
        </ul>
      </div>

      <div className="hl-card-soft p-4 shadow-lg shadow-emerald-500/10">
        <p className="text-xs font-medium text-emerald-700 dark:text-emerald-200">
          Example
        </p>
        <p className="mt-1 text-sm hl-body">
          A driver traveling from Sofia to Belgrade might:
        </p>
        <ul className="mt-3 space-y-2 text-xs hl-body">
          <li>• Offer 2–3 seats</li>
          <li>• Ask riders to share fuel costs fairly</li>
          <li>• Match with verified passengers</li>
          <li>• Coordinate timing and pickup easily</li>
        </ul>
      </div>
    </section>
  );
}
