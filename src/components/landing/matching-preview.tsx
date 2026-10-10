import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DEMO_EXPLAINABLE_MATCH } from "@/lib/demo-data";
import {
  ShieldAlert,
  Users,
  Award,
  CheckCircle2,
  Sparkles,
  Info,
  Calendar,
  Layers,
} from "lucide-react";

export function LandingMatchingPreview() {
  const match = DEMO_EXPLAINABLE_MATCH;

  return (
    <section id="matching-preview" className="py-20 border-t border-slate-800/80 bg-[#080b11]">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge
            variant="default"
            className="mb-3 px-3 py-1 text-xs font-semibold uppercase bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
          >
            Live Architecture Preview
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Explainable Matching in Action
          </h2>
          <p className="mt-4 text-base text-slate-400">
            See exactly how ProjectBridge matches real client specifications with student squads.
            Every score is decomposed into explicit, auditable criteria rather than black-box recommendations.
          </p>
        </div>

        {/* Explainable Matching Case Study Card */}
        <div className="max-w-4xl mx-auto">
          <Card className="border-slate-800 bg-slate-900/80 shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-600" />

            <CardHeader className="p-6 sm:p-8 border-b border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center space-x-2 text-xs text-indigo-400 font-semibold mb-1 uppercase tracking-wider">
                    <ShieldAlert className="h-4 w-4" />
                    <span>Client: {match.project.organization?.name}</span>
                  </div>
                  <CardTitle className="text-2xl text-white font-bold">
                    {match.project.title}
                  </CardTitle>
                  <p className="text-sm text-slate-400 mt-2 line-clamp-2">
                    {match.project.description}
                  </p>
                </div>

                <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-center shrink-0">
                  <span className="text-xs font-medium text-indigo-300 uppercase tracking-wider">
                    Capability Fit
                  </span>
                  <div className="flex items-baseline space-x-1 mt-1">
                    <span className="text-4xl font-extrabold text-white">
                      {match.overallScore}
                    </span>
                    <span className="text-sm font-semibold text-indigo-400">%</span>
                  </div>
                  <Badge variant="success" className="mt-1 text-[10px] py-0 px-2">
                    Strong Fit
                  </Badge>
                </div>
              </div>

              {/* Matched Squad Pill */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-sm">
                <div className="flex items-center space-x-2 text-slate-300">
                  <Users className="h-4 w-4 text-violet-400" />
                  <span>Matched Squad:</span>
                  <span className="font-semibold text-white">
                    {match.team.name}
                  </span>
                  <span className="text-xs text-slate-500">
                    (3 Engineers - Georgia Tech, UC Berkeley, CMU)
                  </span>
                </div>

                <div className="flex items-center space-x-2 text-xs text-slate-400">
                  <Calendar className="h-4 w-4 text-slate-500" />
                  <span>Duration: {match.project.estimated_duration_weeks} Weeks</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 sm:p-8 space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-4 flex items-center space-x-2">
                  <Layers className="h-4 w-4 text-indigo-400" />
                  <span>Transparent Scoring Decomposition</span>
                </h4>

                <div className="space-y-4">
                  {match.factors.map((factor, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-lg bg-slate-950/60 border border-slate-800/80"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <CheckCircle2 className="h-4 w-4 text-indigo-400" />
                          <span className="text-sm font-medium text-white">
                            {factor.name}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs">
                          <span className="text-slate-400">
                            Weight: {factor.weight}%
                          </span>
                          <span className="font-bold text-indigo-300">
                            {factor.score}/100
                          </span>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden mb-2">
                        <div
                          className="bg-indigo-500 h-1.5 rounded-full transition-all duration-500"
                          style={{ width: `${factor.score}%` }}
                        />
                      </div>

                      <p className="text-xs text-slate-400 leading-relaxed">
                        {factor.rationale}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Required Skills vs Squad Capabilities */}
              <div className="pt-4 border-t border-slate-800/80">
                <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
                  Required Technology Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {match.project.required_skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="bg-slate-900 border-slate-700 text-slate-300 py-1 px-2.5 text-xs flex items-center space-x-1.5"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      <span>{skill}</span>
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>

            <CardFooter className="p-6 bg-slate-950/80 border-t border-slate-800 flex items-start space-x-3 text-xs text-slate-400">
              <Info className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
              <p>
                <strong className="text-slate-200">System Justification:</strong>{" "}
                {match.summary}
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
