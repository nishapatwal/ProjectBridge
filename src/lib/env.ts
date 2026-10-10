import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z
    .string()
    .min(1, "NEXT_PUBLIC_SUPABASE_URL is required.")
    .refine(
      (val) => {
        try {
          const url = new URL(val);
          return url.protocol === "http:" || url.protocol === "https:";
        } catch {
          return false;
        }
      },
      {
        message: "NEXT_PUBLIC_SUPABASE_URL must be a valid HTTP/HTTPS URL.",
      }
    ),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z
    .string()
    .min(1, "NEXT_PUBLIC_SUPABASE_ANON_KEY is required."),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
  NEXT_PUBLIC_APP_URL: z.string().url().optional().default("http://localhost:3000"),
});

export type Env = z.infer<typeof envSchema>;

export function validateEnv(): {
  isValid: boolean;
  isDemoMode: boolean;
  errors: string[];
  env: Partial<Env>;
} {
  const rawEnv = {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  };

  const isPlaceholder =
    !rawEnv.NEXT_PUBLIC_SUPABASE_URL ||
    rawEnv.NEXT_PUBLIC_SUPABASE_URL.includes("your-project-id") ||
    !rawEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    rawEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY.includes("your-anon-or-publishable-key");

  if (isPlaceholder) {
    return {
      isValid: false,
      isDemoMode: true,
      errors: [
        "Supabase credentials not configured or set to placeholder values. ProjectBridge is operating in Demo Mode with simulated data.",
      ],
      env: rawEnv,
    };
  }

  const result = envSchema.safeParse(rawEnv);

  if (!result.success) {
    const formattedErrors = result.error.errors.map(
      (err) => `${err.path.join(".")}: ${err.message}`
    );
    return {
      isValid: false,
      isDemoMode: true,
      errors: formattedErrors,
      env: rawEnv,
    };
  }

  return {
    isValid: true,
    isDemoMode: false,
    errors: [],
    env: result.data,
  };
}

export const envStatus = validateEnv();
