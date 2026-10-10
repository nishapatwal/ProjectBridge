import { DEMO_PROJECTS, DEMO_TEAMS, DEMO_MENTORS } from "@/lib/demo-data";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users2,
  FolderKanban,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  GitPullRequest,
  ArrowUpRight,
  Code2,
} from "lucide-react";

export default function StudentDashboardPage() {
  const team = DEMO_TEAMS[0]; // Team Sentinel
  const matchedProject = DEMO_PROJECTS[0]; // Adaptive Phishing Defense
  const mentor = DEMO_MENTORS[0]; // Marcus Vance

  const milestones = [
    { name: "Scoping & Threat Model Spec", status: "completed", date: "Week 2" },
    { name: "Simulation Engine & Telemetry Core", status: "completed", date: "Week 5" },
    { name: "Interactive Employee Lure Harness", status: "in_progress", date: "Week 8" },
    { name: "Client Audit & Production Handover", status: "upcoming", date: "Week 10" },
  ];

  return (
    <div className="space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-xs text-violet-400 font-semibold uppercase tracking-wider mb-1">
            <Users2 className="h-4 w-4" />
            <span>{team.name}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Student Engineering Workspace
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Collaborate with your squad, track sprint deliverables, and review mentor code audits.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Badge variant="success" className="px-3 py-1 font-semibold text-xs">
            Active Sprint: Week 6
          </Badge>
        </div>
      </div>

      {/* Matched Project Hero Card */}
      <Card className="border-slate-800 bg-slate-900/80 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-indigo-500 to-indigo-600" />
        <CardHeader className="p-6 sm:p-8 border-b border-slate-800/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 text-xs text-indigo-400 font-semibold uppercase tracking-wider mb-1">
                <span>Client Engagement: {matchedProject.organization?.name}</span>
              </div>
              <CardTitle className="text-2xl text-white font-bold">
                {matchedProject.title}
              </CardTitle>
              <p className="text-sm text-slate-400 mt-2 max-w-3xl leading-relaxed">
                {matchedProject.description}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-violet-950/40 border border-violet-500/30 text-center shrink-0">
              <span className="text-[11px] font-semibold text-violet-300 uppercase tracking-wider block">
                Assigned Mentor
              </span>
              <span className="text-sm font-bold text-white mt-1 block">
                {mentor.full_name}
              </span>
              <span className="text-[10px] text-slate-400 mt-0.5 block">
                Cloudflare Principal Architect
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 sm:p-8 space-y-6">
          {/* Milestone Gates */}
          <div>
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-4">
              Project Delivery Milestones
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {milestones.map((m, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono text-slate-500">
                      {m.date}
                    </span>
                    <Badge
                      variant={
                        m.status === "completed"
                          ? "success"
                          : m.status === "in_progress"
                          ? "warning"
                          : "outline"
                      }
                      className="text-[9px] uppercase py-0 px-1.5"
                    >
                      {m.status.replace("_", " ")}
                    </Badge>
                  </div>
                  <span className="text-xs font-semibold text-white leading-snug">
                    {m.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Squad Roster */}
          <div className="pt-4 border-t border-slate-800/80">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
              Active Squad Contributors
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {team.members.map((member) => (
                <div
                  key={member.id}
                  className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center space-x-3"
                >
                  <div className="h-8 w-8 rounded-full bg-violet-950 border border-violet-700/50 flex items-center justify-center text-xs font-bold text-violet-300">
                    {member.profile?.full_name.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-white truncate">
                      {member.profile?.full_name}
                    </p>
                    <Badge variant="outline" className="text-[9px] uppercase py-0 px-1.5 mt-0.5">
                      {member.role_in_team}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
