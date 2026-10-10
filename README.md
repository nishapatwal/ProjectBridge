# ProjectBridge

**ProjectBridge** is an enterprise-grade platform that connects real-world client business challenges to ambitious student software engineering squads, supervised by experienced industry mentors.

---

## Stage 1 Scope: Foundation

Stage 1 establishes the production architecture, security foundation, and public interface for ProjectBridge:

1. **Next.js App Router & Dark Design Tokens**: Modern UI built with TypeScript strict mode, Tailwind CSS, Lucide icons, and accessible dark surfaces (`#080b11`, `#0f172a`, with indigo/violet accents).
2. **Landing Page**: 8 purposeful sections including value proposition hero, structural problem breakdown, 4-step execution lifecycle, platform capabilities, interactive explainable-matching preview, dual-role CTA, and footer. Zero fabricated statistics, testimonials, or logos.
3. **Supabase SSR Authentication**: Server-side cookie-driven sessions using `@supabase/ssr`. Three roles: `client`, `student`, and `mentor`.
4. **Protected Role Enforcement**: User roles are permanently stored in a protected `profiles` table. Client and student accounts self-register; mentor accounts require trusted administrative provisioning. A PostgreSQL trigger prevents users from modifying their own `role`.
5. **Database Migrations & RLS**: Version-controlled SQL migrations in `supabase/migrations/` covering `profiles`, `organizations`, `student_profiles`, `teams`, `team_members`, and `projects`. Kernel-level Row Level Security (RLS) policies enforce ownership and role isolation.
6. **Role-Specific Protected Layouts**: Desktop sidebars and mobile drawers for `/client/*`, `/student/*`, and `/mentor/*` dashboards with automatic redirects, a dedicated `/access-denied` gate, and custom styled `/not-found` page.
7. **Simulated Seed Data**: Clearly labeled fictional demo dataset containing 3 client organizations, 6 student projects (highlighting an adaptive phishing defense simulation scenario), and 2 student engineering squads.
8. **Environment Security**: Safe runtime validation with Zod that exposes helpful errors without leaking secret values, paired with `.env.example`.

---

## Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS & custom design tokens
- **Icons**: Lucide React
- **Auth & Database**: Supabase (`@supabase/ssr`, `@supabase/supabase-js`, PostgreSQL)
- **Validation**: Zod
- **Package Manager**: npm

---

## Getting Started

### 1. Prerequisites
- Node.js 18+ (tested on Node.js 24)
- npm (package manager)

### 2. Environment Configuration
Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Populate `.env.local` with your Supabase credentials:

```ini
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-or-publishable-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-secret-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> **Security Note**: Never commit `.env.local`. It is excluded by `.gitignore` and verified before every commit.

### 3. Install Dependencies & Run Development Server

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Database Migrations & Seed Data

The database schema and demo seed records are version-controlled in the `supabase/migrations/` directory:

1. `supabase/migrations/001_initial_schema.sql`:
   - Creates `profiles`, `organizations`, `student_profiles`, `teams`, `team_members`, and `projects`.
   - Attaches `protect_profile_role()` trigger to prevent non-admin role mutation.
   - Attaches `handle_new_user()` trigger to automatically provision profile rows upon auth signup.
   - Enables and configures Row Level Security (RLS) policies across all tables.

2. `supabase/migrations/002_seed_data.sql`:
   - Populates 3 client organizations:
     - **CyberShield Solutions** (Cybersecurity & Threat Intelligence)
     - **FinFlow Technologies** (FinTech & Cash Flow Analytics)
     - **EcoMetrics Environmental** (Climate Tech & ESG Reporting)
   - Populates 6 realistic projects including the **Phishing Defense Scenario**:
     - *Adaptive Phishing Defense & Attack Simulation Sandbox* (CyberShield Solutions)
     - *Autonomous Multi-Factor Auth Anomaly Detector* (CyberShield Solutions)
     - *Automated Invoice Reconciliation & Discrepancy Flagging* (FinFlow Technologies)
     - *Embedded Cross-Border FX Rate Streaming Microservice* (FinFlow Technologies)
     - *Scope 3 Supply Chain Carbon Footprint Calculator* (EcoMetrics Environmental)
     - *Satellite Geo-Spatial Deforestation Monitoring Dashboard* (EcoMetrics Environmental)
   - Populates 2 student teams:
     - **Team Sentinel** (Defensive Security & Cloud Systems squad)
     - **Team AlphaQuant** (Data Engineering & Financial Systems squad)

To run the seed script:

```bash
npm run seed
```

---

## Demo Mode

When live Supabase credentials are not provided (e.g., during offline evaluation or before cloud project linkage), ProjectBridge automatically runs in **Demo Mode**:

- Displays realistic fictional dataset in all views.
- Provides **Quick-Fill Demo Credentials** on the `/login` page:
  - **Client Demo**: Sarah Jenkins (`sarah.jenkins@cybershield.demo`) -> `/client/dashboard`
  - **Student Demo**: Alex Rivera (`alex.rivera@student.demo`) -> `/student/dashboard`
  - **Mentor Demo**: Marcus Vance (`marcus.vance@mentor.demo`) -> `/mentor/dashboard`
- Enforces role-based route protection via session cookies (`pb_demo_role`). Visiting a route outside your role immediately redirects to `/access-denied`.

---

## Plain-Language Explanation for Presentation to Judges

When presenting ProjectBridge to judges or technical evaluators, here is how to explain the security and architecture in plain, accessible language:

### 1. How Authentication Works
> *"We use Supabase Server-Side Rendering (SSR) authentication. Instead of storing tokens in browser localStorage where malicious scripts could steal them, session cookies are managed securely on the server via HTTP-only cookies. Every request is verified server-side before any dashboard page is rendered."*

### 2. How Roles Work & Why They Cannot Be Spoofed
> *"ProjectBridge has three distinct personas: Clients, Student Squads, and Industry Mentors. Roles are stored in a protected `profiles` table in the database, not in the browser session.*
> 
> *When someone signs up, they can only register as a Client or a Student. Mentor accounts carry significant authority over code quality and milestone approvals, so mentor accounts can never be created via self-signup—they require administrative approval.*
> 
> *Furthermore, we attached a database trigger that actively rejects any attempt by a user to change their own role. Even if a user attempts to send a forged API request claiming they are an admin or mentor, the database rejects the transaction."*

### 3. How Row Level Security (RLS) Works
> *"Many web applications make the mistake of enforcing permissions only in UI buttons or API routes. If an API route has a bug, data leaks.*
> 
> *In ProjectBridge, security is enforced at the database kernel level through Row Level Security (RLS). Every SQL table has rules written into PostgreSQL itself. For example, a client company can only read and edit their own private project drafts, and student teams can only edit their own squad profiles. Even if someone writes raw SQL queries, the database itself filters out any data the caller is not authorized to see."*

---

## Code Quality & Verification

```bash
# Type check TypeScript strict mode
npm run type-check

# Run ESLint
npm run lint

# Compile production build
npm run build
```
