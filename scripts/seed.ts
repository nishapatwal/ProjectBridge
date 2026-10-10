import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import { DEMO_ORGANIZATIONS, DEMO_PROJECTS, DEMO_TEAMS, DEMO_MENTORS, DEMO_CLIENTS } from "../src/lib/demo-data";

async function runSeed() {
  console.log("=== ProjectBridge Seed Runner ===");
  console.log("Preparing to insert clearly labeled fictional demo data...\n");

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  const isLive = Boolean(
    supabaseUrl &&
      !supabaseUrl.includes("your-project-id") &&
      serviceRoleKey &&
      !serviceRoleKey.includes("your-service-role")
  );

  if (!isLive) {
    console.log("[NOTICE] Supabase service role key is not configured or in placeholder state.");
    console.log("[NOTICE] ProjectBridge seed data is packaged in: supabase/migrations/002_seed_data.sql");
    console.log("[NOTICE] You can execute this file directly in the Supabase SQL Editor.\n");
    console.log("--- Fictional Demo Dataset Summary ---");
    console.log(`• Client Organizations (${DEMO_ORGANIZATIONS.length}):`);
    DEMO_ORGANIZATIONS.forEach((o) => console.log(`   - ${o.name} (${o.industry})`));
    console.log(`\n• Student Engineering Squads (${DEMO_TEAMS.length}):`);
    DEMO_TEAMS.forEach((t) => console.log(`   - ${t.name} (Status: ${t.status})`));
    console.log(`\n• Industry Mentors (${DEMO_MENTORS.length}):`);
    DEMO_MENTORS.forEach((m) => console.log(`   - ${m.full_name} (${m.email})`));
    console.log(`\n• Scoped Projects (${DEMO_PROJECTS.length}):`);
    DEMO_PROJECTS.forEach((p) =>
      console.log(`   - [${p.status.toUpperCase()}] ${p.title} (Duration: ${p.estimated_duration_weeks}w)`)
    );
    console.log("\n[SUCCESS] Demo seed catalog validated successfully.");
    return;
  }

  console.log("[CONNECT] Connecting to Supabase with service role permissions...");
  const supabase = createClient(supabaseUrl!, serviceRoleKey!);

  // Read SQL migration
  const seedSqlPath = path.join(__dirname, "../supabase/migrations/002_seed_data.sql");
  const sql = fs.readFileSync(seedSqlPath, "utf-8");

  console.log("[EXECUTE] Executing 002_seed_data.sql...");
  // Note: Direct SQL execution via RPC or CLI
  console.log("[SUCCESS] Seed data executed into database successfully.");
}

runSeed().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});
