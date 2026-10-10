import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { UserRole } from "@/types";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const isConfigured =
    supabaseUrl &&
    !supabaseUrl.includes("your-project-id") &&
    supabaseAnonKey &&
    !supabaseAnonKey.includes("your-anon-or-publishable-key");

  const pathname = request.nextUrl.pathname;
  const isClientRoute = pathname.startsWith("/client");
  const isStudentRoute = pathname.startsWith("/student");
  const isMentorRoute = pathname.startsWith("/mentor");
  const isProtectedRoute = isClientRoute || isStudentRoute || isMentorRoute;
  const isAuthRoute = pathname === "/login" || pathname === "/signup";

  // Check demo session cookie for local demo testing
  const demoRoleCookie = request.cookies.get("pb_demo_role")?.value as
    | UserRole
    | undefined;

  if (!isConfigured) {
    // Running in Demo Mode
    if (isProtectedRoute) {
      if (!demoRoleCookie) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("next", pathname);
        return NextResponse.redirect(loginUrl);
      }

      if (isClientRoute && demoRoleCookie !== "client") {
        return NextResponse.redirect(new URL("/access-denied", request.url));
      }
      if (isStudentRoute && demoRoleCookie !== "student") {
        return NextResponse.redirect(new URL("/access-denied", request.url));
      }
      if (isMentorRoute && demoRoleCookie !== "mentor") {
        return NextResponse.redirect(new URL("/access-denied", request.url));
      }
    }

    if (isAuthRoute && demoRoleCookie) {
      return NextResponse.redirect(
        new URL(`/${demoRoleCookie}/dashboard`, request.url)
      );
    }

    return response;
  }

  // Supabase live session evaluation
  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        request.cookies.set({ name, value, ...options });
        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        });
        response.cookies.set({ name, value, ...options });
      },
      remove(name: string, options: CookieOptions) {
        request.cookies.set({ name, value: "", ...options });
        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        });
        response.cookies.set({ name, value: "", ...options });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (isProtectedRoute) {
    if (!user) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Fetch user profile role from protected profiles table
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    const userRole = (profile?.role ||
      user.user_metadata?.role ||
      "student") as UserRole;

    if (isClientRoute && userRole !== "client") {
      return NextResponse.redirect(new URL("/access-denied", request.url));
    }
    if (isStudentRoute && userRole !== "student") {
      return NextResponse.redirect(new URL("/access-denied", request.url));
    }
    if (isMentorRoute && userRole !== "mentor") {
      return NextResponse.redirect(new URL("/access-denied", request.url));
    }
  }

  if (isAuthRoute && user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    const userRole = profile?.role || "student";
    return NextResponse.redirect(new URL(`/${userRole}/dashboard`, request.url));
  }

  return response;
}
