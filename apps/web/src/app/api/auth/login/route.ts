import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

const API_BASE_URL = process.env.API_URL ?? "http://localhost:3001";
const ADMIN_COOKIE = "admin_session";

export async function POST(request: NextRequest) {
  const payload = await request.json().catch(() => null);

  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    const error =
      body?.error === "invalid_credentials"
        ? "invalid_credentials"
        : "invalid_input";
    return NextResponse.json({ error }, { status: response.status });
  }

  const session = body as { token: string; expiresAt: string };
  const maxAge = Math.max(
    1,
    Math.floor(
      (new Date(session.expiresAt).getTime() - Date.now()) / 1000,
    ),
  );

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, session.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge,
  });

  return NextResponse.json({ ok: true });
}