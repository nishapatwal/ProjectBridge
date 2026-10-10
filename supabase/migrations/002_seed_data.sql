-- Migration: 002_seed_data.sql
-- Fictional Demo Seed Data for ProjectBridge (Clearly Labeled Simulated Records)

-- 1. Insert Fictional Profiles (Client Representatives, Students, Mentor)
-- Clients
INSERT INTO public.profiles (id, email, full_name, role)
VALUES
  ('c1111111-1111-1111-1111-111111111111', 'sarah.jenkins@cybershield.demo', 'Sarah Jenkins', 'client'),
  ('c2222222-2222-2222-2222-222222222222', 'david.chen@finflow.demo', 'David Chen', 'client'),
  ('c3333333-3333-3333-3333-333333333333', 'elena.rostova@ecometrics.demo', 'Elena Rostova', 'client')
ON CONFLICT (id) DO UPDATE SET full_name = EXCLUDED.full_name, role = EXCLUDED.role;

-- Mentor (provisioned administratively)
INSERT INTO public.profiles (id, email, full_name, role)
VALUES
  ('m1111111-1111-1111-1111-111111111111', 'marcus.vance@mentor.demo', 'Marcus Vance', 'mentor')
ON CONFLICT (id) DO UPDATE SET full_name = EXCLUDED.full_name, role = EXCLUDED.role;

-- Students
INSERT INTO public.profiles (id, email, full_name, role)
VALUES
  ('s1111111-1111-1111-1111-111111111111', 'alex.rivera@student.demo', 'Alex Rivera', 'student'),
  ('s2222222-2222-2222-2222-222222222222', 'priya.sharma@student.demo', 'Priya Sharma', 'student'),
  ('s3333333-3333-3333-3333-333333333333', 'jordan.taylor@student.demo', 'Jordan Taylor', 'student'),
  ('s4444444-4444-4444-4444-444444444444', 'maya.patel@student.demo', 'Maya Patel', 'student'),
  ('s5555555-5555-5555-5555-555555555555', 'samuel.torres@student.demo', 'Samuel Torres', 'student'),
  ('s6666666-6666-6666-6666-666666666666', 'chris.nguyen@student.demo', 'Chris Nguyen', 'student')
ON CONFLICT (id) DO UPDATE SET full_name = EXCLUDED.full_name, role = EXCLUDED.role;

-- 2. Organizations
INSERT INTO public.organizations (id, name, industry, website, description, created_by)
VALUES
  (
    '01111111-1111-1111-1111-111111111111',
    'CyberShield Solutions',
    'Cybersecurity & Threat Intelligence',
    'https://cybershield.example.internal',
    'Enterprise security vendor specializing in automated threat surface assessment and employee resilience training.',
    'c1111111-1111-1111-1111-111111111111'
  ),
  (
    '02222222-2222-2222-2222-222222222222',
    'FinFlow Technologies',
    'FinTech & Cash Flow Analytics',
    'https://finflow.example.internal',
    'Next-generation treasury intelligence platform providing mid-market companies real-time cash flow visibility and automated reconciliation.',
    'c2222222-2222-2222-2222-222222222222'
  ),
  (
    '03333333-3333-3333-3333-333333333333',
    'EcoMetrics Environmental',
    'Climate Tech & ESG Reporting',
    'https://ecometrics.example.internal',
    'Data-driven carbon accounting infrastructure helping multinational supply chains meet auditable sustainability disclosure standards.',
    'c3333333-3333-3333-3333-333333333333'
  )
ON CONFLICT (id) DO NOTHING;

-- 3. Student Profiles
INSERT INTO public.student_profiles (profile_id, university, major, graduation_year, skills, bio, github_url)
VALUES
  ('s1111111-1111-1111-1111-111111111111', 'Georgia Tech', 'Computer Science', 2025, ARRAY['TypeScript', 'Next.js', 'Go', 'DevSecOps', 'Docker'], 'Focusing on distributed systems security and cloud architecture.', 'https://github.com/alexrivera-demo'),
  ('s2222222-2222-2222-2222-222222222222', 'UC Berkeley', 'Electrical Engineering & Computer Science', 2025, ARRAY['React', 'Node.js', 'PostgreSQL', 'TailwindCSS'], 'Full-stack builder passionate about accessible UI and robust API services.', 'https://github.com/priyasharma-demo'),
  ('s3333333-3333-3333-3333-333333333333', 'Carnegie Mellon University', 'Information Security', 2026, ARRAY['Python', 'Network Security', 'Linux', 'OWASP'], 'Security researcher interested in threat emulation and behavioral telemetry.', 'https://github.com/jordantaylor-demo'),
  ('s4444444-4444-4444-4444-444444444444', 'University of Michigan', 'Computer Science', 2025, ARRAY['Python', 'FastAPI', 'Pandas', 'PostgreSQL', 'Kafka'], 'Data systems enthusiast focused on streaming analytics and financial pipelines.', 'https://github.com/mayapatel-demo'),
  ('s5555555-5555-5555-5555-555555555555', 'Purdue University', 'Computer Engineering', 2026, ARRAY['TypeScript', 'Rust', 'GraphQL', 'Redis'], 'Systems hacker passionate about high-throughput microservices.', 'https://github.com/samueltorres-demo'),
  ('s6666666-6666-6666-6666-666666666666', 'UT Austin', 'Software Engineering', 2025, ARRAY['React', 'Python', 'GIS', 'TailwindCSS'], 'Frontend engineer with experience in interactive map rendering and data dashboards.', 'https://github.com/chrisnguyen-demo')
ON CONFLICT (profile_id) DO NOTHING;

