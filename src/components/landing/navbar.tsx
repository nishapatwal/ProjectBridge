import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Terminal, Shield } from "lucide-react";

export function LandingNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#080b11]/85 backdrop-blur-md">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600/20 border border-indigo-500/30 text-indigo-400">
            <Terminal className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white">
            Project<span className="text-indigo-400">Bridge</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
          <Link
            href="#problem"
            className="transition-colors hover:text-white"
          >
            The Problem
          </Link>
          <Link
            href="#how-it-works"
            className="transition-colors hover:text-white"
          >
            How It Works
          </Link>
          <Link
            href="#capabilities"
            className="transition-colors hover:text-white"
          >
            Capabilities
          </Link>
          <Link
            href="#matching-preview"
            className="transition-colors hover:text-white"
          >
            Explainable Matching
          </Link>
        </nav>

        <div className="flex items-center space-x-3">
          <Link href="/login">
            <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
              Sign In
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="sm" className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
