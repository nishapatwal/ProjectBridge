"use client";

import { useState } from "react";
import Link from "next/link";
import { UserRole } from "@/types";
import { DashboardSidebar } from "@/components/layout/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { signOutAction } from "@/actions/auth";
import { Terminal, Menu, X, LogOut } from "lucide-react";

interface DashboardLayoutClientProps {
  children: React.ReactNode;
  role: UserRole;
  userName?: string;
  userEmail?: string;
}

export function DashboardLayoutClient({
  children,
  role,
  userName,
  userEmail,
}: DashboardLayoutClientProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#080b11] text-slate-100 flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <DashboardSidebar
          role={role}
          userName={userName}
          userEmail={userEmail}
        />
      </div>

      {/* Mobile Top Navigation Bar */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-slate-800 bg-[#06080d] sticky top-0 z-50">
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600/20 border border-indigo-500/30 text-indigo-400">
            <Terminal className="h-4 w-4" />
          </div>
          <span className="text-base font-bold text-white tracking-tight">
            Project<span className="text-indigo-400">Bridge</span>
          </span>
        </Link>

        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-[10px] uppercase font-bold text-slate-300">
            {role}
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-slate-300"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[61px] z-40 bg-[#080b11]/95 backdrop-blur-md p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <p className="text-xs font-semibold text-white">{userName || "Active User"}</p>
              <p className="text-[11px] text-slate-400">{userEmail}</p>
            </div>

            <nav className="space-y-2">
              <Link
                href={`/${role}/dashboard`}
                onClick={() => setMobileMenuOpen(false)}
                className="block p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-sm font-medium text-slate-200"
              >
                Dashboard Overview
              </Link>
            </nav>
          </div>

          <form action={signOutAction} className="pt-6 border-t border-slate-800">
            <Button
              type="submit"
              variant="outline"
              className="w-full justify-center text-rose-300 border-rose-500/30 hover:bg-rose-500/10"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </form>
        </div>
      )}

      {/* Main Content Viewport */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        <div className="p-6 sm:p-8 md:p-10 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
