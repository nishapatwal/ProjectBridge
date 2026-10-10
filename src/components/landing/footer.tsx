import Link from "next/link";
import { Terminal, Github } from "lucide-react";

export function LandingFooter() {
  return (
    <footer className="border-t border-slate-800/80 bg-[#06080d] py-12 text-slate-400 text-sm">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600/20 border border-indigo-500/30 text-indigo-400">
              <Terminal className="h-4 w-4" />
            </div>
            <span className="text-base font-bold text-white tracking-tight">
              Project<span className="text-indigo-400">Bridge</span>
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-slate-400">
            <Link href="#problem" className="hover:text-slate-200 transition-colors">
              The Problem
            </Link>
            <Link href="#how-it-works" className="hover:text-slate-200 transition-colors">
              How It Works
            </Link>
            <Link href="#capabilities" className="hover:text-slate-200 transition-colors">
              Platform Capabilities
            </Link>
            <Link href="#matching-preview" className="hover:text-slate-200 transition-colors">
              Explainable Matching
            </Link>
            <Link href="/login" className="hover:text-slate-200 transition-colors">
              Sign In
            </Link>
            <Link href="/signup" className="hover:text-slate-200 transition-colors">
              Register
            </Link>
          </div>

          <div className="text-xs text-slate-500 text-center md:text-right">
            <span>ProjectBridge Foundation — Stage 1</span>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-900 text-center text-xs text-slate-600">
          Built for authentic client-student-mentor engineering collaboration. No fabricated statistics or testimonials.
        </div>
      </div>
    </footer>
  );
}
