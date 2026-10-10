import { DEMO_PROJECTS, DEMO_TEAMS } from "@/lib/demo-data";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  FolderKanban,
  GitPullRequest,
  CalendarCheck2,
  AlertTriangle,
  ArrowUpRight,
  Code2,
} from "lucide-react";

export default function MentorDashboardPage() {
  const assignedProjects = [DEMO_PROJECTS[0], DEMO_PROJECTS[2]];

  return (
    <div className="space-y-8">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-xs text-emerald-400 font-semibold uppercase tracking-wider mb-1">
            <ShieldCheck className="h-4 w-4" />
            <span>Senior Architecture Oversight</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Mentor Governance Dashboard
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Review squad architectural decisions, conduct milestone code audits, and ensure production delivery.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Badge variant="outline" className="border-emerald-500/30 text-emerald-300 text-xs py-1 px-3">
            Provisioned Architect Account
          </Badge>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Card className="border-slate-800 bg-slate-900/60 p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Assigned Squads
            </span>
            <FolderKanban className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-bold text-white mt-2">2 Squads</div>
          <p className="text-xs text-slate-500 mt-1">Team Sentinel & Team AlphaQuant</p>
        </Card>

        <Card className="border-slate-800 bg-slate-900/60 p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Pending Code Reviews
            </span>
            <GitPullRequest className="h-4 w-4 text-indigo-400" />
          </div>
          <div className="text-3xl font-bold text-white mt-2">3 PRs</div>
          <p className="text-xs text-slate-500 mt-1">Simulation Harness API & Docker compose</p>
        </Card>

        <Card className="border-slate-800 bg-slate-900/60 p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Upcoming Checkpoint
            </span>
            <CalendarCheck2 className="h-4 w-4 text-violet-400" />
          </div>
          <div className="text-3xl font-bold text-white mt-2">Thursday</div>
          <p className="text-xs text-slate-500 mt-1">Sprint 6 Milestone Review (4:00 PM EST)</p>
        </Card>
      </div>

      {/* Assigned Projects */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">
          Assigned Engineering Engagements
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {assignedProjects.map((project) => (
            <Card
              key={project.id}
              className="border-slate-800 bg-slate-900/70 hover:border-slate-700 transition-all shadow-md flex flex-col justify-between"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <Badge variant="outline" className="text-[10px] uppercase font-semibold text-slate-300">
                    {project.organization?.name}
                  </Badge>
                  <Badge variant="success" className="text-[10px] uppercase font-bold py-0 px-2">
                    {project.status.replace("_", " ")}
                  </Badge>
                </div>
                <CardTitle className="text-lg text-white font-bold">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-xs text-slate-400 mt-1 line-clamp-2">
                  {project.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0 space-y-4">
                <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Assigned Squad:</span>
                  <span className="font-semibold text-white">
                    {project.matched_team?.name || "Team AlphaQuant"}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
                  <span className="text-slate-500 font-mono">
                    Duration: {project.estimated_duration_weeks}w
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/40 p-0 h-auto"
                  >
                    Open Review Queue
                    <ArrowUpRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
