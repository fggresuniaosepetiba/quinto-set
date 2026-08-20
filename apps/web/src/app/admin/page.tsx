"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Download, Loader2, LogOut, RefreshCw } from "lucide-react";
import type { Lead } from "@quinto-set/contracts";
import { getLeads, UnauthorizedError } from "@/lib/api";
import { downloadLeadsWorkbook } from "@/lib/exportLeads";

type LeadType = Lead["type"];

const TYPE_LABELS: Record<LeadType, string> = {
  contact: "Contatos",
  enrollment: "Inscrições",
  sponsor: "Patrocinadores",
};

export default function AdminPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getLeads()
      .then((result) => {
        if (!cancelled) {
          setLeads(result);
          setError(null);
        }
      })
      .catch((err) => {
        if (cancelled) return;
        if (err instanceof UnauthorizedError) {
          router.replace("/admin/login");
          return;
        }
        setError(
          err instanceof Error
            ? err.message
            : "Não foi possível carregar os leads.",
        );
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [router]);

  const handleRefresh = async () => {
    setLoading(true);
    try {
      setLeads(await getLeads());
      setError(null);
    } catch (err) {
      if (err instanceof UnauthorizedError) {
        router.replace("/admin/login");
        return;
      }
      setError(
        err instanceof Error
          ? err.message
          : "Não foi possível carregar os leads.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      await downloadLeadsWorkbook(leads);
    } finally {
      setExporting(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  };

  const byType = (type: LeadType) => leads.filter((lead) => lead.type === type);

  return (
    <main className="bg-cream-50 py-16">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold uppercase tracking-wide text-navy-900">
              Administração
            </h1>
            <p className="mt-1 text-sm text-navy-900/65">
              Leads recebidos pelo site.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => void handleRefresh()}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-lg border border-navy-900/20 bg-white px-4 py-2.5 font-display text-sm font-semibold uppercase tracking-wider text-navy-900 transition-colors hover:bg-cream-100 disabled:opacity-60"
            >
              <RefreshCw className="h-4 w-4" />
              Atualizar
            </button>
            <button
              type="button"
              onClick={() => void handleExport()}
              disabled={exporting || leads.length === 0}
              className="inline-flex items-center gap-2 rounded-lg bg-gold-400 px-4 py-2.5 font-display text-sm font-semibold uppercase tracking-wider text-navy-950 transition-colors hover:bg-gold-300 disabled:opacity-60"
            >
              {exporting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
              {exporting ? "Gerando..." : "Exportar Excel"}
            </button>
            <button
              type="button"
              onClick={() => void handleLogout()}
              className="inline-flex items-center gap-2 rounded-lg border border-navy-900/20 bg-white px-4 py-2.5 font-display text-sm font-semibold uppercase tracking-wider text-navy-900 transition-colors hover:bg-cream-100"
            >
              <LogOut className="h-4 w-4" />
              Sair
            </button>
          </div>
        </div>

        {error && (
          <p
            role="alert"
            className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </p>
        )}

        {loading ? (
          <div className="mt-12 flex items-center justify-center gap-2 text-navy-900/65">
            <Loader2 className="h-5 w-5 animate-spin" />
            Carregando...
          </div>
        ) : (
          <div className="mt-8 space-y-10">
            {(["contact", "enrollment", "sponsor"] as const).map((type) => (
              <LeadTable key={type} type={type} leads={byType(type)} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

const HEADERS: Record<LeadType, string[]> = {
  contact: ["Nome", "E-mail", "Telefone", "Assunto", "Mensagem", "Data de cadastro"],
  enrollment: [
    "Aluno",
    "Data de nascimento",
    "Categoria",
    "Responsável",
    "Telefone do responsável",
    "Data de cadastro",
  ],
  sponsor: ["Empresa", "Segmento", "Contato", "E-mail", "Telefone", "Data de cadastro"],
};

function LeadTable({ type, leads }: { type: LeadType; leads: Lead[] }) {
  return (
    <section>
      <div className="mb-3 flex items-baseline gap-3">
        <h2 className="font-display text-xl font-bold uppercase tracking-wide text-navy-900">
          {TYPE_LABELS[type]}
        </h2>
        <span className="text-sm text-navy-900/65">{leads.length}</span>
      </div>
      <div className="overflow-x-auto rounded-xl bg-white shadow-sm ring-1 ring-navy-900/10">
        <table className="min-w-full divide-y divide-navy-900/10 text-left text-sm">
          <thead className="bg-navy-950 text-gold-400">
            <tr>
              {HEADERS[type].map((header) => (
                <th
                  key={header}
                  className="whitespace-nowrap px-4 py-3 font-display text-xs font-semibold uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-900/10">
            {leads.length === 0 ? (
              <tr>
                <td
                  colSpan={HEADERS[type].length}
                  className="px-4 py-6 text-center text-navy-900/50"
                >
                  Nenhum registro.
                </td>
              </tr>
            ) : (
              leads.map((lead) => <LeadRow key={lead.id} lead={lead} />)
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function LeadRow({ lead }: { lead: Lead }) {
  const data = lead.data as Record<string, unknown>;
  const fields: Record<LeadType, string[]> = {
    contact: [
      String(data.name ?? ""),
      String(data.email ?? ""),
      String(data.phone ?? ""),
      String(data.subject ?? ""),
      String(data.message ?? ""),
      new Date(lead.createdAt).toLocaleDateString("pt-BR"),
    ],
    enrollment: (() => {
      const student = data.student as Record<string, unknown> | undefined;
      const guardian = data.guardian as Record<string, unknown> | undefined;
      return [
        String(student?.name ?? ""),
        String(student?.birthDate ?? "").split("-").reverse().join("/"),
        String(student?.category ?? ""),
        String(guardian?.name ?? ""),
        String(guardian?.phone ?? ""),
        new Date(lead.createdAt).toLocaleDateString("pt-BR"),
      ];
    })(),
    sponsor: [
      String(data.company ?? ""),
      String(data.segment ?? ""),
      String(data.contactName ?? ""),
      String(data.email ?? ""),
      String(data.phone ?? ""),
      new Date(lead.createdAt).toLocaleDateString("pt-BR"),
    ],
  };

  return (
    <tr className="hover:bg-cream-100">
      {fields[lead.type].map((value, index) => (
        <td key={index} className="px-4 py-3 text-navy-900/80">
          {value}
        </td>
      ))}
    </tr>
  );
}
