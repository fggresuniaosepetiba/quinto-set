import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  ADMIN_ACTIVITY_COOKIE,
  ADMIN_COOKIE,
  getIdleTimeoutMs,
} from "@/lib/adminSession";

const API_BASE_URL = process.env.API_URL ?? "http://localhost:3001";

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;
  if (!token) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const activityRaw = cookieStore.get(ADMIN_ACTIVITY_COOKIE)?.value;
  const lastActivity = activityRaw ? Number(activityRaw) : 0;
  const idleMs = getIdleTimeoutMs();
  if (
    activityRaw &&
    Number.isFinite(lastActivity) &&
    Date.now() - lastActivity > idleMs
  ) {
    cookieStore.delete(ADMIN_COOKIE);
    cookieStore.delete(ADMIN_ACTIVITY_COOKIE);
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  cookieStore.set(ADMIN_ACTIVITY_COOKIE, String(Date.now()), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: Math.ceil(idleMs / 1000),
  });

  try {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) {
      const session = (await response.json()) as {
        token: string;
        expiresAt: string;
      };
      if (session.token) {
        cookieStore.set(ADMIN_COOKIE, session.token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
        });
      }
    }
  } catch {}

  return NextResponse.json({ ok: true });
}
