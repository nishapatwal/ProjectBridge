export type UserRole = "client" | "student" | "mentor";

export interface Profile {
  id: string;
  role: UserRole;
  full_name: string;
  email: string;
  avatar_url?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Organization {
  id: string;
  name: string;
  industry: string;
  website: string;
  description: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface StudentProfile {
  id: string;
  profile_id: string;
  university: string;
  major: string;
  graduation_year: number;
  skills: string[];
  bio: string | null;
  github_url: string | null;
  linkedin_url: string | null;
  created_at: string;
  updated_at: string;
}

export type TeamStatus = "active" | "matched" | "graduated";

export interface Team {
  id: string;
  name: string;
  created_by: string;
  bio: string | null;
  status: TeamStatus;
  created_at: string;
  updated_at: string;
}

export type TeamMemberRole = "lead" | "member";

export interface TeamMember {
  id: string;
  team_id: string;
  profile_id: string;
  role_in_team: TeamMemberRole;
  joined_at: string;
  profile?: Profile;
}

export type ProjectStatus =
  | "draft"
  | "published"
  | "matched"
  | "in_progress"
  | "completed"
  | "archived";

export interface Project {
  id: string;
  title: string;
  description: string;
  client_id: string;
  organization_id?: string | null;
  status: ProjectStatus;
  required_skills: string[];
  estimated_duration_weeks: number;
  matched_team_id?: string | null;
  assigned_mentor_id?: string | null;
  created_at: string;
  updated_at: string;
  organization?: Organization;
  client?: Profile;
  matched_team?: Team;
  mentor?: Profile;
}

export interface MatchingScoreFactor {
  name: string;
  score: number;
  maxScore: number;
  weight: number;
  rationale: string;
}

export interface MatchingExplanation {
  overallScore: number;
  project: Project;
  team: Team;
  factors: MatchingScoreFactor[];
  summary: string;
}
