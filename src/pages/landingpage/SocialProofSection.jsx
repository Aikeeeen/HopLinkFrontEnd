import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Lena M.",
    role: "Student commuter",
    quote:
      "I cut my monthly travel costs almost in half and actually enjoy the ride to campus now.",
  },
  {
    name: "Tom B.",
    role: "Office worker",
    quote:
      "HopLink made it easy to share my daily drive. No group chats, no chaos—just planned trips.",
  },
  {
    name: "Sara & Alex",
    role: "Co-riders",
    quote:
      "We started carpooling twice a week and it already feels like the new normal.",
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
          <figure
            key={t.name}
            className="hl-card-soft p-4 flex h-full flex-col"
          >
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
