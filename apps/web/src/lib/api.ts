import type { CreatedLead, LeadsResponse } from "@quinto-set/contracts";
import { LeadValidationError } from "./leadError";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

const REQUEST_TIMEOUT_MS = 20_000;

export async function postLead<T = CreatedLead>(
  path: "/contacts" | "/enrollments" | "/sponsors",
  payload: unknown,
): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!response.ok) {
      let message = "Não foi possível enviar. Tente novamente.";
      try {
        const body = await response.json();
        if (body?.error === "invalid_input") {
          throw new LeadValidationError(
            Array.isArray(body.issues) ? body.issues : [],
          );
        }
      } catch (error) {
        if (error instanceof LeadValidationError) throw error;
        // resposta sem JSON: mantém a mensagem genérica
      }
      throw new Error(message);
    }

    return response.json() as Promise<T>;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("A conexão está demorando. Tente novamente.");
    }
    throw error instanceof Error
      ? error
      : new Error("Não foi possível enviar. Tente novamente.");
  } finally {
    clearTimeout(timeout);
  }
}

export class UnauthorizedError extends Error {
  constructor() {
    super("Não autorizado.");
    this.name = "UnauthorizedError";
  }
}

export async function getLeads(): Promise<LeadsResponse["leads"]> {
  const response = await fetch("/api/leads");

  if (response.status === 401) {
    throw new UnauthorizedError();
  }
  if (!response.ok) {
    throw new Error("Não foi possível carregar os leads.");
  }

  const body = (await response.json()) as LeadsResponse;
  return body.leads;
}
