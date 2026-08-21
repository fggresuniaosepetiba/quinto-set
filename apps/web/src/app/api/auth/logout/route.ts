import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_ACTIVITY_COOKIE, ADMIN_COOKIE } from "@/lib/adminSession";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE);
  cookieStore.delete(ADMIN_ACTIVITY_COOKIE);
  return NextResponse.json({ ok: true });
}
