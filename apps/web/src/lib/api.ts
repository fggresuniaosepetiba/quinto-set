import type { CreatedLead, LeadsResponse } from "@quinto-set/contracts";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export async function postLead<T = CreatedLead>(
  path: "/contacts" | "/enrollments" | "/sponsors",
  payload: unknown,
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let message = "Não foi possível enviar. Tente novamente.";
    try {
      const body = await response.json();
      if (body?.error === "invalid_input") {
        message = "Alguns dados estão inválidos. Confira o formulário.";
      }
    } catch {
      // resposta sem JSON: mantém a mensagem genérica
    }
    throw new Error(message);
  }

  return response.json() as Promise<T>;
}

export async function getLeads(): Promise<LeadsResponse["leads"]> {
  const response = await fetch(`${API_BASE_URL}/leads`);

  if (!response.ok) {
    throw new Error("Não foi possível carregar os leads.");
  }

  const body = (await response.json()) as LeadsResponse;
  return body.leads;
}
