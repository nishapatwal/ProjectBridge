import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowRight, Briefcase, GraduationCap } from "lucide-react";

export function LandingCta() {
  return (
    <section className="py-20 border-t border-slate-800/80 bg-slate-950/40">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Ready to Bridge the Engineering Gap?
          </h2>
          <p className="mt-3 text-base text-slate-400">
            Select your role to start building with structured milestone governance and verified delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Client CTA Card */}
          <Card className="border-slate-800 bg-slate-900/60 p-6 flex flex-col justify-between hover:border-slate-700 transition-all">
            <CardHeader className="p-0 pb-4">
              <div className="p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 w-fit mb-3">
                <Briefcase className="h-6 w-6" />
              </div>
              <CardTitle className="text-2xl text-white">
                For Clients & Businesses
              </CardTitle>
              <p className="text-sm text-slate-400 mt-2">
                Have a backlogged tool, simulation sandbox, or prototype you need built?
                Post your challenge and match with a mentored student engineering team.
              </p>
            </CardHeader>
            <CardContent className="p-0 pt-6">
              <Link href="/signup?role=client" className="w-full block">
                <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium group">
                  Submit a Client Project
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Student CTA Card */}
          <Card className="border-slate-800 bg-slate-900/60 p-6 flex flex-col justify-between hover:border-slate-700 transition-all">
            <CardHeader className="p-0 pb-4">
              <div className="p-3 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-400 w-fit mb-3">
                <GraduationCap className="h-6 w-6" />
              </div>
              <CardTitle className="text-2xl text-white">
                For Student Squads
              </CardTitle>
              <p className="text-sm text-slate-400 mt-2">
                Tired of toy tutorials? Assemble your university squad, match with commercial clients,
                and receive active pull request feedback from senior mentors.
              </p>
            </CardHeader>
            <CardContent className="p-0 pt-6">
              <Link href="/signup?role=student" className="w-full block">
                <Button
                  variant="outline"
                  className="w-full border-slate-700 hover:bg-slate-800 text-slate-200 font-medium group"
                >
                  Register Your Team
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
