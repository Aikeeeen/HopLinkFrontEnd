import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Mila K.",
    role: "Student, travels between cities",
    quote:
      "I spend hours scrolling Facebook groups now. With HopLink, I'll be able to search, filter, and book a ride that feels safe.",
    color: "from-blue-500/10 to-cyan-500/5",
    iconBg: "bg-blue-100 dark:bg-blue-500/15",
  },
  {
    name: "Daniel R.",
    role: "Driver with a long commute",
    quote:
      "I'd love a way to share my usual route and cover fuel costs without the risk of no-shows. HopLink sounds like it will solve that.",
    color: "from-emerald-500/10 to-teal-500/5",
    iconBg: "bg-emerald-100 dark:bg-emerald-500/15",
  },
  {
    name: "Jess & Marco",
    role: "Travelers in Eastern Europe",
    quote:
      "Carpooling with reviews and clear rules would make it feel like a real option, not a gamble.",
    color: "from-purple-500/10 to-pink-500/5",
    iconBg: "bg-purple-100 dark:bg-purple-500/15",
  },
];

export default function SocialProofSection() {
  return (
    <section className="mt-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold tracking-tight hl-heading sm:text-4xl">
          Why people are excited
          <span className="block text-emerald-600 dark:text-emerald-300 mt-1">
            for HopLink
          </span>
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <figure
            key={t.name}
            className={`relative overflow-hidden rounded-2xl bg-linear-to-br ${t.color} border border-slate-200/50 dark:border-slate-700/50 h-full flex flex-col p-6 backdrop-blur-sm transition hover:border-slate-300 dark:hover:border-slate-600`}
          >
            {/* Subtle gradient background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 right-0 h-32 w-32 rounded-full blur-2xl opacity-20"></div>
            </div>

            <div className="relative flex-1 flex flex-col">
              <div className={`inline-flex ${t.iconBg} w-10 h-10 items-center justify-center rounded-lg mb-4`}>
                <Quote className="h-5 w-5 text-emerald-600 dark:text-emerald-300" />
              </div>

              <blockquote className="text-sm hl-body leading-relaxed flex-1">
                "{t.quote}"
              </blockquote>

              <figcaption className="mt-5 pt-4 border-t border-white/10 dark:border-white/5">
                <p className="text-xs font-semibold hl-heading">{t.name}</p>
                <p className="text-xs hl-muted mt-1">{t.role}</p>
              </figcaption>
            </div>
          </figure>
        ))}
      </div>
    </section>
  );
}
