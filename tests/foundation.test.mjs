import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { z } from "zod";

describe("Stage 1 Foundation: Auth & Role Validation", () => {
  const signUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    full_name: z.string().min(2),
    role: z.enum(["client", "student"]),
  });

  test("accepts valid client signup", () => {
    const payload = {
      email: "sarah@cybershield.demo",
      password: "StrongPassword123!",
      full_name: "Sarah Jenkins",
      role: "client",
    };
    const result = signUpSchema.safeParse(payload);
    assert.equal(result.success, true);
  });

  test("accepts valid student signup", () => {
    const payload = {
      email: "alex@university.edu",
      password: "StrongPassword123!",
      full_name: "Alex Rivera",
      role: "student",
    };
    const result = signUpSchema.safeParse(payload);
    assert.equal(result.success, true);
  });

  test("strictly rejects mentor in self-signup (admin provisioning only)", () => {
    const payload = {
      email: "marcus@mentor.demo",
      password: "StrongPassword123!",
      full_name: "Marcus Vance",
      role: "mentor",
    };
    const result = signUpSchema.safeParse(payload);
    assert.equal(result.success, false);
    if (!result.success) {
      assert.equal(result.error.issues[0].path[0], "role");
    }
  });

  test("rejects invalid role strings", () => {
    const payload = {
      email: "attacker@test.com",
      password: "StrongPassword123!",
      full_name: "Attacker",
      role: "admin",
    };
    const result = signUpSchema.safeParse(payload);
    assert.equal(result.success, false);
  });
});

describe("Stage 1 Foundation: Fictional Demo Seed Data Integrity", () => {
  test("seed data contains required client orgs, projects, and teams", async () => {
    const {
      DEMO_ORGANIZATIONS,
      DEMO_PROJECTS,
      DEMO_TEAMS,
      DEMO_MENTORS,
    } = await import("../src/lib/demo-data.ts");

    // Requirement: 3 client orgs
    assert.equal(DEMO_ORGANIZATIONS.length, 3);
    assert.equal(DEMO_ORGANIZATIONS[0].name, "CyberShield Solutions");

    // Requirement: 6 student projects
    assert.equal(DEMO_PROJECTS.length, 6);

    // Requirement: Phishing defense scenario
    const phishingProject = DEMO_PROJECTS.find((p) =>
      p.title.includes("Phishing Defense")
    );
    assert.ok(phishingProject, "Phishing defense project must exist");
    assert.equal(phishingProject.organization?.name, "CyberShield Solutions");
    assert.equal(phishingProject.status, "matched");

    // Requirement: 2 teams
    assert.equal(DEMO_TEAMS.length, 2);
    assert.equal(DEMO_TEAMS[0].name, "Team Sentinel");

    // Requirement: 1 mentor
    assert.equal(DEMO_MENTORS.length, 1);
    assert.equal(DEMO_MENTORS[0].full_name, "Marcus Vance");
  });
});
