import { Mail, User, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { trackWaitlistSignup } from "../../lib/tracking";

export default function WaitlistSection() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [route, setRoute] = useState("");
  const [role, setRole] = useState("rider");
  const [source, setSource] = useState("");
  const [sourceDetail, setSourceDetail] = useState("");
  const [priority, setPriority] = useState([]);
  const [priorityOpen, setPriorityOpen] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);
  const priorityRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate and show specific error messages
    if (!email.trim()) {
      alert("Please enter your email address.");
      return;
    }
    if (!route.trim()) {
      alert("Please enter your typical city or route.");
      return;
    }
    if (!source) {
      alert("Please select how you heard about us.");
      return;
    }
    if (source === "other" && !sourceDetail.trim()) {
      alert("Please tell us where you heard about us.");
      return;
    }
    if (priority.length === 0) {
      alert("Please select at least one thing that matters most to you.");
      return;
    }
    if (!consentChecked) {
      alert("Please agree to receive emails to join the early access list.");
      return;
    }

    const payload = {
      email: email.trim(),
      route: route.trim(),
      role: role,
      source: source,
      priority: priority.join(", "),
      marketingConsent: consentChecked,
    };

    if (source === "other") {
      payload.sourceDetail = sourceDetail;
    }

    console.log("Waitlist signup:", payload);

    try {
      // Send to Formspree
      const formData = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await fetch("https://formspree.io/f/mwpgrqpa", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // Track the waitlist signup in Google Analytics
        trackWaitlistSignup(source, role);

        setSubmitted(true);
        setEmail("");
        setRoute("");
        setRole("rider");
        setSource("");
        setSourceDetail("");
        setPriority([]);
        setPriorityOpen(false);
        setConsentChecked(false);
        e.currentTarget.reset();
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (priorityOpen && priorityRef.current && !priorityRef.current.contains(event.target)) {
        setPriorityOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [priorityOpen]);

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
            Leave your email and a bit about how you travel. We'll invite
            you to early access, share progress updates, and ask for feedback as
            we build a safe, trustworthy, non-commercial way to share intercity
            rides across Eastern Europe.
          </p>
          <ul className="mt-4 space-y-1.5 text-xs hl-muted sm:text-sm">
            <li>• No spam: just launch updates and testing invites.</li>
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
                Thanks for your interest in HopLink. We'll email you when
                we're ready for early testers and city rollouts.
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
                <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 min-h-11 dark:border-slate-700 dark:bg-slate-900">
                  <Mail className="h-4 w-4 text-slate-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent text-sm outline-none hl-body placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 sm:items-start">
                <div className="space-y-2 text-sm">
                  <label className="block text-xs font-medium hl-muted uppercase tracking-wide">
                    I&apos;m mainly a…
                  </label>
                  <div className="flex gap-2">
                    <label className="flex-1 cursor-pointer">
                      <input
                        type="radio"
                        name="role"
                        value="rider"
                        checked={role === "rider"}
                        onChange={() => setRole("rider")}
                        className="peer hidden"
                      />
                      <div className="flex min-h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-center hl-body peer-checked:border-emerald-500 peer-checked:bg-emerald-50 dark:border-slate-700 dark:bg-slate-900 dark:peer-checked:border-emerald-500 dark:peer-checked:bg-emerald-500/10">
                        Passenger
                      </div>
                    </label>
                    <label className="flex-1 cursor-pointer">
                      <input
                        type="radio"
                        name="role"
                        value="driver"
                        checked={role === "driver"}
                        onChange={() => setRole("driver")}
                        className="peer hidden"
                      />
                      <div className="flex min-h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-center hl-body peer-checked:border-emerald-500 peer-checked:bg-emerald-50 dark:border-slate-700 dark:bg-slate-900 dark:peer-checked:border-emerald-500 dark:peer-checked:bg-emerald-500/10">
                        Driver
                      </div>
                    </label>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <label
                    htmlFor="route"
                    className="block text-xs font-medium hl-muted uppercase tracking-wide"
                  >
                    Typical city or route
                  </label>
                  <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 min-h-11 dark:border-slate-700 dark:bg-slate-900">
                    <MapPin className="h-4 w-4 text-slate-400" />
                    <input
                      id="route"
                      name="route"
                      type="text"
                      placeholder="e.g. Sofia → Bucharest"
                      required
                      value={route}
                      onChange={(e) => setRoute(e.target.value)}
                      className="w-full bg-transparent text-sm outline-none hl-body placeholder:text-slate-400"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 text-sm">
                <label
                  htmlFor="source"
                  className="block text-xs font-medium hl-muted uppercase tracking-wide"
                >
                  How did you hear about us?
                </label>
                <div className="relative">
                  <select
                    id="source"
                    name="source"
                    value={source}
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 min-h-11 text-sm hl-body outline-none hover:border-slate-300 focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-600 dark:focus:border-emerald-500"
                    required
                    onChange={(e) => setSource(e.target.value)}
                  >
                    <option value="" disabled>
                      Select one
                    </option>
                    <option value="facebook">Facebook groups</option>
                    <option value="instagram">Instagram</option>
                    <option value="tiktok">TikTok</option>
                    <option value="google">Google search</option>
                    <option value="friend">Friend recommendation</option>
                    <option value="community">University / workplace community</option>
                    <option value="offline">Posters / offline</option>
                    <option value="other">Other</option>
                  </select>
                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-slate-500">▾</span>
                </div>
                {source === "other" && (
                  <input
                    type="text"
                    name="sourceDetail"
                    value={sourceDetail}
                    onChange={(e) => setSourceDetail(e.target.value)}
                    placeholder="Please specify..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 min-h-11 text-sm hl-body outline-none placeholder:text-slate-400 hover:border-slate-300 focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-900 dark:placeholder:text-slate-500 dark:hover:border-slate-600 dark:focus:border-emerald-500"
                  />
                )}
              </div>

              <div className="space-y-2 text-sm" ref={priorityRef}>
                <p className="block text-xs font-medium hl-muted uppercase tracking-wide">
                  What matters most for you? (pick all that apply)
                </p>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setPriorityOpen((v) => !v)}
                    className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 min-h-11 text-sm hl-body hover:border-slate-300 focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-600 dark:focus:border-emerald-500"
                  >
                    <span className="text-left">
                      {priority.length === 0 ? "Select one or more" : `${priority.length} selected`}
                    </span>
                    <span className="text-xs text-slate-500">▾</span>
                  </button>

                  {priorityOpen && (
                    <div className="mt-2 grid gap-2 rounded-xl border border-slate-200 bg-white p-2 shadow-lg dark:border-slate-700 dark:bg-slate-900">
                      {[
                        { value: "fill_seats", label: "Fill seats reliably" },
                        { value: "safety_trust", label: "Safer than FB groups" },
                        { value: "clear_pricing", label: "Clear & fair pricing" },
                        { value: "low_fees", label: "Low fees / costs" },
                        { value: "fast_comm", label: "Fast communication" },
                        { value: "other", label: "Something else" },
                      ].map((item) => {
                        const active = priority.includes(item.value);
                        return (
                          <button
                            key={item.value}
                            type="button"
                            onClick={() => {
                              setPriority((prev) =>
                                prev.includes(item.value)
                                  ? prev.filter((v) => v !== item.value)
                                  : [...prev, item.value]
                              );
                            }}
                            className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs hl-body transition hover:bg-slate-50 dark:hover:bg-slate-800 ${
                              active
                                ? "border border-emerald-400/70 bg-emerald-50 text-emerald-700 dark:border-emerald-500/60 dark:bg-emerald-500/10 dark:text-emerald-200"
                                : "border border-transparent"
                            }`}
                          >
                            <span>{item.label}</span>
                            {active && <span className="text-[10px] font-medium">Added</span>}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {priority.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {priority.map((p) => {
                      const labelMap = {
                        fill_seats: "Fill seats reliably",
                        safety_trust: "Safer than FB groups",
                        clear_pricing: "Clear & fair pricing",
                        low_fees: "Low fees / costs",
                        fast_comm: "Fast communication",
                        other: "Something else",
                      };
                      return (
                        <span
                          key={p}
                          className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                        >
                          {labelMap[p] ?? p}
                          <button
                            type="button"
                            aria-label="Remove priority"
                            className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-100"
                            onClick={() => setPriority((prev) => prev.filter((v) => v !== p))}
                          >
                            ×
                          </button>
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="space-y-1.5 text-xs hl-muted">
                <label className="inline-flex items-start gap-2">
                  <input
                    type="checkbox"
                    name="marketingConsent"
                    checked={consentChecked}
                    onChange={(e) => setConsentChecked(e.target.checked)}
                    className="mt-0.5 h-3.5 w-3.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 dark:border-slate-600"
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
                className="hl-btn-primary flex w-full items-center justify-center gap-2 rounded-2xl px-3.5 py-2 min-h-11 text-sm font-medium text-slate-950 shadow-md shadow-emerald-500/25 transition bg-emerald-500 hover:bg-emerald-400"
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
