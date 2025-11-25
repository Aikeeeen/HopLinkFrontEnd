import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "Do drivers make money on HopLink?",
    answer:
      "No. Drivers can ask passengers to share fuel costs, but HopLink does not support monetization or profit-making. The platform is strictly non-commercial.",
  },
  {
    question: "Is this like ride-hailing or taxis?",
    answer:
      "No. HopLink only connects ordinary drivers and passengers taking the same intercity routes. No professional drivers, no on-demand rides, no commercial services.",
  },
  {
    question: "How do you ensure safety?",
    answer:
      "We combine verification options, reliability scores, transparent reviews, and clear ride expectations to create a safer environment than Facebook groups.",
  },
  {
    question: "Will HopLink be available in my area?",
    answer:
      "We’re launching across Eastern Europe city-by-city. Join the early access list and we’ll notify you when we launch near you.",
  },
];

export default function FAQSection() {
  return (
    <section className="mt-16 hl-section-divider py-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-sm">
          <h2 className="text-2xl font-semibold tracking-tight hl-heading sm:text-3xl">
            Questions, answered
          </h2>
          <p className="mt-3 text-sm hl-body sm:text-base">
            HopLink is still in development, but here&apos;s what we can already
            share about how it will work.
          </p>
          <div className="mt-4 flex items-center gap-2 text-xs hl-muted">
            <HelpCircle className="h-4 w-4" />
            <span>
              Have a different question? You&apos;ll be able to reach us
              directly from the app once it launches.
            </span>
          </div>
        </div>

        <dl className="mt-2 flex-1 space-y-4">
          {faqs.map((item) => (
            <div key={item.question} className="hl-card px-4 py-3">
              <dt className="text-sm font-semibold hl-heading">
                {item.question}
              </dt>
              <dd className="mt-1.5 text-sm hl-body">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
