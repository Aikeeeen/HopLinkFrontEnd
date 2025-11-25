import { Mail, User, MapPin } from "lucide-react";
import { useState } from "react";

export default function WaitlistSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    console.log("Waitlist signup:", payload);

    setSubmitted(true);
    e.currentTarget.reset();
  };

  return (
    <section
      id="waitlist"
      className="mt-16 hl-section-divider scroll-mt-24 py-10"
    >
      <div className="hl-card-soft grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.2fr,1fr] lg:items-start">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight hl-heading sm:text-3xl">
            Be first to know when HopLink launches
          </h2>
          <p className="mt-3 text-sm hl-body sm:text-base">
            Leave your email and a bit about how you travel. We&apos;ll invite
            you to early access, share progress updates, and ask for feedback as
            we build a safe, trustworthy, non-commercial way to share intercity
            rides across Eastern Europe.
          </p>
          <ul className="mt-4 space-y-1.5 text-xs hl-muted sm:text-sm">
            <li>• No spam — just launch updates and testing invites.</li>
            <li>• You can unsubscribe with one click at any time.</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          {submitted ? (
            <div className="text-sm hl-body">
              <p className="font-semibold hl-heading">
                You&apos;re on the list 🎉
              </p>
              <p className="mt-2 text-xs hl-muted">
                Thanks for your interest in HopLink. We&apos;ll email you when
                we&apos;re ready for early testers and city rollouts.
              </p>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-1.5 text-sm">
                <label
                  htmlFor="email"
                  className="block text-xs font-medium hl-muted uppercase tracking-wide"
                >
                  Email address
                </label>
                <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-900">
                  <Mail className="h-4 w-4 text-slate-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="w-full bg-transparent text-sm outline-none hl-body placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5 text-sm">
                  <label className="block text-xs font-medium hl-muted uppercase tracking-wide">
                    I&apos;m mainly a…
                  </label>
                  <div className="flex gap-2">
                    <label className="flex-1 cursor-pointer">
                      <input
                        type="radio"
                        name="role"
                        value="rider"
                        defaultChecked
                        className="peer hidden"
                      />
                      <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-center hl-body peer-checked:border-emerald-500 peer-checked:bg-emerald-50 dark:border-slate-700 dark:bg-slate-900 dark:peer-checked:border-emerald-500 dark:peer-checked:bg-emerald-500/10">
                        Passenger
                      </div>
                    </label>
                    <label className="flex-1 cursor-pointer">
                      <input
                        type="radio"
                        name="role"
                        value="driver"
                        className="peer hidden"
                      />
                      <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-center hl-body peer-checked:border-emerald-500 peer-checked:bg-emerald-50 dark:border-slate-700 dark:bg-slate-900 dark:peer-checked:border-emerald-500 dark:peer-checked:bg-emerald-500/10">
                        Driver
                      </div>
                    </label>
                  </div>
                </div>

                <div className="space-y-1.5 text-sm">
                  <label
                    htmlFor="route"
                    className="block text-xs font-medium hl-muted uppercase tracking-wide"
                  >
                    Typical city or route
                  </label>
                  <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-900">
                    <MapPin className="h-4 w-4 text-slate-400" />
                    <input
                      id="route"
                      name="route"
                      type="text"
                      placeholder="e.g. Sofia → Bucharest"
                      className="w-full bg-transparent text-sm outline-none hl-body placeholder:text-slate-400"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 text-xs hl-muted">
                <label className="inline-flex items-start gap-2">
                  <input
                    type="checkbox"
                    name="marketingConsent"
                    className="mt-0.5 h-3.5 w-3.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 dark:border-slate-600"
                    defaultChecked
                  />
                  <span>
                    I agree to receive emails about the HopLink beta, launch
                    updates, and opportunities to give feedback as we design a
                    safe, non-commercial carpooling experience.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="hl-btn-primary flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-4 py-2.5 text-sm font-medium text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400"
              >
                <User className="h-4 w-4" />
                <span>Join the early access list</span>
              </button>

              <p className="text-[11px] hl-muted">
                We respect your privacy and follow GDPR principles. No selling
                or sharing your email.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
