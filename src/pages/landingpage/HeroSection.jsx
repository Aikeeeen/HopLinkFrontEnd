import { ArrowRight, ShieldCheck, Users, MapPin, Play } from "lucide-react";

const heroStats = [
  { label: "Purpose", value: "Safe intercity travel" },
  { label: "Region", value: "Eastern Europe" },
  { label: "Focus", value: "Trust, safety & reliability" },
];

const valueProps = [
  {
    icon: ShieldCheck,
    title: "Trust over monetization",
    description:
      "Drivers may ask passengers to share fuel costs, but HopLink does not enable profit-making or commercial driving.",
  },
  {
    icon: MapPin,
    title: "Structured, reliable rides",
    description:
      "A clear, organized alternative to chaotic Facebook groups with verified profiles and transparent expectations.",
  },
  {
    icon: Users,
    title: "Safety at the core",
    description:
      "Verification, reviews, and reliability tracking reduce last-minute cancellations and unsafe situations.",
  },
];

export default function HeroSection() {
  const handleScrollToWaitlist = () => {
    const el = document.getElementById("waitlist");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
      {/* Left */}
      <div className="max-w-2xl">
        <p className="hl-hero-kicker">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Safe intercity carpooling, coming soon
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight hl-heading sm:text-5xl lg:text-6xl">
          A safer way to{" "}
          <span className="block text-emerald-600 dark:text-emerald-300">
            share intercity rides.
          </span>
        </h1>

        <p className="mt-5 max-w-xl text-lg hl-body font-medium">
          No gig drivers. No commercialization. Just verified people, fair costs, and trust.
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <button
            type="button"
            onClick={handleScrollToWaitlist}
            className="hl-btn-primary inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-emerald-500 to-teal-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/40 transition hover:from-emerald-400 hover:to-teal-400 hover:shadow-lg hover:shadow-emerald-500/50"
          >
            <span>Join early access</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          <a
            href="/demo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-emerald-500/30 bg-emerald-500/5 px-6 py-3 text-sm font-semibold text-emerald-600 dark:text-emerald-300 transition hover:bg-emerald-500/10 hover:border-emerald-500/50 dark:border-emerald-500/20 dark:hover:bg-emerald-950/50 dark:hover:border-emerald-500/40"
          >
            <Play className="h-4 w-4" />
            <span>Try the demo</span>
          </a>
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

      {/* Right: Value cards */}
      <div className="w-full max-w-sm space-y-4">
        {/* Value cards */}
        {valueProps.map((item) => (
          <div key={item.title} className="hl-card flex gap-3 px-4 py-3 hover:shadow-md transition">
            <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-500/15 shrink-0">
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
