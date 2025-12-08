import { useNavigate } from "react-router-dom";

import HeroSection from "./HeroSection";
import HeadlineStrip from "./HeadlineStrip";
import IntroSection from "./IntroSection";
import ValuePropositionSection from "./ValuePropositionSection";
import SocialProofSection from "./SocialProofSection";
import FAQSection from "./FAQSection";
import FinalCTA from "./FinalCTA";
import WaitlistSection from "./WaitlistSection";
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
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main marketing content */}
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <HeroSection onOpenDemo={openDemo} />
        <HeadlineStrip />
        <IntroSection />
        <ValuePropositionSection />
        <SocialProofSection />
        <FAQSection />
        <WaitlistSection />
        <FinalCTA onTryDemo={openDemo} />
      </div>
    </main>
  );
}
