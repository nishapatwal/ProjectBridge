import {
  Organization,
  Profile,
  Project,
  StudentProfile,
  Team,
  TeamMember,
  MatchingExplanation,
} from "@/types";

export const DEMO_CLIENTS: Profile[] = [
  {
    id: "c1111111-1111-1111-1111-111111111111",
    email: "sarah.jenkins@cybershield.demo",
    full_name: "Sarah Jenkins",
    role: "client",
    created_at: "2026-09-01T08:00:00Z",
    updated_at: "2026-09-01T08:00:00Z",
  },
  {
    id: "c2222222-2222-2222-2222-222222222222",
    email: "david.chen@finflow.demo",
    full_name: "David Chen",
    role: "client",
    created_at: "2026-09-02T08:00:00Z",
    updated_at: "2026-09-02T08:00:00Z",
  },
  {
    id: "c3333333-3333-3333-3333-333333333333",
    email: "elena.rostova@ecometrics.demo",
    full_name: "Elena Rostova",
    role: "client",
    created_at: "2026-09-03T08:00:00Z",
    updated_at: "2026-09-03T08:00:00Z",
  },
];

export const DEMO_MENTORS: Profile[] = [
  {
    id: "m1111111-1111-1111-1111-111111111111",
    email: "marcus.vance@mentor.demo",
    full_name: "Marcus Vance",
    role: "mentor",
    created_at: "2026-08-15T08:00:00Z",
    updated_at: "2026-08-15T08:00:00Z",
  },
];

export const DEMO_STUDENT_PROFILES: { profile: Profile; student: StudentProfile }[] = [
  {
    profile: {
      id: "s1111111-1111-1111-1111-111111111111",
      email: "alex.rivera@student.demo",
      full_name: "Alex Rivera",
      role: "student",
      created_at: "2026-09-05T08:00:00Z",
      updated_at: "2026-09-05T08:00:00Z",
    },
    student: {
      id: "sp111111-1111-1111-1111-111111111111",
      profile_id: "s1111111-1111-1111-1111-111111111111",
      university: "Georgia Tech",
      major: "Computer Science",
      graduation_year: 2025,
      skills: ["TypeScript", "Next.js", "Go", "DevSecOps", "Docker"],
      bio: "Focusing on distributed systems security and cloud architecture.",
      github_url: "https://github.com/alexrivera-demo",
      linkedin_url: "https://linkedin.com/in/alexrivera-demo",
      created_at: "2026-09-05T08:00:00Z",
      updated_at: "2026-09-05T08:00:00Z",
    },
  },
  {
    profile: {
      id: "s2222222-2222-2222-2222-222222222222",
      email: "priya.sharma@student.demo",
      full_name: "Priya Sharma",
      role: "student",
      created_at: "2026-09-05T08:00:00Z",
      updated_at: "2026-09-05T08:00:00Z",
    },
    student: {
      id: "sp222222-2222-2222-2222-222222222222",
      profile_id: "s2222222-2222-2222-2222-222222222222",
      university: "UC Berkeley",
      major: "Electrical Engineering & Computer Science",
      graduation_year: 2025,
      skills: ["React", "Node.js", "PostgreSQL", "TailwindCSS"],
      bio: "Full-stack builder passionate about accessible UI and robust API services.",
      github_url: "https://github.com/priyasharma-demo",
      linkedin_url: null,
      created_at: "2026-09-05T08:00:00Z",
      updated_at: "2026-09-05T08:00:00Z",
    },
  },
  {
    profile: {
      id: "s3333333-3333-3333-3333-333333333333",
      email: "jordan.taylor@student.demo",
      full_name: "Jordan Taylor",
      role: "student",
      created_at: "2026-09-05T08:00:00Z",
      updated_at: "2026-09-05T08:00:00Z",
    },
    student: {
      id: "sp333333-3333-3333-3333-333333333333",
      profile_id: "s3333333-3333-3333-3333-333333333333",
      university: "Carnegie Mellon University",
      major: "Information Security",
      graduation_year: 2026,
      skills: ["Python", "Network Security", "Linux", "OWASP"],
      bio: "Security researcher interested in threat emulation and behavioral telemetry.",
      github_url: "https://github.com/jordantaylor-demo",
      linkedin_url: null,
      created_at: "2026-09-05T08:00:00Z",
      updated_at: "2026-09-05T08:00:00Z",
    },
  },
];

