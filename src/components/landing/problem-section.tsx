import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Briefcase, GraduationCap, XCircle, CheckCircle2 } from "lucide-react";

export function LandingProblem() {
  return (
    <section id="problem" className="py-20 border-t border-slate-800/80 bg-slate-950/40">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-semibold tracking-wider text-indigo-400 uppercase">
            The Structural Gap
          </h2>
          <p className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Why traditional internships and client outsourcing fall short
          </p>
          <p className="mt-4 text-base text-slate-400">
            Businesses have backlogged engineering problems. Students seek high-stakes production experience.
            Yet traditional channels create friction for both sides.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* For Businesses / Clients */}
          <Card className="border-slate-800 bg-slate-900/60 shadow-xl">
            <CardHeader className="pb-4 border-b border-slate-800/60">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <Briefcase className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-xl">For Businesses & Startups</CardTitle>
                  <p className="text-xs text-slate-400 mt-0.5">The agency & intern dilemma</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-start space-x-3">
                <XCircle className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-300">
                  <strong className="text-slate-100">Prohibitive agency overhead:</strong> Standard agency minimums prevent early-stage companies and non-profits from building experimental prototypes or internal automation.
                </p>
              </div>

              <div className="flex items-start space-x-3">
                <XCircle className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-300">
                  <strong className="text-slate-100">Unmanaged intern overhead:</strong> Managing raw individual interns consumes extensive senior staff hours without guaranteed sprint velocity or architectural consistency.
                </p>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle2 className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
                <p className="text-sm text-indigo-200">
                  <strong className="text-white">ProjectBridge Solution:</strong> Scoped, time-boxed challenges assigned to vetted student engineering squads overseen by dedicated senior industry mentors.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* For Student Engineers */}
          <Card className="border-slate-800 bg-slate-900/60 shadow-xl">
            <CardHeader className="pb-4 border-b border-slate-800/60">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-400">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-xl">For Student Engineers</CardTitle>
                  <p className="text-xs text-slate-400 mt-0.5">The tutorial project trap</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-start space-x-3">
                <XCircle className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-300">
                  <strong className="text-slate-100">Toy portfolio projects:</strong> Generic clone tutorials fail to demonstrate real problem-solving, stakeholder communication, or adherence to business requirements.
                </p>
              </div>

              <div className="flex items-start space-x-3">
                <XCircle className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-300">
                  <strong className="text-slate-100">Lack of senior feedback:</strong> Capstone students rarely receive rigorous line-by-line pull request audits or production architecture feedback from experienced tech leads.
                </p>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle2 className="h-5 w-5 text-violet-400 shrink-0 mt-0.5" />
                <p className="text-sm text-violet-200">
                  <strong className="text-white">ProjectBridge Solution:</strong> Build mission-critical software for real commercial clients with structured sprints, weekly mentor feedback, and verifiable proof of delivery.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
