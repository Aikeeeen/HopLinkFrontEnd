import { ArrowRight, Car, Users, Leaf } from "lucide-react";

const heroStats = [
  { label: "Avg. saved / month", value: "€110" },
  { label: "CO₂ reduced / trip", value: "up to 40%" },
  { label: "Shared rides planned", value: "1,200+" },
];

const valueProps = [
  {
    icon: Car,
    title: "Share empty seats, not extra cars",
    description:
      "Turn your daily drive into a shared route. Split fuel and parking instead of adding more traffic.",
  },
  {
    icon: Leaf,
    title: "Greener commutes by default",
    description:
      "Fewer cars on the road means lower emissions. Every ride is a small climate win.",
  },
  {
    icon: Users,
    title: "Travel with people like you",
    description:
      "Neighbors, coworkers, and students heading in the same direction. HopLink connects you safely.",
  },
];

export default function HeroSection({ onTryDemo }) {
  return (
    <section className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
      {/* Left: text */}
      <div className="max-w-2xl">
        <p className="hl-hero-kicker">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Carpooling, but actually easy
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight hl-heading sm:text-5xl lg:text-6xl">
          Share your commute,
          <span className="block text-emerald-600 dark:text-emerald-300">
            save money every month.
          </span>
        </h1>

        <p className="mt-4 max-w-xl text-sm hl-body sm:text-base">
          HopLink helps drivers and passengers match on routes they already take.
          Split costs, reduce emissions, and skip the awkward “who&apos;s driving?”
          chats.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end">
          <button
            type="button"
            onClick={onTryDemo}
            className="hl-btn-primary rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/30"
          >
            <span>Try the live demo</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          <p className="max-w-xs text-xs hl-muted">
            Demo runs in your browser only — safe to click around, just don&apos;t
            use real credentials.
          </p>
        </div>

        {/* Stats */}
        <dl className="mt-6 grid max-w-xl gap-4 sm:grid-cols-3">
          {heroStats.map((stat) => (
            <div key={stat.label} className="hl-card-stat px-4 py-3">
              <dt className="text-[11px] uppercase tracking-wide hl-muted">
                {stat.label}
              </dt>
              <dd className="mt-1 text-lg font-semibold hl-heading">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Right: value props */}
      <div className="w-full max-w-sm space-y-4">
        {valueProps.map((item) => (
          <div key={item.title} className="hl-card px-4 py-3 flex gap-3">
            <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-500/15">
              <item.icon className="h-4 w-4 text-emerald-600 dark:text-emerald-300" />
            </div>
            <div>
              <h3 className="text-sm font-semibold hl-heading">{item.title}</h3>
              <p className="mt-1 text-xs hl-body">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