export const DEMO_ORGANIZATIONS: Organization[] = [
  {
    id: "o1111111-1111-1111-1111-111111111111",
    name: "CyberShield Solutions",
    industry: "Cybersecurity & Threat Intelligence",
    website: "https://cybershield.example.internal",
    description:
      "Enterprise security vendor specializing in automated threat surface assessment and employee resilience training.",
    created_by: "c1111111-1111-1111-1111-111111111111",
    created_at: "2026-09-01T08:30:00Z",
    updated_at: "2026-09-01T08:30:00Z",
  },
  {
    id: "o2222222-2222-2222-2222-222222222222",
    name: "FinFlow Technologies",
    industry: "FinTech & Cash Flow Analytics",
    website: "https://finflow.example.internal",
    description:
      "Next-generation treasury intelligence platform providing mid-market companies real-time cash flow visibility and automated reconciliation.",
    created_by: "c2222222-2222-2222-2222-222222222222",
    created_at: "2026-09-02T08:30:00Z",
    updated_at: "2026-09-02T08:30:00Z",
  },
  {
    id: "o3333333-3333-3333-3333-333333333333",
    name: "EcoMetrics Environmental",
    industry: "Climate Tech & ESG Reporting",
    website: "https://ecometrics.example.internal",
    description:
      "Data-driven carbon accounting infrastructure helping multinational supply chains meet auditable sustainability disclosure standards.",
    created_by: "c3333333-3333-3333-3333-333333333333",
    created_at: "2026-09-03T08:30:00Z",
    updated_at: "2026-09-03T08:30:00Z",
  },
];

export const DEMO_TEAMS: (Team & { members: TeamMember[] })[] = [
  {
    id: "t1111111-1111-1111-1111-111111111111",
    name: "Team Sentinel",
    created_by: "s1111111-1111-1111-1111-111111111111",
    bio: "Senior engineering squad focused on defensive security tooling, cloud resilience, and full-stack enterprise applications.",
    status: "matched",
    created_at: "2026-09-06T10:00:00Z",
    updated_at: "2026-09-06T10:00:00Z",
    members: [
      {
        id: "tm1",
        team_id: "t1111111-1111-1111-1111-111111111111",
        profile_id: "s1111111-1111-1111-1111-111111111111",
        role_in_team: "lead",
        joined_at: "2026-09-06T10:00:00Z",
        profile: DEMO_STUDENT_PROFILES[0].profile,
      },
      {
        id: "tm2",
        team_id: "t1111111-1111-1111-1111-111111111111",
        profile_id: "s2222222-2222-2222-2222-222222222222",
        role_in_team: "member",
        joined_at: "2026-09-06T10:30:00Z",
        profile: DEMO_STUDENT_PROFILES[1].profile,
      },
      {
        id: "tm3",
        team_id: "t1111111-1111-1111-1111-111111111111",
        profile_id: "s3333333-3333-3333-3333-333333333333",
        role_in_team: "member",
        joined_at: "2026-09-06T11:00:00Z",
        profile: DEMO_STUDENT_PROFILES[2].profile,
      },
    ],
  },
  {
    id: "t2222222-2222-2222-2222-222222222222",
    name: "Team AlphaQuant",
    created_by: "s4444444-4444-4444-4444-444444444444",
    bio: "Full-stack and data engineering group specializing in real-time analytics, automated audit trails, and financial software.",
    status: "matched",
    created_at: "2026-09-07T10:00:00Z",
    updated_at: "2026-09-07T10:00:00Z",
    members: [],
  },
];

