import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DashboardLayoutClient } from "@/components/layout/dashboard-layout";
import { UserRole } from "@/types";

export default async function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const demoRole = cookieStore.get("pb_demo_role")?.value as UserRole | undefined;
  const demoName = cookieStore.get("pb_demo_name")?.value || "Sarah Jenkins (Demo)";
  const demoEmail = cookieStore.get("pb_demo_email")?.value || "sarah.jenkins@cybershield.demo";

  const isConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project-id")
  );

  if (!isConfigured) {
    if (!demoRole) {
      redirect("/login?next=/client/dashboard");
    }
    if (demoRole !== "client") {
      redirect("/access-denied");
    }

    return (
      <DashboardLayoutClient
        role="client"
        userName={demoName}
        userEmail={demoEmail}
      >
        {children}
      </DashboardLayoutClient>
    );
  }

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/client/dashboard");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name, email")
    .eq("id", user.id)
    .single();

  const userRole = (profile?.role || user.user_metadata?.role) as UserRole;
  if (userRole !== "client") {
    redirect("/access-denied");
  }

  return (
    <DashboardLayoutClient
      role="client"
      userName={profile?.full_name || user.user_metadata?.full_name}
      userEmail={profile?.email || user.email}
    >
      {children}
    </DashboardLayoutClient>
  );
}
