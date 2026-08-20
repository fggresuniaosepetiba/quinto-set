import { LeadValidationError, mapServerIssues } from "@/lib/leadError";

describe("LeadValidationError", () => {
  it("carrega a mensagem genérica e as issues", () => {
    const error = new LeadValidationError([
      { path: "email", message: "Informe um e-mail válido." },
    ]);
    expect(error.name).toBe("LeadValidationError");
    expect(error.message).toBe(
      "Alguns dados estão inválidos. Confira o formulário.",
    );
    expect(error.issues).toEqual([
      { path: "email", message: "Informe um e-mail válido." },
    ]);
  });
});

describe("mapServerIssues", () => {
  const pathToField = {
    name: "nome",
    "student.birthDate": "aluno_nascimento",
    "guardian.email": "resp_email",
  };

  it("mapeia paths para campos e devolve os erros por campo", () => {
    const { fields, unmapped } = mapServerIssues(
      [
        {
          path: "student.birthDate",
          message: "A data de nascimento não pode ser no futuro.",
        },
        { path: "guardian.email", message: "Informe um e-mail válido." },
      ],
      pathToField,
    );
    expect(fields).toEqual({
      aluno_nascimento: "A data de nascimento não pode ser no futuro.",
      resp_email: "Informe um e-mail válido.",
    });
    expect(unmapped).toEqual([]);
  });

  it("devolve separadamente as issues sem campo correspondente", () => {
    const { fields, unmapped } = mapServerIssues(
      [{ path: "student.unknown", message: "Algo deu errado." }],
      pathToField,
    );
    expect(fields).toEqual({});
    expect(unmapped).toEqual([
      { path: "student.unknown", message: "Algo deu errado." },
    ]);
  });
});