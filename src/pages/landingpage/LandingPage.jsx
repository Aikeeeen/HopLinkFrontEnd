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

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 dark:bg-slate-950 dark:text-slate-50">
      {/* Top demo banner */}
      <div className="border-b border-amber-400/40 bg-amber-500/10">
        <div className="mx-auto flex max-w-6xl items-center justify-center px-4 py-2 text-xs text-amber-100 sm:text-sm">
          <span className="mr-2 inline-block h-2 w-2 rounded-full bg-amber-300" />
          <span>
            HopLink is currently in <strong>demo mode</strong>. Data is stored
            locally in your browser. Please don&apos;t use real passwords.
          </span>
        </div>
      </div>

      {/* Simple landing navbar with theme toggle + demo button */}
      <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur dark:bg-slate-950/80 dark:border-slate-800">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-lg font-semibold tracking-tight"
          >
            HopLink<span className="text-indigo-600">Carpooling</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate("/demo")}
              className="hidden rounded-xl border border-indigo-300 px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-50 dark:border-indigo-500/70 dark:text-indigo-200 dark:hover:bg-slate-900 sm:inline-flex"
            >
              Open demo
            </button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main marketing content */}
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <HeroSection onTryDemo={() => navigate("/demo")} />
        <HeadlineStrip />
        <IntroSection />
        <ValuePropositionSection />
        <SocialProofSection />
        <FAQSection />
        <FinalCTA onTryDemo={() => navigate("/demo")} />
      </div>
    </main>
  );
}
