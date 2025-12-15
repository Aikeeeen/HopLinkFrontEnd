import { useNavigate } from "react-router-dom";
import { trackDemoAction } from "../../lib/tracking";

import HeroSection from "./HeroSection";
import HeadlineStrip from "./HeadlineStrip";
import IntroSection from "./IntroSection";
import ProcessSection from "./ProcessSection";
import ValuePropositionSection from "./ValuePropositionSection";
import TrustBadgesSection from "./TrustBadgesSection";
import SocialProofSection from "./SocialProofSection";
import FAQSection from "./FAQSection";
import FinalCTA from "./FinalCTA";
import WaitlistSection from "./WaitlistSection";
import ThemeToggle from "../../components/navigation/ThemeToggle";

export default function LandingPage() {
  const navigate = useNavigate();

  const openDemo = () => {
    trackDemoAction("open_demo");
    window.open("/demo", "_blank", "noopener,noreferrer");
  };

  return (
    <main className="hl-page min-h-screen">
      {/* Simple landing navbar with theme toggle + demo button */}
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-lg font-semibold tracking-tight hl-heading"
          >
            HopLink<span className="text-emerald-600">Carpooling</span>
          </button>

          <div className="flex items-center gap-3">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero Section - Emerald gradient background */}
      <section className="relative overflow-hidden bg-linear-to-br from-emerald-50 via-white to-emerald-50/30 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-emerald-200/30 blur-3xl dark:bg-emerald-500/10"></div>
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-emerald-200/20 blur-3xl dark:bg-emerald-500/5"></div>
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
          <HeroSection />
        </div>
      </section>

      {/* Headline Strip - Problem/Solution comparison */}
      <section className="bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <HeadlineStrip />
        </div>
      </section>

      {/* Intro Section - Clean white */}
      <section className="bg-white dark:bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <IntroSection />
        </div>
      </section>

      {/* Process Section - Light gray background */}
      <section className="bg-slate-50 dark:bg-slate-900/50">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <ProcessSection />
        </div>
      </section>

      {/* Value Proposition - Subtle indigo gradient */}
      <section className="relative overflow-hidden bg-linear-to-br from-indigo-50/40 to-purple-50/40 dark:from-slate-900 dark:to-slate-900">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-0 h-96 w-96 rounded-full bg-indigo-200/20 blur-3xl dark:bg-indigo-500/5"></div>
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <ValuePropositionSection />
        </div>
      </section>

      {/* Social Proof - Emerald tint background */}
        {/* Trust Badges Section - White background */}
        <section className="bg-white dark:bg-slate-950">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
            <TrustBadgesSection />
          </div>
        </section>

      <section className="bg-emerald-50/40 dark:bg-slate-900/30">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <SocialProofSection />
        </div>
      </section>

      {/* FAQ Section - White with subtle border */}
      <section className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <FAQSection />
        </div>
      </section>

      {/* Waitlist Section - Emerald/green accent */}
      <section className="relative overflow-hidden bg-linear-to-br from-emerald-50 to-teal-50/40 dark:from-slate-900 dark:to-slate-950">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-teal-200/30 blur-3xl dark:bg-teal-500/10"></div>
          <div className="absolute top-1/2 -right-20 h-96 w-96 rounded-full bg-emerald-200/20 blur-3xl dark:bg-emerald-500/5"></div>
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <WaitlistSection />
        </div>
      </section>

      {/* Final CTA - Bold purple/indigo */}
      <section className="relative overflow-hidden bg-linear-to-br from-indigo-600/10 via-purple-600/5 to-indigo-600/10 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-indigo-300/20 blur-3xl dark:bg-indigo-500/10"></div>
          <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-purple-300/15 blur-3xl dark:bg-purple-500/5"></div>
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
          <FinalCTA onTryDemo={openDemo} />
        </div>
      </section>
    </main>
  );
}
