export const ADMIN_COOKIE = "admin_session";
export const ADMIN_ACTIVITY_COOKIE = "admin_session_activity";

function parseMinutes(value: string | undefined, fallback: number): number {
  if (!value) return fallback;
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

function readIdleMinutesEnv(fallback: number): number {
  const raw =
    process.env.ADMIN_IDLE_TIMEOUT_MINUTES ??
    process.env.NEXT_PUBLIC_ADMIN_IDLE_TIMEOUT_MINUTES;
  return parseMinutes(raw, fallback);
}

function readWarningMinutesEnv(fallback: number): number {
  const raw =
    process.env.ADMIN_IDLE_WARNING_MINUTES ??
    process.env.NEXT_PUBLIC_ADMIN_IDLE_WARNING_MINUTES;
  return parseMinutes(raw, fallback);
}

export function getIdleTimeoutMs(): number {
  return readIdleMinutesEnv(15) * 60 * 1000;
}

export function getIdleWarningMs(): number {
  return readWarningMinutesEnv(2) * 60 * 1000;
}

export function isIdleExpired(lastActivityMs: number, nowMs: number): boolean {
  return nowMs - lastActivityMs > getIdleTimeoutMs();
}
