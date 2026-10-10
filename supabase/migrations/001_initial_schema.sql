-- Migration: 001_initial_schema.sql
-- ProjectBridge Core Schema & Row Level Security

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('client', 'student', 'mentor')),
  full_name text NOT NULL,
  email text NOT NULL,
  avatar_url text,
  created_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Index for role-based lookups
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);

-- 2. Organizations Table (Client Companies / Non-profits)
CREATE TABLE IF NOT EXISTS public.organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  industry text,
  website text,
  description text,
  created_by uuid NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
  created_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_organizations_created_by ON public.organizations(created_by);

-- 3. Student Profiles Table (Extended academic & capability metadata)
CREATE TABLE IF NOT EXISTS public.student_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid UNIQUE NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  university text NOT NULL,
  major text NOT NULL,
  graduation_year integer NOT NULL,
  skills text[] NOT NULL DEFAULT '{}',
  bio text,
  github_url text,
  linkedin_url text,
  created_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. Teams Table (Student Engineering Squads)
CREATE TABLE IF NOT EXISTS public.teams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  created_by uuid NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
  bio text,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'matched', 'graduated')),
  created_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_teams_status ON public.teams(status);

-- 5. Team Members Table (Join table with role in team)
CREATE TABLE IF NOT EXISTS public.team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id uuid NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
  profile_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  role_in_team text NOT NULL DEFAULT 'member' CHECK (role_in_team IN ('lead', 'member')),
  joined_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
  UNIQUE (team_id, profile_id)
);

CREATE INDEX IF NOT EXISTS idx_team_members_team ON public.team_members(team_id);
CREATE INDEX IF NOT EXISTS idx_team_members_profile ON public.team_members(profile_id);

-- 6. Projects Table (Client Scoped Problem Statements)
CREATE TABLE IF NOT EXISTS public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  client_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
  organization_id uuid REFERENCES public.organizations(id) ON DELETE SET NULL,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'matched', 'in_progress', 'completed', 'archived')),
  required_skills text[] NOT NULL DEFAULT '{}',
  estimated_duration_weeks integer,
  matched_team_id uuid REFERENCES public.teams(id) ON DELETE SET NULL,
  assigned_mentor_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_client ON public.projects(client_id);
CREATE INDEX IF NOT EXISTS idx_projects_matched_team ON public.projects(matched_team_id);
CREATE INDEX IF NOT EXISTS idx_projects_assigned_mentor ON public.projects(assigned_mentor_id);

-- 7. Trigger: Protect Role Column from unauthorized modification
CREATE OR REPLACE FUNCTION public.protect_profile_role()
RETURNS trigger AS $$
BEGIN
  -- Allow service_role / superuser to update role
  IF current_user = 'service_role' OR current_user = 'postgres' THEN
    RETURN NEW;
  END IF;

  -- Block any non-privileged role change
  IF NEW.role IS DISTINCT FROM OLD.role THEN
    RAISE EXCEPTION 'Role modifications are prohibited. Mentor and elevated accounts require administrative provisioning.';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS tr_protect_profile_role ON public.profiles;
CREATE TRIGGER tr_protect_profile_role
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.protect_profile_role();

-- 8. Trigger: Handle New Auth User Signup
-- Enforces self-signup restriction: only 'client' and 'student' are allowed.
-- Mentor role cannot be self-assigned and defaults to 'student'.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
  v_role text;
  v_full_name text;
BEGIN
  v_role := COALESCE(NEW.raw_user_meta_data->>'role', 'student');
  -- Enforce security rule: mentor accounts can never self-signup
  IF v_role NOT IN ('client', 'student') THEN
    v_role := 'student';
  END IF;

  v_full_name := COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1));

  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (NEW.id, NEW.email, v_full_name, v_role)
  ON CONFLICT (id) DO NOTHING;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 9. Enable Row Level Security (RLS) on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- 10. RLS Policies

-- PROFILES
CREATE POLICY "Profiles readable by authenticated users"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update their own profile details"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- ORGANIZATIONS
CREATE POLICY "Organizations readable by authenticated users"
  ON public.organizations FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Clients can create organizations"
  ON public.organizations FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = created_by AND
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'client')
  );

CREATE POLICY "Clients can update their own organizations"
  ON public.organizations FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

-- STUDENT_PROFILES
CREATE POLICY "Student profiles readable by authenticated users"
  ON public.student_profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Students can create their student profile"
  ON public.student_profiles FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = profile_id AND
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'student')
  );

CREATE POLICY "Students can update their student profile"
  ON public.student_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = profile_id)
  WITH CHECK (auth.uid() = profile_id);

-- TEAMS
CREATE POLICY "Teams readable by authenticated users"
  ON public.teams FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Students can create teams"
  ON public.teams FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = created_by AND
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'student')
  );

CREATE POLICY "Team leads can update team"
  ON public.teams FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.team_members
      WHERE team_id = public.teams.id
        AND profile_id = auth.uid()
        AND role_in_team = 'lead'
    )
  );

-- TEAM_MEMBERS
CREATE POLICY "Team members readable by authenticated users"
  ON public.team_members FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Team members can be added by lead or self"
  ON public.team_members FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = profile_id OR
    EXISTS (
      SELECT 1 FROM public.team_members tm
      WHERE tm.team_id = public.team_members.team_id
        AND tm.profile_id = auth.uid()
        AND tm.role_in_team = 'lead'
    )
  );

CREATE POLICY "Members can leave or lead can remove"
  ON public.team_members FOR DELETE
  TO authenticated
  USING (
    profile_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM public.team_members tm
      WHERE tm.team_id = public.team_members.team_id
        AND tm.profile_id = auth.uid()
        AND tm.role_in_team = 'lead'
    )
  );

-- PROJECTS
CREATE POLICY "Projects visibility rules"
  ON public.projects FOR SELECT
  TO authenticated
  USING (
    client_id = auth.uid() OR
    status != 'draft' OR
    assigned_mentor_id = auth.uid() OR
    matched_team_id IN (
      SELECT team_id FROM public.team_members WHERE profile_id = auth.uid()
    )
  );

CREATE POLICY "Clients can create projects"
  ON public.projects FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = client_id AND
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'client')
  );

CREATE POLICY "Clients can update their own projects"
  ON public.projects FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = client_id OR
    auth.uid() = assigned_mentor_id
  );
