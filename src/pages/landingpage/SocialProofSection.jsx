import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Mila K.",
    role: "Student, travels between cities",
    quote:
      "I used to spend hours scrolling Facebook groups. With HopLink, I just search, filter, and book a ride that feels safe.",
  },
  {
    name: "Daniel R.",
    role: "Driver with a long commute",
    quote:
      "Sharing my usual route helps cover fuel and I get fewer no-shows because everything is confirmed in the app.",
  },
  {
    name: "Jess & Marco",
    role: "Travelers in Eastern Europe",
    quote:
      "Having reviews and clear rules makes carpooling feel like a real option, not a gamble.",
  },
];

export default function SocialProofSection() {
  return (
    <section className="mt-16">
      <h2 className="text-2xl font-semibold tracking-tight hl-heading sm:text-3xl">
        People already planning shared trips
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
