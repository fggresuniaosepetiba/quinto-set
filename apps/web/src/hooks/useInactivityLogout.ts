"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const ACTIVITY_EVENTS: Array<keyof WindowEventMap> = [
  "mousemove",
  "keydown",
  "click",
  "scroll",
  "touchstart",
];

const STORAGE_KEY = "admin_last_activity";
const BROADCAST_CHANNEL = "admin_activity";

function getTimeouts(): { idleMs: number; warningMs: number } {
  const idleMinutes = Number(
    process.env.NEXT_PUBLIC_ADMIN_IDLE_TIMEOUT_MINUTES ?? "15",
  );
  const warningMinutes = Number(
    process.env.NEXT_PUBLIC_ADMIN_IDLE_WARNING_MINUTES ?? "2",
  );
  const idle =
    Number.isFinite(idleMinutes) && idleMinutes > 0 ? idleMinutes : 15;
  const warn =
    Number.isFinite(warningMinutes) && warningMinutes >= 0 ? warningMinutes : 2;
  return { idleMs: idle * 60 * 1000, warningMs: warn * 60 * 1000 };
}

export function useInactivityLogout() {
  const router = useRouter();
  const [showWarning, setShowWarning] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const lastActivityRef = useRef<number>(0);
  const warningTimerRef = useRef<number | null>(null);
  const logoutTimerRef = useRef<number | null>(null);
  const countdownTimerRef = useRef<number | null>(null);
  const throttleRef = useRef<number>(0);

  const clearTimers = useCallback(() => {
    if (warningTimerRef.current) window.clearTimeout(warningTimerRef.current);
    if (logoutTimerRef.current) window.clearTimeout(logoutTimerRef.current);
    if (countdownTimerRef.current)
      window.clearInterval(countdownTimerRef.current);
    warningTimerRef.current = null;
    logoutTimerRef.current = null;
    countdownTimerRef.current = null;
  }, []);

  const doLogout = useCallback(async () => {
    clearTimers();
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {}
      router.replace("/admin/login?reason=idle");
      router.refresh();
    }
  }, [clearTimers, router]);

  const scheduleTimers = useCallback(() => {
    clearTimers();
    const { idleMs, warningMs } = getTimeouts();
    const warnAt = Math.max(0, idleMs - warningMs);

    warningTimerRef.current = window.setTimeout(() => {
      setShowWarning(true);
      setCountdown(Math.ceil(warningMs / 1000));
      countdownTimerRef.current = window.setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            if (countdownTimerRef.current)
              window.clearInterval(countdownTimerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, warnAt);

    logoutTimerRef.current = window.setTimeout(() => {
      void doLogout();
    }, idleMs);
  }, [clearTimers, doLogout]);

  const refreshActivity = useCallback(() => {
    const now = Date.now();
    const throttleMs = 60 * 1000;
    if (now - throttleRef.current < throttleMs) return;
    throttleRef.current = now;
    lastActivityRef.current = now;
    try {
      localStorage.setItem(STORAGE_KEY, String(now));
    } catch {}
    try {
      const ch = new BroadcastChannel(BROADCAST_CHANNEL);
      ch.postMessage(String(now));
      ch.close();
    } catch {}
    void fetch("/api/auth/activity", { method: "POST" }).catch(() => {});
  }, []);

  const handleActivity = useCallback(() => {
    if (showWarning) {
      setShowWarning(false);
      setCountdown(0);
      if (countdownTimerRef.current)
        window.clearInterval(countdownTimerRef.current);
      countdownTimerRef.current = null;
    }
    refreshActivity();
    scheduleTimers();
  }, [refreshActivity, scheduleTimers, showWarning]);

  const handleContinue = useCallback(() => {
    setShowWarning(false);
    setCountdown(0);
    handleActivity();
  }, [handleActivity]);

  useEffect(() => {
    lastActivityRef.current = Date.now();
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) lastActivityRef.current = Number(stored) || Date.now();
    } catch {}
    scheduleTimers();

    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        lastActivityRef.current = Number(e.newValue) || Date.now();
        setShowWarning(false);
        setCountdown(0);
        scheduleTimers();
      }
    };

    let bc: BroadcastChannel | null = null;
    try {
      bc = new BroadcastChannel(BROADCAST_CHANNEL);
      bc.onmessage = () => {
        setShowWarning(false);
        setCountdown(0);
        scheduleTimers();
      };
    } catch {}

    const onPageHide = () => {
      try {
        navigator.sendBeacon("/api/auth/logout");
      } catch {}
    };

    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        const { idleMs } = getTimeouts();
        if (Date.now() - lastActivityRef.current > idleMs) {
          void doLogout();
        }
      }
    };

    for (const ev of ACTIVITY_EVENTS) {
      window.addEventListener(ev, handleActivity, { passive: true });
    }
    window.addEventListener("storage", onStorage);
    window.addEventListener("pagehide", onPageHide);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      clearTimers();
      for (const ev of ACTIVITY_EVENTS) {
        window.removeEventListener(ev, handleActivity);
      }
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("pagehide", onPageHide);
      document.removeEventListener("visibilitychange", onVisibility);
      if (bc) bc.close();
    };
  }, [clearTimers, doLogout, handleActivity, scheduleTimers]);

  return {
    showWarning,
    countdown,
    onContinue: handleContinue,
    onLogout: doLogout,
  };
}
