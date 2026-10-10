"use client";

import Link from "next/link";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { signInAction, AuthActionResult } from "@/actions/auth";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Terminal, Shield, ArrowRight, AlertCircle } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium"
    >
      {pending ? "Signing in..." : "Sign In"}
    </Button>
  );
}

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const setDemoCredentials = (role: "client" | "student" | "mentor") => {
    if (role === "client") {
      setEmail("sarah.jenkins@cybershield.demo");
      setPassword("ClientDemo2026!");
    } else if (role === "student") {
      setEmail("alex.rivera@student.demo");
      setPassword("StudentDemo2026!");
    } else {
      setEmail("marcus.vance@mentor.demo");
      setPassword("MentorDemo2026!");
    }
    setError(null);
  };

  async function handleSubmit(formData: FormData) {
    setError(null);
    const result = await signInAction(null, formData);
    if (result?.error) {
      setError(result.error);
    }
  }

  return (
    <div className="min-h-screen bg-[#080b11] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="flex items-center space-x-2.5 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600/20 border border-indigo-500/30 text-indigo-400">
              <Terminal className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Project<span className="text-indigo-400">Bridge</span>
            </span>
          </Link>
          <p className="text-xs text-slate-400">
            Sign in to access your role-specific engineering dashboard
          </p>
        </div>

        <Card className="border-slate-800 bg-slate-900/80 shadow-2xl">
          <CardHeader className="pb-4 border-b border-slate-800/80">
            <CardTitle className="text-xl">Account Sign In</CardTitle>
            <CardDescription className="text-xs">
              Enter your registered credentials below
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-start space-x-2.5 text-xs text-rose-300">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            <form action={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">
                  Email Address
                </label>
                <Input
                  type="email"
                  name="email"
                  required
                  placeholder="name@organization.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-slate-300">
                    Password
                  </label>
                </div>
                <Input
                  type="password"
                  name="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="pt-2">
                <SubmitButton />
              </div>
            </form>

            {/* Quick Demo Login Previews */}
            <div className="mt-6 pt-5 border-t border-slate-800/80">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2.5">
                Quick-Fill Demo Credentials
              </span>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setDemoCredentials("client")}
                  className="text-xs border-slate-800 hover:bg-slate-800/80 hover:text-indigo-300 text-slate-300 px-2"
                >
                  Client Demo
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setDemoCredentials("student")}
                  className="text-xs border-slate-800 hover:bg-slate-800/80 hover:text-violet-300 text-slate-300 px-2"
                >
                  Student Demo
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setDemoCredentials("mentor")}
                  className="text-xs border-slate-800 hover:bg-slate-800/80 hover:text-emerald-300 text-slate-300 px-2"
                >
                  Mentor Demo
                </Button>
              </div>
            </div>
          </CardContent>

          <CardFooter className="border-t border-slate-800/80 pt-4 pb-4 flex justify-center text-xs text-slate-400">
            <span>Don&apos;t have an account? </span>
            <Link
              href="/signup"
              className="text-indigo-400 hover:text-indigo-300 font-medium ml-1.5 inline-flex items-center"
            >
              Register here <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
