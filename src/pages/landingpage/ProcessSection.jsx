import { Search, CheckCircle2, MessageCircle } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Search & discover",
    description: "Find drivers or riders traveling your route with detailed profiles and verified reviews.",
  },
  {
    number: "02",
    icon: CheckCircle2,
    title: "Verify & connect",
    description: "Review verified identities, check reliability scores, and message to confirm details.",
  },
  {
    number: "03",
    icon: MessageCircle,
    title: "Ride & rate",
    description: "Share the ride safely, then rate your experience to build trust in the community.",
  },
];

export default function ProcessSection() {
  return (
    <section className="mt-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight hl-heading sm:text-4xl">
          How HopLink works
        </h2>
        <p className="mt-3 text-lg hl-body max-w-2xl mx-auto">
          Three simple steps to safe, verified intercity travel
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div key={step.number} className="relative">
              {/* Connector line (hide on mobile, show between cards on desktop) */}
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[120%] h-0.5 bg-emerald-200 dark:bg-emerald-500/20"></div>
              )}

              <div className="relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition">
                <div className="flex items-center gap-3 mb-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-base font-bold text-emerald-700 dark:text-emerald-300">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-semibold hl-heading">{step.title}</h3>
                </div>

                <p className="text-sm hl-body leading-relaxed">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
