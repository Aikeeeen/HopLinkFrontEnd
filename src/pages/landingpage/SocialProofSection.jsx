import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Mila K.",
    role: "Student, travels between cities",
    quote:
      "I spend hours scrolling Facebook groups now. With HopLink, I'll be able to search, filter, and book a ride that feels safe.",
  },
  {
    name: "Daniel R.",
    role: "Driver with a long commute",
    quote:
      "I'd love a way to share my usual route and cover fuel costs without the risk of no-shows. HopLink sounds like it will solve that.",
  },
  {
    name: "Jess & Marco",
    role: "Travelers in Eastern Europe",
    quote:
      "Carpooling with reviews and clear rules would make it feel like a real option, not a gamble.",
  },
];

export default function SocialProofSection() {
  return (
    <section className="mt-16">
      <h2 className="text-2xl font-semibold tracking-tight hl-heading sm:text-3xl">
        Why people are excited for HopLink
      </h2>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {testimonials.map((t) => (
          <figure key={t.name} className="hl-card-soft flex h-full flex-col p-4">
            <Quote className="h-4 w-4 text-emerald-600 dark:text-emerald-300" />
            <blockquote className="mt-3 text-sm hl-body">{t.quote}</blockquote>
            <figcaption className="mt-4 text-xs hl-muted">
              <span className="font-medium hl-heading">{t.name}</span> ·{" "}
              {t.role}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
