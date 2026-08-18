import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_BASE_URL = process.env.API_URL ?? "http://localhost:3001";
const ADMIN_COOKIE = "admin_session";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;

  if (!token) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const response = await fetch(`${API_BASE_URL}/leads`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.status === 401) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = await response.json().catch(() => null);
  return NextResponse.json(body, { status: response.ok ? 200 : response.status });
}