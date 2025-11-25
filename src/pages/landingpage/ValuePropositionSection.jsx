import { ShieldCheck, Users, Scale } from "lucide-react";

const valueProps = [
  {
    icon: ShieldCheck,
    title: "Built around trust",
    description:
      "Verification options, transparent reviews, and a reliability score help you choose who to ride with — safely.",
  },
  {
    icon: Scale,
    title: "Fair cost sharing",
    description:
      "Drivers can request a simple fuel contribution, but HopLink does not allow monetization. No gig economy, no profit motive.",
  },
  {
    icon: Users,
    title: "No chaos, no uncertainty",
    description:
      "Clear routes, timing, and expectations replace the frustration of messy Facebook carpool groups.",
  },
];

export default function ValuePropositionSection() {
  return (
    <section className="mt-16">
      <h2 className="text-center text-2xl font-semibold tracking-tight hl-heading sm:text-3xl">
        Why people choose HopLink
      </h2>
      <p className="mt-3 text-center text-sm hl-body sm:text-base">
        A safer, more structured way to share intercity rides — built on fairness,
        not monetization.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {valueProps.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="hl-card-soft flex flex-col p-5">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100 dark:bg-emerald-500/10">
                <Icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-sm font-semibold hl-heading">{item.title}</h3>
              <p className="mt-2 text-sm hl-body">{item.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
