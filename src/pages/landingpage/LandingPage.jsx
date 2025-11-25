import { useNavigate } from "react-router-dom";

import HeroSection from "./HeroSection";
import HeadlineStrip from "./HeadlineStrip";
import IntroSection from "./IntroSection";
import ValuePropositionSection from "./ValuePropositionSection";
import SocialProofSection from "./SocialProofSection";
import FAQSection from "./FAQSection";
import FinalCTA from "./FinalCTA";
import ThemeToggle from "../../components/navigation/ThemeToggle";

export default function LandingPage() {
  const navigate = useNavigate();

  const openDemo = () => {
    window.open("/demo", "_blank", "noopener,noreferrer");
  };

  return (
    <main className="hl-page min-h-screen">
      {/* Simple landing navbar with theme toggle + demo button */}
      <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-lg font-semibold tracking-tight hl-heading"
          >
            HopLink<span className="text-indigo-600">Carpooling</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={openDemo}
              className="hidden rounded-xl border border-indigo-300 px-4 py-2 text-sm font-medium text-indigo-700 transition hover:bg-indigo-50 dark:border-indigo-500/70 dark:text-indigo-200 dark:hover:bg-slate-900 sm:inline-flex"
            >
              Open demo
            </button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main marketing content */}
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <HeroSection onTryDemo={openDemo} />
        <HeadlineStrip />
        <IntroSection />
        <ValuePropositionSection />
        <SocialProofSection />
        <FAQSection />
        <FinalCTA onTryDemo={openDemo} />
      </div>
    </main>
  );
}
