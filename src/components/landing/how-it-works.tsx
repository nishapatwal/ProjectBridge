import { FileCheck2, Cpu, UserCheck, ShieldAlert } from "lucide-react";

export function LandingHowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Scoped Problem Intake",
      description:
        "Clients submit structured project briefs defining technical requirements, milestones, acceptance criteria, and timeframe.",
      icon: FileCheck2,
    },
    {
      number: "02",
      title: "Explainable Matching",
      description:
        "The matching engine evaluates team skill profiles, domain coursework, and bandwidth against project prerequisites with full scoring transparency.",
      icon: Cpu,
    },
    {
      number: "03",
      title: "Mentor-Guided Sprints",
      description:
        "An assigned senior industry mentor conducts weekly architecture checkpoints, code reviews, and milestone audits to guarantee code quality.",
      icon: UserCheck,
    },
    {
      number: "04",
      title: "Production Handover",
      description:
        "Clients receive tested, documented code with verified intellectual property release, while student engineers gain auditable portfolio credentials.",
      icon: ShieldAlert,
    },
  ];

  return (
    <section id="how-it-works" className="py-20 border-t border-slate-800/80 bg-[#080b11]">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-semibold tracking-wider text-indigo-400 uppercase">
            Execution Lifecycle
          </h2>
          <p className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-white">
            How ProjectBridge works from intake to handover
          </p>
          <p className="mt-4 text-base text-slate-400">
            A four-step framework built to protect client timelines while maximizing student engineering rigor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative p-6 rounded-xl border border-slate-800/90 bg-slate-900/50 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-2xl font-mono font-bold text-slate-700">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
