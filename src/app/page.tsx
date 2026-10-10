import { LandingNavbar } from "@/components/landing/navbar";
import { LandingHero } from "@/components/landing/hero";
import { LandingProblem } from "@/components/landing/problem-section";
import { LandingHowItWorks } from "@/components/landing/how-it-works";
import { LandingCapabilities } from "@/components/landing/capabilities";
import { LandingMatchingPreview } from "@/components/landing/matching-preview";
import { LandingCta } from "@/components/landing/cta-section";
import { LandingFooter } from "@/components/landing/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#080b11] text-slate-100 flex flex-col">
      <LandingNavbar />
      <main className="flex-1">
        <LandingHero />
        <LandingProblem />
        <LandingHowItWorks />
        <LandingCapabilities />
        <LandingMatchingPreview />
        <LandingCta />
      </main>
      <LandingFooter />
    </div>
  );
}
