import { DEMO_PROJECTS, DEMO_ORGANIZATIONS } from "@/lib/demo-data";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FolderKanban,
  Building2,
  Users2,
  ShieldCheck,
  Plus,
  ArrowUpRight,
  Clock,
  Sparkles,
} from "lucide-react";

export default function ClientDashboardPage() {
  const clientOrg = DEMO_ORGANIZATIONS[0]; // CyberShield Solutions
  const clientProjects = DEMO_PROJECTS.filter(
    (p) => p.organization_id === clientOrg.id
  );

  return (
    <div className="space-y-8">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-xs text-indigo-400 font-semibold uppercase tracking-wider mb-1">
            <Building2 className="h-4 w-4" />
            <span>{clientOrg.name}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Client Project Command Center
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage your scoped challenges, inspect matched squads, and review delivery milestones.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Button size="sm" className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium">
            <Plus className="h-4 w-4 mr-1.5" />
            New Scoped Project
          </Button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Card className="border-slate-800 bg-slate-900/60 p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Active Challenges
            </span>
            <FolderKanban className="h-4 w-4 text-indigo-400" />
          </div>
          <div className="text-3xl font-bold text-white mt-2">
            {clientProjects.length}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {clientProjects.filter((p) => p.status === "matched").length} matched with student squads
          </p>
        </Card>

        <Card className="border-slate-800 bg-slate-900/60 p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Assigned Squads
            </span>
            <Users2 className="h-4 w-4 text-violet-400" />
          </div>
          <div className="text-3xl font-bold text-white mt-2">1</div>
          <p className="text-xs text-slate-500 mt-1">Team Sentinel (3 Senior Engineers)</p>
        </Card>

        <Card className="border-slate-800 bg-slate-900/60 p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Mentor Governance
            </span>
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-bold text-white mt-2">1 Lead</div>
          <p className="text-xs text-slate-500 mt-1">Marcus Vance (Cloudflare Principal)</p>
        </Card>
      </div>

      {/* Projects List */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">
          Scoped Engineering Challenges
        </h2>

        <div className="space-y-4">
          {clientProjects.map((project) => (
            <Card
              key={project.id}
              className="border-slate-800 bg-slate-900/70 hover:border-slate-700 transition-all shadow-md"
            >
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center space-x-2 mb-1.5">
                      <Badge
                        variant={project.status === "matched" ? "success" : "default"}
                        className="text-[10px] font-bold uppercase py-0 px-2"
                      >
                        {project.status.replace("_", " ")}
                      </Badge>
                      <span className="text-xs text-slate-500 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {project.estimated_duration_weeks} Weeks Estimated
                      </span>
                    </div>
                    <CardTitle className="text-xl text-white">
                      {project.title}
                    </CardTitle>
                  </div>

                  {project.matched_team && (
                    <div className="flex items-center space-x-2 text-xs p-2.5 rounded-lg bg-indigo-950/40 border border-indigo-500/20 text-slate-200">
                      <Users2 className="h-4 w-4 text-indigo-400 shrink-0" />
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                          Matched Team
                        </span>
                        <span className="font-semibold text-white">
                          {project.matched_team.name}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="pt-0 space-y-4">
                <p className="text-sm text-slate-400 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-800/80">
                  <div className="flex flex-wrap gap-1.5">
                    {project.required_skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="outline"
                        className="text-[11px] bg-slate-950 border-slate-800 text-slate-300"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-indigo-400 hover:text-indigo-300 hover:bg-indigo-950/50"
                  >
                    Inspect Milestones & PRs
                    <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
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
