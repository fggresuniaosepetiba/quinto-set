import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_ACTIVITY_COOKIE, ADMIN_COOKIE } from "./lib/adminSession";

const PUBLIC_ADMIN_PATHS = ["/admin/login"];

function getIdleTimeoutMs(): number {
  const raw =
    process.env.ADMIN_IDLE_TIMEOUT_MINUTES ??
    process.env.NEXT_PUBLIC_ADMIN_IDLE_TIMEOUT_MINUTES;
  const minutes = raw ? Number(raw) : 15;
  return (Number.isFinite(minutes) && minutes > 0 ? minutes : 15) * 60 * 1000;
}

export function proxy(request: NextRequest): NextResponse | undefined {
  const { pathname } = request.nextUrl;
  const isAdminArea = pathname.startsWith("/admin");
  if (!isAdminArea) return NextResponse.next();

  const isPublicPath = PUBLIC_ADMIN_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
  const hasSession = request.cookies.has(ADMIN_COOKIE);

  if (isPublicPath && hasSession) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }
  if (!isPublicPath && !hasSession) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (!isPublicPath && hasSession) {
    const activityRaw = request.cookies.get(ADMIN_ACTIVITY_COOKIE)?.value;
    const lastActivity = activityRaw ? Number(activityRaw) : 0;
    const idleMs = getIdleTimeoutMs();
    const now = Date.now();
    const expired =
      !activityRaw ||
      !Number.isFinite(lastActivity) ||
      now - lastActivity > idleMs;

    if (expired) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      loginUrl.searchParams.set("reason", "idle");
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete(ADMIN_COOKIE);
      response.cookies.delete(ADMIN_ACTIVITY_COOKIE);
      return response;
    }

    const response = NextResponse.next();
    response.cookies.set(ADMIN_ACTIVITY_COOKIE, String(now), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: Math.ceil(idleMs / 1000),
    });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