export const DEMO_PROJECTS: Project[] = [
  {
    id: "p1111111-1111-1111-1111-111111111111",
    title: "Adaptive Phishing Defense & Attack Simulation Sandbox",
    description:
      "Design and build an internal testing harness that generates realistic, safe simulated spear-phishing campaigns tailored to organizational roles. Tracks click-through rates, credential submission telemetry, and provides automated interactive remediation modules for employees who trigger simulated lures.",
    client_id: "c1111111-1111-1111-1111-111111111111",
    organization_id: "o1111111-1111-1111-1111-111111111111",
    status: "matched",
    required_skills: ["TypeScript", "Next.js", "PostgreSQL", "DevSecOps", "Docker"],
    estimated_duration_weeks: 10,
    matched_team_id: "t1111111-1111-1111-1111-111111111111",
    assigned_mentor_id: "m1111111-1111-1111-1111-111111111111",
    created_at: "2026-09-08T09:00:00Z",
    updated_at: "2026-09-10T14:00:00Z",
    organization: DEMO_ORGANIZATIONS[0],
    client: DEMO_CLIENTS[0],
    matched_team: DEMO_TEAMS[0],
    mentor: DEMO_MENTORS[0],
  },
  {
    id: "p2222222-2222-2222-2222-222222222222",
    title: "Autonomous Multi-Factor Auth Anomaly Detector",
    description:
      "Develop an edge microservice analyzing authentication request context (geolocation velocity, ASN entropy, device fingerprints) to flag session-hijacking and push-fatigue attack patterns.",
    client_id: "c1111111-1111-1111-1111-111111111111",
    organization_id: "o1111111-1111-1111-1111-111111111111",
    status: "published",
    required_skills: ["Go", "Redis", "Docker", "Network Security"],
    estimated_duration_weeks: 8,
    matched_team_id: null,
    assigned_mentor_id: null,
    created_at: "2026-09-09T10:00:00Z",
    updated_at: "2026-09-09T10:00:00Z",
    organization: DEMO_ORGANIZATIONS[0],
    client: DEMO_CLIENTS[0],
  },
  {
    id: "p3333333-3333-3333-3333-333333333333",
    title: "Automated Invoice Reconciliation & Discrepancy Flagging",
    description:
      "Build an intelligent ledger reconciliation engine that matches multi-currency enterprise purchase orders against banking transaction feeds, highlighting fee discrepancies and timing gaps.",
    client_id: "c2222222-2222-2222-2222-222222222222",
    organization_id: "o2222222-2222-2222-2222-222222222222",
    status: "in_progress",
    required_skills: ["Python", "FastAPI", "PostgreSQL", "Pandas"],
    estimated_duration_weeks: 12,
    matched_team_id: "t2222222-2222-2222-2222-222222222222",
    assigned_mentor_id: "m1111111-1111-1111-1111-111111111111",
    created_at: "2026-09-05T11:00:00Z",
    updated_at: "2026-09-12T16:00:00Z",
    organization: DEMO_ORGANIZATIONS[1],
    client: DEMO_CLIENTS[1],
    matched_team: DEMO_TEAMS[1],
    mentor: DEMO_MENTORS[0],
  },
  {
    id: "p4444444-4444-4444-4444-444444444444",
    title: "Embedded Cross-Border FX Rate Streaming Microservice",
    description:
      "Implement a low-latency WebSockets gateway aggregating institutional foreign exchange liquidity providers with failover routing and hedging threshold alerts.",
    client_id: "c2222222-2222-2222-2222-222222222222",
    organization_id: "o2222222-2222-2222-2222-222222222222",
    status: "published",
    required_skills: ["TypeScript", "Node.js", "Redis", "WebSockets"],
    estimated_duration_weeks: 8,
    matched_team_id: null,
    assigned_mentor_id: null,
    created_at: "2026-09-07T12:00:00Z",
    updated_at: "2026-09-07T12:00:00Z",
    organization: DEMO_ORGANIZATIONS[1],
    client: DEMO_CLIENTS[1],
  },
  {
    id: "p5555555-5555-5555-5555-555555555555",
    title: "Scope 3 Supply Chain Carbon Footprint Calculator",
    description:
      "Construct an auditable GHG accounting module calculating upstream shipping and procurement emissions using EPA and DEFRA emissions factor databases.",
    client_id: "c3333333-3333-3333-3333-333333333333",
    organization_id: "o3333333-3333-3333-3333-333333333333",
    status: "published",
    required_skills: ["Python", "PostgreSQL", "FastAPI", "TailwindCSS"],
    estimated_duration_weeks: 10,
    matched_team_id: null,
    assigned_mentor_id: null,
    created_at: "2026-09-08T13:00:00Z",
    updated_at: "2026-09-08T13:00:00Z",
    organization: DEMO_ORGANIZATIONS[2],
    client: DEMO_CLIENTS[2],
  },
  {
    id: "p6666666-6666-6666-6666-666666666666",
    title: "Satellite Geo-Spatial Deforestation Monitoring Dashboard",
    description:
      "Interactive web mapping portal visualizing Sentinel-2 NDVI spectral indices over tropical agroforestry concession zones to alert auditors to unauthorized canopy clearing.",
    client_id: "c3333333-3333-3333-3333-333333333333",
    organization_id: "o3333333-3333-3333-3333-333333333333",
    status: "published",
    required_skills: ["React", "Mapbox GL", "Python", "GIS"],
    estimated_duration_weeks: 12,
    matched_team_id: null,
    assigned_mentor_id: null,
    created_at: "2026-09-10T14:00:00Z",
    updated_at: "2026-09-10T14:00:00Z",
    organization: DEMO_ORGANIZATIONS[2],
    client: DEMO_CLIENTS[2],
  },
];

export const DEMO_EXPLAINABLE_MATCH: MatchingExplanation = {
  overallScore: 94,
  project: DEMO_PROJECTS[0],
  team: DEMO_TEAMS[0],
  factors: [
    {
      name: "Core Tech Stack Alignment",
      score: 96,
      maxScore: 100,
      weight: 35,
      rationale:
        "Team Sentinel demonstrates proven proficiency in Next.js, TypeScript, PostgreSQL, and Docker containerization required for the sandbox harness.",
    },
    {
      name: "Domain & Threat Modeling Knowledge",
      score: 92,
      maxScore: 100,
      weight: 30,
      rationale:
        "Member Jordan Taylor has completed coursework in network threat emulation, while lead Alex Rivera has built cloud defensive tools.",
    },
    {
      name: "Senior Mentor Oversight Fit",
      score: 98,
      maxScore: 100,
      weight: 20,
      rationale:
        "Assigned mentor Marcus Vance has 14 years of production AppSec and DevSecOps architecture experience to oversee code reviews.",
    },
    {
      name: "Bandwidth & Schedule Alignment",
      score: 90,
      maxScore: 100,
      weight: 15,
      rationale:
        "All 3 squad members share identical 10-week semester capstone milestones with 15h/week dedicated project capacity.",
    },
  ],
  summary:
    "Team Sentinel is uniquely qualified for CyberShield's Phishing Defense Sandbox. Their technical stack matches 4 of 5 requested core technologies, their academic specialization aligns with defensive threat modeling, and senior mentor Marcus Vance will conduct weekly milestone audits.",
};