-- 4. Teams
INSERT INTO public.teams (id, name, created_by, bio, status)
VALUES
  ('t1111111-1111-1111-1111-111111111111', 'Team Sentinel', 's1111111-1111-1111-1111-111111111111', 'Senior engineering squad focused on defensive security tooling, cloud resilience, and full-stack enterprise applications.', 'matched'),
  ('t2222222-2222-2222-2222-222222222222', 'Team AlphaQuant', 's4444444-4444-4444-4444-444444444444', 'Full-stack and data engineering group specializing in real-time analytics, automated audit trails, and financial software.', 'matched')
ON CONFLICT (id) DO NOTHING;

-- 5. Team Members
INSERT INTO public.team_members (team_id, profile_id, role_in_team)
VALUES
  ('t1111111-1111-1111-1111-111111111111', 's1111111-1111-1111-1111-111111111111', 'lead'),
  ('t1111111-1111-1111-1111-111111111111', 's2222222-2222-2222-2222-222222222222', 'member'),
  ('t1111111-1111-1111-1111-111111111111', 's3333333-3333-3333-3333-333333333333', 'member'),
  ('t2222222-2222-2222-2222-222222222222', 's4444444-4444-4444-4444-444444444444', 'lead'),
  ('t2222222-2222-2222-2222-222222222222', 's5555555-5555-5555-5555-555555555555', 'member'),
  ('t2222222-2222-2222-2222-222222222222', 's6666666-6666-6666-6666-666666666666', 'member')
ON CONFLICT (team_id, profile_id) DO NOTHING;

-- 6. Projects (Including Phishing-Defense Scenario)
INSERT INTO public.projects (id, title, description, client_id, organization_id, status, required_skills, estimated_duration_weeks, matched_team_id, assigned_mentor_id)
VALUES
  -- 1. Phishing Defense Scenario
  (
    'p1111111-1111-1111-1111-111111111111',
    'Adaptive Phishing Defense & Attack Simulation Sandbox',
    'Design and build an internal testing harness that generates realistic, safe simulated spear-phishing campaigns tailored to organizational roles. Tracks click-through rates, credential submission telemetry, and provides automated interactive remediation modules for employees who trigger simulated lures.',
    'c1111111-1111-1111-1111-111111111111',
    '01111111-1111-1111-1111-111111111111',
    'matched',
    ARRAY['TypeScript', 'Next.js', 'PostgreSQL', 'DevSecOps', 'Docker'],
    10,
    't1111111-1111-1111-1111-111111111111',
    'm1111111-1111-1111-1111-111111111111'
  ),
  -- 2. Multi-Factor Auth Anomaly Detector
  (
    'p2222222-2222-2222-2222-222222222222',
    'Autonomous Multi-Factor Auth Anomaly Detector',
    'Develop an edge microservice analyzing authentication request context (geolocation velocity, ASN entropy, device fingerprints) to flag session-hijacking and push-fatigue attack patterns.',
    'c1111111-1111-1111-1111-111111111111',
    '01111111-1111-1111-1111-111111111111',
    'published',
    ARRAY['Go', 'Redis', 'Docker', 'Network Security'],
    8,
    NULL,
    NULL
  ),
  -- 3. Invoice Reconciliation
  (
    'p3333333-3333-3333-3333-333333333333',
    'Automated Invoice Reconciliation & Discrepancy Flagging',
    'Build an intelligent ledger reconciliation engine that matches multi-currency enterprise purchase orders against banking transaction feeds, highlighting fee discrepancies and timing gaps.',
    'c2222222-2222-2222-2222-222222222222',
    '02222222-2222-2222-2222-222222222222',
    'in_progress',
    ARRAY['Python', 'FastAPI', 'PostgreSQL', 'Pandas'],
    12,
    't2222222-2222-2222-2222-222222222222',
    'm1111111-1111-1111-1111-111111111111'
  ),
  -- 4. Cross-Border FX Microservice
  (
    'p4444444-4444-4444-4444-444444444444',
    'Embedded Cross-Border FX Rate Streaming Microservice',
    'Implement a low-latency WebSockets gateway aggregating institutional foreign exchange liquidity providers with failover routing and hedging threshold alerts.',
    'c2222222-2222-2222-2222-222222222222',
    '02222222-2222-2222-2222-222222222222',
    'published',
    ARRAY['TypeScript', 'Node.js', 'Redis', 'WebSockets'],
    8,
    NULL,
    NULL
  ),
  -- 5. Scope 3 Carbon Calculator
  (
    'p5555555-5555-5555-5555-555555555555',
    'Scope 3 Supply Chain Carbon Footprint Calculator',
    'Construct an auditable GHG accounting module calculating upstream shipping and procurement emissions using EPA and DEFRA emissions factor databases.',
    'c3333333-3333-3333-3333-333333333333',
    '03333333-3333-3333-3333-333333333333',
    'published',
    ARRAY['Python', 'PostgreSQL', 'FastAPI', 'TailwindCSS'],
    10,
    NULL,
    NULL
  ),
  -- 6. Deforestation Dashboard
  (
    'p6666666-6666-6666-6666-666666666666',
    'Satellite Geo-Spatial Deforestation Monitoring Dashboard',
    'Interactive web mapping portal visualizing Sentinel-2 NDVI spectral indices over tropical agroforestry concession zones to alert auditors to unauthorized canopy clearing.',
    'c3333333-3333-3333-3333-333333333333',
    '03333333-3333-3333-3333-333333333333',
    'published',
    ARRAY['React', 'Mapbox GL', 'Python', 'GIS'],
    12,
    NULL,
    NULL
  )
ON CONFLICT (id) DO NOTHING;
