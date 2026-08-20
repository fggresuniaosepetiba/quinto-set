import { postLead } from "@/lib/api";
import { LeadValidationError } from "@/lib/leadError";

describe("postLead", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("lança LeadValidationError com issues quando o servidor responde invalid_input", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 400,
      json: async () => ({
        error: "invalid_input",
        issues: [{ path: "email", message: "Informe um e-mail válido." }],
      }),
    }) as unknown as typeof fetch;

    const error = await postLead("/contacts", {}).catch((e) => e);
    expect(error).toBeInstanceOf(LeadValidationError);
    expect(error.message).toBe(
      "Alguns dados estão inválidos. Confira o formulário.",
    );
    expect(error.issues).toEqual([
      { path: "email", message: "Informe um e-mail válido." },
    ]);
  });

  it("lança erro genérico quando o servidor responde 500", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({ error: "internal_server_error" }),
    }) as unknown as typeof fetch;

    await expect(postLead("/contacts", {})).rejects.toThrow(
      "Não foi possível enviar. Tente novamente.",
    );
  });

  it("lança erro genérico quando a resposta não é JSON", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => {
        throw new Error("resposta sem JSON");
      },
    }) as unknown as typeof fetch;

    await expect(postLead("/contacts", {})).rejects.toThrow(
      "Não foi possível enviar. Tente novamente.",
    );
  });

  it("retorna o lead criado em caso de sucesso", async () => {
    const created = {
      id: "lead-1",
      type: "contact",
      createdAt: "2026-01-01T00:00:00.000Z",
    };
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 201,
      json: async () => created,
    }) as unknown as typeof fetch;

    await expect(
      postLead("/contacts", { name: "Ana" }),
    ).resolves.toEqual(created);
  });
});