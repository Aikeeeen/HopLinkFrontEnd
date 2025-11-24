import { Car, Users, Leaf } from "lucide-react";

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

export default function ValuePropositionSection() {
  return (
    <section className="mt-16">
      <h2 className="text-center text-2xl font-semibold tracking-tight hl-heading sm:text-3xl">
        Why people choose HopLink
      </h2>
      <p className="mt-3 text-center text-sm hl-body sm:text-base">
        A better way to move between the places you go most—without owning more
        cars or buying more tickets.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {valueProps.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="hl-card-soft p-5 flex flex-col"
            >
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
