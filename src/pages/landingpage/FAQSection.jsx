import { HelpCircle, MessageCircle } from "lucide-react";

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
    <section className="mt-8">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">
        <div className="max-w-sm shrink-0">
          <h2 className="text-3xl font-bold tracking-tight hl-heading sm:text-4xl">
            Questions,
            <span className="block text-purple-600 dark:text-purple-400 mt-1">
              answered
            </span>
          </h2>
          <p className="mt-5 text-base hl-body sm:text-lg leading-relaxed">
            HopLink is still in development, but here's what we can already
            share about how it will work.
          </p>
          <div className="mt-6 flex items-start gap-3 rounded-xl bg-purple-100/50 dark:bg-purple-500/10 p-3">
            <MessageCircle className="h-5 w-5 shrink-0 text-purple-600 dark:text-purple-400 mt-0.5" />
            <span className="text-sm hl-body">
              Have a different question? You'll be able to reach us
              directly from the app once it launches.
            </span>
          </div>
        </div>

        <dl className="flex-1 space-y-4">
          {faqs.map((item, index) => (
            <div
              key={item.question}
              className="group overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 transition hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-900"
            >
              <div className="px-6 py-4">
                <dt className="text-base font-semibold hl-heading flex items-start gap-3">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-500/20 text-xs font-medium text-purple-700 dark:text-purple-300 shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  {item.question}
                </dt>
                <dd className="mt-3 text-sm hl-body ml-9 leading-relaxed">
                  {item.answer}
                </dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
