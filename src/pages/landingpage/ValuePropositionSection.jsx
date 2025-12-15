import { ShieldCheck, Users, Scale } from "lucide-react";

const valueProps = [
  {
    icon: ShieldCheck,
    title: "Built around trust",
    description:
      "Verification options, transparent reviews, and a reliability score help you choose who to ride with. Safely.",
    color: "from-emerald-500/10 to-emerald-500/5",
    iconBg: "bg-emerald-100 dark:bg-emerald-500/15",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: Scale,
    title: "Fair cost sharing",
    description:
      "Drivers can request a simple fuel contribution, but HopLink does not allow monetization. No gig economy, no profit motive.",
    color: "from-indigo-500/10 to-indigo-500/5",
    iconBg: "bg-indigo-100 dark:bg-indigo-500/15",
    iconColor: "text-indigo-600 dark:text-indigo-400",
  },
  {
    icon: Users,
    title: "No chaos, no uncertainty",
    description:
      "Clear routes, timing, and expectations replace the frustration of messy Facebook carpool groups.",
    color: "from-purple-500/10 to-purple-500/5",
    iconBg: "bg-purple-100 dark:bg-purple-500/15",
    iconColor: "text-purple-600 dark:text-purple-400",
  },
];

export default function ValuePropositionSection() {
  return (
    <section className="mt-8">
      <div className="text-center">
        <h2 className="text-center text-3xl font-bold tracking-tight hl-heading sm:text-4xl">
          Why people choose
          <span className="block bg-linear-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent mt-2">
            HopLink
          </span>
        </h2>
        <p className="mt-4 text-base hl-body sm:text-lg max-w-2xl mx-auto">
          A safer, more structured way to share intercity rides built on fairness,
          not monetization.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {valueProps.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className={`relative overflow-hidden rounded-2xl bg-linear-to-br ${item.color} border border-slate-200/50 dark:border-slate-700/50 p-6 backdrop-blur-sm transition hover:border-slate-300 dark:hover:border-slate-600 group`}
            >
              {/* Subtle animated background */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className={`absolute top-0 right-0 h-32 w-32 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition`}
                  style={{
                    background: item.color.split("to-")[1]?.split("/")[0] || "emerald",
                  }}
                ></div>
              </div>

              <div className="relative">
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${item.iconBg} mb-4`}>
                  <Icon className={`h-6 w-6 ${item.iconColor}`} />
                </div>
                <h3 className="text-lg font-semibold hl-heading">{item.title}</h3>
                <p className="mt-3 text-sm hl-body leading-relaxed">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
