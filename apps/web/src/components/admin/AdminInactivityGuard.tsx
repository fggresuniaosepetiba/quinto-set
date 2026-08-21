"use client";

import { usePathname } from "next/navigation";
import { useInactivityLogout } from "@/hooks/useInactivityLogout";

function formatCountdown(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function AdminInactivityGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLogin = pathname === "/admin/login";
  const { showWarning, countdown, onContinue, onLogout } =
    useInactivityLogout();

  if (isLogin) return <>{children}</>;

  return (
    <>
      {children}
      {showWarning && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="idle-warning-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/60 px-4 backdrop-blur-sm"
        >
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl ring-1 ring-navy-900/10">
            <h2
              id="idle-warning-title"
              className="font-display text-lg font-bold uppercase tracking-wide text-navy-900"
            >
              Sessão prestes a expirar
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-navy-900/70">
              Sua sessão expira em{" "}
              <span className="font-semibold text-navy-900">
                {formatCountdown(countdown)}
              </span>{" "}
              por inatividade.
            </p>
            <p className="mt-1 text-xs text-navy-900/50">
              Clique em Continuar para permanecer conectado.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={onContinue}
                className="flex-1 rounded-lg bg-gold-400 px-4 py-2.5 font-display text-sm font-semibold uppercase tracking-wider text-navy-950 hover:bg-gold-300"
              >
                Continuar conectado
              </button>
              <button
                type="button"
                onClick={() => void onLogout()}
                className="rounded-lg border border-navy-900/20 bg-white px-4 py-2.5 font-display text-sm font-semibold uppercase tracking-wider text-navy-900 hover:bg-cream-100"
              >
                Sair agora
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
