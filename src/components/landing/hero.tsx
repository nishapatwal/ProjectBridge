import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle2, ShieldCheck, Code2, Users } from "lucide-react";

export function LandingHero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-24 md:pt-28 md:pb-32">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-violet-600/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <Badge
            variant="default"
            className="mb-6 px-3.5 py-1 text-xs font-medium tracking-wide uppercase bg-indigo-500/10 text-indigo-400 border-indigo-500/20 rounded-full"
          >
            Engineering Marketplace & Mentorship
          </Badge>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
            Match Client Business Challenges with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-indigo-300 to-violet-400">
              Student Software Engineering Squads
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl leading-relaxed">
            A structured delivery platform where businesses scope production challenges,
            ambitious student teams build verified software, and senior industry mentors
            enforce architectural excellence.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link href="/signup?role=client" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-600/20 group">
                Submit a Client Project
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>

            <Link href="/signup?role=student" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-slate-700 hover:bg-slate-800 text-slate-200">
                Register as Student Squad
              </Button>
            </Link>
          </div>

          {/* Key Value Highlights */}
          <div className="mt-14 pt-8 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left w-full max-w-3xl">
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shrink-0">
                <Code2 className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Explainable Matching</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Transparent skill scoring and capacity fit, with no opaque heuristics.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-400 shrink-0">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Mentor Oversight</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Verified senior engineers conduct milestone code audits and architecture reviews.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Auditable Delivery</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Clear IP assignments, production handovers, and verified portfolio proofs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
