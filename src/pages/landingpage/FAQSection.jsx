import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What is HopLink?",
    answer:
      "HopLink is a carpooling platform that helps drivers and passengers share rides on regular routes like commuting or weekly trips.",
  },
  {
    question: "Is HopLink available in my city?",
    answer:
      "We’re launching city by city. Join the waitlist, tell us your routes, and we’ll notify you once HopLink opens in your area.",
  },
  {
    question: "How are costs split between riders?",
    answer:
      "Drivers can set a fair contribution per seat based on distance and fuel costs. We’ll suggest balanced price ranges so it stays affordable.",
  },
  {
    question: "Is it safe to share a ride?",
    answer:
      "Safety is our top priority. Profiles, ratings, and route details help you choose people you feel comfortable sharing a ride with.",
  },
];

export default function FAQSection() {
  return (
    <section className="mt-16 border-y border-slate-800 py-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-sm">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl text-slate-50">
            Questions, answered
          </h2>
          <p className="mt-3 text-sm text-slate-300 sm:text-base">
            HopLink is still in development, but here&apos;s what we can already
            share about how it works.
          </p>
          <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
            <HelpCircle className="h-4 w-4" />
            <span>
              Have a different question? You&apos;ll be able to reach us
              directly from the app.
            </span>
          </div>
        </div>

        <dl className="mt-2 flex-1 space-y-4">
          {faqs.map((item) => (
            <div
              key={item.question}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-3"
            >
              <dt className="text-sm font-semibold text-slate-50">
                {item.question}
              </dt>
              <dd className="mt-1.5 text-sm text-slate-300">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}