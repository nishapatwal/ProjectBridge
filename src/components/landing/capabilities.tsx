import {
  ShieldCheck,
  CheckCircle,
  GitBranch,
  Layers,
  Lock,
  FileCode2,
} from "lucide-react";

export function LandingCapabilities() {
  const capabilities = [
    {
      icon: Layers,
      title: "Explainable Matching Engine",
      description:
        "Every match calculates transparent weighting scores across core tech stack proficiency, domain coursework, capacity, and mentor alignment without opaque black boxes.",
    },
    {
      icon: ShieldCheck,
      title: "Active Mentor Architecture Governance",
      description:
        "Experienced industry tech leads oversee squads, conduct pull request audits, approve system architecture designs, and ensure production standards.",
    },
    {
      icon: Lock,
      title: "Role-Segregated Multi-Tenant Security",
      description:
        "Strict database Row Level Security and server-side authorization guarantee clients, students, and mentors access only authorized scopes.",
    },
    {
      icon: GitBranch,
      title: "Milestone & Sprint Tracking",
      description:
        "Projects proceed through explicit delivery gates: scoping, design signoff, sprint implementation, test verification, and final client signoff.",
    },
    {
      icon: FileCode2,
      title: "Auditable Student Portfolios",
      description:
        "Student engineers receive cryptographically verifiable proof-of-contribution records and client references for real production deliverables.",
    },
    {
      icon: CheckCircle,
      title: "Commercial IP Transfer Protocols",
      description:
        "Pre-structured licensing and intellectual property agreements ensure clean, unambiguous transfer of rights from student contributors to client organizations.",
    },
  ];

  return (
    <section id="capabilities" className="py-20 border-t border-slate-800/80 bg-slate-950/60">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-semibold tracking-wider text-indigo-400 uppercase">
            Platform Capabilities
          </h2>
          <p className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Engineered for reliability, security, and measurable outcomes
          </p>
          <p className="mt-4 text-base text-slate-400">
            A comprehensive infrastructure purpose-built to facilitate high-trust collaboration between corporate clients and university teams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {capabilities.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-slate-700 transition-all shadow-md"
              >
                <div className="p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 inline-block mb-4">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
