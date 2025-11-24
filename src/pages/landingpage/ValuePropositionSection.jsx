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
      <h2 className="text-center text-2xl font-semibold tracking-tight sm:text-3xl">
        Why people choose HopLink
      </h2>
      <p className="mt-3 text-center text-sm text-slate-300 sm:text-base">
        A better way to move between the places you go most—without owning more
        cars or buying more tickets.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {valueProps.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="flex flex-col rounded-3xl border border-slate-800 bg-slate-900/60 p-5"
          >
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/10">
              <Icon className="h-5 w-5 text-emerald-400" />
            </div>
            <h3 className="text-sm font-semibold text-slate-50">{title}</h3>
            <p className="mt-2 text-sm text-slate-300">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
