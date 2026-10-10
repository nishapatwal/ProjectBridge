# ProjectBridge Master Specification

ProjectBridge is a platform that matches client business problems to student software engineering projects, supported by experienced industry mentors.

## System Overview
- Two-sided marketplace connecting industry clients (SMEs, startups, enterprises) with student software engineering teams (capstone, university clubs, student developers).
- Guided by industry mentors who review milestones, ensure architectural standards, and maintain delivery momentum.
- Explainable capability matching: pairing based on tech stack fit, domain relevance, project scope, and student capacity rather than opaque heuristics.

## Scope Roadmap

### Stage 1: Foundation (Current Scope)
1. Next.js App Router, TypeScript strict mode, Tailwind CSS, dark design tokens.
2. High-craft landing page:
   - Navbar with brand, value props, navigation, and auth actions.
   - Hero section articulating real-world client-student-mentor partnership.
   - Dual-sided problem breakdown (Client challenges vs. Student hurdles).
   - 4-step execution workflow.
   - Platform capabilities.
   - Explainable matching interactive preview card (including realistic phishing defense scenario).
   - Dual-persona CTA section and professional footer.
   - Strict rule: No fake testimonials, logos, or statistics.
3. Supabase SSR Authentication:
   - Client and student self-registration and email/password authentication.
   - Protected profiles table with immutable role column.
   - Mentor role creation strictly restricted to admin action; never allowed via self-signup.
4. Database Schema & RLS Migrations:
   - Tables: `profiles`, `organizations`, `student_profiles`, `teams`, `team_members`, `projects`.
   - Comprehensive Row Level Security (RLS) policies enforcing ownership and role separation.
   - Server-level and database-level trigger preventing role mutation by unauthorized users.
5. Role-Protected Layouts & Navigation:
   - Dedicated desktop sidebars and mobile navigation for `/client/*`, `/student/*`, and `/mentor/*`.
   - Role-aware middleware redirecting to the proper dashboard.
   - Informative `/access-denied` and custom styled `/not-found` pages.
6. Seed Data & Scripts:
   - Realistic fictional dataset: 3 client organizations, 6 student projects (including adaptive phishing defense simulation), 2 student teams.
7. Environment Configuration:
   - `.env.example` with clear placeholders.
   - Safe runtime environment validation using Zod without leaking secret values.
8. Documentation:
   - ProjectBridge-specific README with setup instructions, migration steps, and plain-language explanation of Auth, Roles, and RLS for judges.

### Future Stages (Do Not Build Yet)
- Stage 2: Scoped Intake Wizard & Project Specification Refinement.
- Stage 3: Explainable Matching Engine & Scoring Algorithm.
- Stage 4: Readiness Scoring, Milestone Tracker & Delivery Engagements.
- Stage 5: GitHub Integration & Verified Code Portfolio Proofs.
- Stage 6: Analytics, Reporting & Mentor Review System.
