import Link from "next/link";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { signOutAction } from "@/actions/auth";
import { ShieldAlert, ArrowLeft, LogOut, Terminal } from "lucide-react";

export default function AccessDeniedPage() {
  const cookieStore = cookies();
  const demoRole = cookieStore.get("pb_demo_role")?.value;

  const dashboardHref = demoRole ? `/${demoRole}/dashboard` : "/login";

  return (
    <div className="min-h-screen bg-[#080b11] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      <div className="w-full max-w-md relative z-10">
        <div className="flex flex-col items-center mb-6">
          <Link href="/" className="flex items-center space-x-2.5 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600/20 border border-indigo-500/30 text-indigo-400">
              <Terminal className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Project<span className="text-indigo-400">Bridge</span>
            </span>
          </Link>
        </div>

        <Card className="border-rose-900/50 bg-slate-900/90 shadow-2xl">
          <CardHeader className="text-center pb-4 border-b border-slate-800">
            <div className="mx-auto w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-3">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <CardTitle className="text-xl text-white">Access Restricted</CardTitle>
            <p className="text-xs text-slate-400 mt-1">
              Role-Based Authorization Security Boundary
            </p>
          </CardHeader>

          <CardContent className="pt-6 space-y-4 text-center">
            <p className="text-sm text-slate-300 leading-relaxed">
              You do not have authorization to view this area. ProjectBridge enforces strict multi-tenant boundaries between{" "}
              <strong className="text-white">Client</strong>,{" "}
              <strong className="text-white">Student Squad</strong>, and{" "}
              <strong className="text-white">Mentor</strong> dashboards.
            </p>

            {demoRole && (
              <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center justify-center space-x-2 text-xs">
                <span className="text-slate-400">Your Current Active Role:</span>
                <Badge variant="outline" className="text-indigo-300 border-indigo-500/30 uppercase font-bold text-[10px]">
                  {demoRole}
                </Badge>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex flex-col space-y-2 pt-2 pb-6 border-t border-slate-800">
            <Link href={dashboardHref} className="w-full">
              <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Return to Authorized Dashboard
              </Button>
            </Link>

            <form action={signOutAction} className="w-full">
              <Button
                type="submit"
                variant="ghost"
                size="sm"
                className="w-full text-xs text-slate-400 hover:text-rose-300 hover:bg-rose-500/10"
              >
                <LogOut className="h-3.5 w-3.5 mr-1.5" />
                Sign Out
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
