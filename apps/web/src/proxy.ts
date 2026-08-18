import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_COOKIE = "admin_session";
const PUBLIC_ADMIN_PATHS = ["/admin/login"];

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
  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};