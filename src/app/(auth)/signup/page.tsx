"use client";

import Link from "next/link";
import { useState, Suspense } from "react";
import { useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";
import { signUpAction } from "@/actions/auth";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Terminal, ArrowRight, AlertCircle, Briefcase, GraduationCap, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium"
    >
      {pending ? "Creating Account..." : "Create Account"}
    </Button>
  );
}

function SignUpForm() {
  const searchParams = useSearchParams();
  const initialRole = searchParams.get("role") === "client" ? "client" : "student";

  const [role, setRole] = useState<"client" | "student">(initialRole);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setError(null);
    formData.set("role", role);
    const result = await signUpAction(null, formData);
    if (result?.error) {
      setError(result.error);
    }
  }

  return (
    <Card className="border-slate-800 bg-slate-900/80 shadow-2xl">
      <CardHeader className="pb-4 border-b border-slate-800/80">
        <CardTitle className="text-xl">Select Your Account Role</CardTitle>
        <CardDescription className="text-xs">
          Role determines your dashboard layout and security boundary
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-6">
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-start space-x-2.5 text-xs text-rose-300">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Role Selection Tabs */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            type="button"
            onClick={() => setRole("client")}
            className={cn(
              "p-3 rounded-xl border text-left transition-all flex flex-col justify-between",
              role === "client"
                ? "border-indigo-500/80 bg-indigo-950/40 text-white shadow-md shadow-indigo-950/50"
                : "border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700 hover:text-slate-200"
            )}
          >
            <div className="flex items-center space-x-2 mb-2">
              <Briefcase className={cn("h-4 w-4", role === "client" ? "text-indigo-400" : "text-slate-500")} />
              <span className="text-xs font-semibold">Client Org</span>
            </div>
            <span className="text-[11px] text-slate-400 leading-snug">
              Post problems & review engineering teams
            </span>
          </button>

          <button
            type="button"
            onClick={() => setRole("student")}
            className={cn(
              "p-3 rounded-xl border text-left transition-all flex flex-col justify-between",
              role === "student"
                ? "border-violet-500/80 bg-violet-950/40 text-white shadow-md shadow-violet-950/50"
                : "border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700 hover:text-slate-200"
            )}
          >
            <div className="flex items-center space-x-2 mb-2">
              <GraduationCap className={cn("h-4 w-4", role === "student" ? "text-violet-400" : "text-slate-500")} />
              <span className="text-xs font-semibold">Student Squad</span>
            </div>
            <span className="text-[11px] text-slate-400 leading-snug">
              Build client projects & earn verified proofs
            </span>
          </button>
        </div>

        {/* Mentor notice */}
        <div className="mb-6 p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 flex items-start space-x-2.5 text-[11px] text-slate-400">
          <Lock className="h-4 w-4 text-slate-500 shrink-0 mt-0.5" />
          <span>
            <strong>Mentor Security Policy:</strong> Mentor accounts are created strictly by trusted administrative action and cannot be self-registered.
          </span>
        </div>

        <form action={handleSubmit} className="space-y-4">
          <input type="hidden" name="role" value={role} />

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">
              Full Name
            </label>
            <Input
              type="text"
              name="full_name"
              required
              placeholder={role === "client" ? "Sarah Jenkins" : "Alex Rivera"}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">
              Email Address
            </label>
            <Input
              type="email"
              name="email"
              required
              placeholder={role === "client" ? "sarah@company.com" : "alex@university.edu"}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">
              Password
            </label>
            <Input
              type="password"
              name="password"
              required
              placeholder="At least 8 characters"
            />
          </div>

          <div className="pt-2">
            <SubmitButton />
          </div>
        </form>
      </CardContent>

      <CardFooter className="border-t border-slate-800/80 pt-4 pb-4 flex justify-center text-xs text-slate-400">
        <span>Already have an account? </span>
        <Link
          href="/login"
          className="text-indigo-400 hover:text-indigo-300 font-medium ml-1.5 inline-flex items-center"
        >
          Sign in here <ArrowRight className="ml-1 h-3 w-3" />
        </Link>
      </CardFooter>
    </Card>
  );
}

export default function SignUpPage() {
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
            Create your account with role-enforced access
          </p>
        </div>

        <Suspense fallback={<div className="text-center p-8 text-slate-400">Loading sign-up form...</div>}>
          <SignUpForm />
        </Suspense>
      </div>
    </div>
  );
}
