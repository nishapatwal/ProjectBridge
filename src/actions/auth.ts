"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { UserRole } from "@/types";

const signUpSchema = z.object({
  email: z.string().email("Please provide a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters long."),
  full_name: z.string().min(2, "Full name must be at least 2 characters."),
  role: z.enum(["client", "student"], {
    errorMap: () => ({
      message:
        "Self-registration is only allowed for Client or Student roles. Mentor accounts require administrative provisioning.",
    }),
  }),
});

const signInSchema = z.object({
  email: z.string().email("Please provide a valid email address."),
  password: z.string().min(1, "Password is required."),
});

function isConfiguredSupabase(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return Boolean(
    url &&
      !url.includes("your-project-id") &&
      key &&
      !key.includes("your-anon-or-publishable-key")
  );
}

export interface AuthActionResult {
  success?: boolean;
  error?: string;
}

export async function signUpAction(
  prevState: AuthActionResult | null,
  formData: FormData
): Promise<AuthActionResult> {
  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
    full_name: formData.get("full_name"),
    role: formData.get("role"),
  };

  const parsed = signUpSchema.safeParse(rawData);
  if (!parsed.success) {
    return {
      error: parsed.error.errors.map((e) => e.message).join(" "),
    };
  }

  const { email, password, full_name, role } = parsed.data;

  if (!isConfiguredSupabase()) {
    // Demo Mode Registration
    const cookieStore = cookies();
    cookieStore.set("pb_demo_role", role, { path: "/", httpOnly: true });
    cookieStore.set("pb_demo_name", full_name, { path: "/", httpOnly: true });
    cookieStore.set("pb_demo_email", email, { path: "/", httpOnly: true });

    redirect(`/${role}/dashboard`);
  }

  const supabase = createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name,
        role,
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  if (data?.user) {
    redirect(`/${role}/dashboard`);
  }

  return { success: true };
}

export async function signInAction(
  prevState: AuthActionResult | null,
  formData: FormData
): Promise<AuthActionResult> {
  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const parsed = signInSchema.safeParse(rawData);
  if (!parsed.success) {
    return {
      error: parsed.error.errors.map((e) => e.message).join(" "),
    };
  }

  const { email, password } = parsed.data;

  if (!isConfiguredSupabase()) {
    // Demo Mode Sign-in Matching
    let matchedRole: UserRole = "student";
    let matchedName = "Demo Student";

    if (email.includes("client") || email.includes("cybershield") || email.includes("finflow")) {
      matchedRole = "client";
      matchedName = "Sarah Jenkins";
    } else if (email.includes("mentor") || email.includes("vance")) {
      matchedRole = "mentor";
      matchedName = "Marcus Vance";
    } else {
      matchedRole = "student";
      matchedName = "Alex Rivera";
    }

    const cookieStore = cookies();
    cookieStore.set("pb_demo_role", matchedRole, { path: "/", httpOnly: true });
    cookieStore.set("pb_demo_name", matchedName, { path: "/", httpOnly: true });
    cookieStore.set("pb_demo_email", email, { path: "/", httpOnly: true });

    redirect(`/${matchedRole}/dashboard`);
  }

  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  if (!data?.user) {
    return { error: "Authentication failed. Please verify credentials." };
  }

  // Retrieve user role from protected profiles table
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .single();

  const userRole = (profile?.role || data.user.user_metadata?.role || "student") as UserRole;

  redirect(`/${userRole}/dashboard`);
}

export async function signOutAction() {
  const cookieStore = cookies();
  cookieStore.delete("pb_demo_role");
  cookieStore.delete("pb_demo_name");
  cookieStore.delete("pb_demo_email");

  if (isConfiguredSupabase()) {
    const supabase = createClient();
    await supabase.auth.signOut();
  }

  redirect("/login");
}
