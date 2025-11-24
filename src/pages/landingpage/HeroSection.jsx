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
        <p className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium tracking-wide uppercase text-emerald-200">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Carpooling, but actually easy
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Share your commute,
          <span className="block text-emerald-300">save money every month.</span>
        </h1>

        <p className="mt-4 text-sm text-slate-300 sm:text-base max-w-xl">
          HopLink helps drivers and passengers match on routes they already take.
          Split costs, reduce emissions, and skip the awkward “who&apos;s driving?”
          chats.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end">
          <button
            type="button"
            onClick={onTryDemo}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400"
          >
            Try the live demo
            <ArrowRight className="h-4 w-4" />
          </button>

          <p className="text-xs text-slate-400 max-w-xs">
            Demo runs in your browser only — safe to click around, just don&apos;t
            use real credentials.
          </p>
        </div>

        {/* Stats */}
        <dl className="mt-6 grid gap-4 sm:grid-cols-3 max-w-xl">
          {heroStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-3"
            >
              <dt className="text-[11px] uppercase tracking-wide text-slate-400">
                {stat.label}
              </dt>
              <dd className="mt-1 text-lg font-semibold text-slate-50">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Right: value props */}
      <div className="w-full max-w-sm space-y-4">
        {valueProps.map((item) => (
          <div
            key={item.title}
            className="flex gap-3 rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3"
          >
            <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/15">
              <item.icon className="h-4 w-4 text-emerald-300" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-50">
                {item.title}
              </h3>
              <p className="mt-1 text-xs text-slate-300">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
