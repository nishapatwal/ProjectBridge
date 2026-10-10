"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserRole } from "@/types";
import { signOutAction } from "@/actions/auth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Terminal,
  Briefcase,
  GraduationCap,
  ShieldCheck,
  FolderKanban,
  Building2,
  Users2,
  Settings,
  Sparkles,
  BookOpen,
  CalendarCheck2,
  LogOut,
  User,
} from "lucide-react";

interface SidebarProps {
  role: UserRole;
  userName?: string;
  userEmail?: string;
}

export function DashboardSidebar({ role, userName, userEmail }: SidebarProps) {
  const pathname = usePathname();

  const clientLinks = [
    { href: "/client/dashboard", label: "My Projects", icon: FolderKanban },
    { href: "/client/organizations", label: "Organization Profile", icon: Building2 },
    { href: "/client/matches", label: "Matched Squads", icon: Users2 },
    { href: "/client/settings", label: "Settings", icon: Settings },
  ];

  const studentLinks = [
    { href: "/student/dashboard", label: "Squad Dashboard", icon: FolderKanban },
    { href: "/student/team", label: "My Engineering Team", icon: Users2 },
    { href: "/student/projects", label: "Browse Projects", icon: Sparkles },
    { href: "/student/profile", label: "Skills & Portfolio", icon: BookOpen },
  ];

  const mentorLinks = [
    { href: "/mentor/dashboard", label: "Overview", icon: FolderKanban },
    { href: "/mentor/teams", label: "Assigned Squads", icon: Users2 },
    { href: "/mentor/reviews", label: "Milestone Reviews", icon: CalendarCheck2 },
    { href: "/mentor/settings", label: "Settings", icon: Settings },
  ];

  const links =
    role === "client"
      ? clientLinks
      : role === "student"
      ? studentLinks
      : mentorLinks;

  const roleLabel =
    role === "client" ? "Client" : role === "student" ? "Student Squad" : "Industry Mentor";

  const roleBadgeVariant =
    role === "client" ? "default" : role === "student" ? "secondary" : "success";

  return (
    <aside className="w-64 border-r border-slate-800 bg-[#06080d] flex flex-col h-screen sticky top-0 shrink-0">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600/20 border border-indigo-500/30 text-indigo-400">
            <Terminal className="h-4 w-4" />
          </div>
          <span className="text-base font-bold text-white tracking-tight">
            Project<span className="text-indigo-400">Bridge</span>
          </span>
        </Link>
        <Badge variant={roleBadgeVariant} className="text-[10px] uppercase font-bold py-0.5 px-2">
          {role}
        </Badge>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-3 py-2">
          Navigation
        </div>
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-indigo-600/15 text-indigo-300 border border-indigo-500/20 font-semibold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
              )}
            >
              <Icon className={cn("h-4 w-4 shrink-0", isActive ? "text-indigo-400" : "text-slate-500")} />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Footer Profile & Sign Out */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950/40">
        <div className="flex items-center space-x-3 mb-3">
          <div className="h-8 w-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-semibold text-indigo-300">
            {userName ? userName.charAt(0) : "U"}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-white truncate">
              {userName || "Active User"}
            </p>
            <p className="text-[10px] text-slate-500 truncate">
              {userEmail || roleLabel}
            </p>
          </div>
        </div>

        <form action={signOutAction}>
          <Button
            type="submit"
            variant="ghost"
            size="sm"
            className="w-full justify-start text-xs text-slate-400 hover:text-rose-300 hover:bg-rose-500/10 px-2.5"
          >
            <LogOut className="h-3.5 w-3.5 mr-2" />
            Sign Out
          </Button>
        </form>
      </div>
    </aside>
  );
}
