import {
  MESSAGES,
  birthDateRule,
  cursorAfterDigits,
  emailRule,
  isValidEmail,
  isValidPhone,
  maskPhone,
  phoneDigits,
  phoneRule,
  requiredRule,
  unmaskPhone,
} from "@/lib/validation";

describe("phoneDigits", () => {
  it("remove caracteres não numéricos", () => {
    expect(phoneDigits("(21) 9.7493-4685")).toBe("21974934685");
  });

  it("limita a 11 dígitos", () => {
    expect(phoneDigits("2197493468512345")).toBe("21974934685");
  });

  it("retorna vazio para vazio", () => {
    expect(phoneDigits("")).toBe("");
  });
});

describe("unmaskPhone", () => {
  it("remove a máscara por completo", () => {
    expect(unmaskPhone("(21) 9.7493-4685")).toBe("21974934685");
  });
});

describe("maskPhone", () => {
  it("retorna vazio para vazio", () => {
    expect(maskPhone("")).toBe("");
  });

  it("retorna o dígito único sem máscara", () => {
    expect(maskPhone("2")).toBe("2");
  });

  it("retorna dois dígitos sem parênteses", () => {
    expect(maskPhone("21")).toBe("21");
  });

  it("abre parênteses a partir do terceiro dígito", () => {
    expect(maskPhone("219")).toBe("(21) 9");
  });

  it("adiciona o ponto após o quarto dígito", () => {
    expect(maskPhone("2197493")).toBe("(21) 9.7493");
  });

  it("adiciona o hífen após o oitavo dígito", () => {
    expect(maskPhone("21974934685")).toBe("(21) 9.7493-4685");
  });
});

describe("isValidEmail", () => {
  it("aceita e-mail válido", () => {
    expect(isValidEmail("maria@email.com")).toBe(true);
  });

  it("rejeita e-mail sem domínio", () => {
    expect(isValidEmail("maria@email")).toBe(false);
  });

  it("rejeita e-mail sem arroba", () => {
    expect(isValidEmail("maria.email.com")).toBe(false);
  });

  it("rejeita e-mail vazio", () => {
    expect(isValidEmail("   ")).toBe(false);
  });

  it("rejeita e-mail com mais de 254 caracteres", () => {
    expect(isValidEmail(`${"a".repeat(250)}@email.com`)).toBe(false);
  });
});

describe("isValidPhone", () => {
  it("aceita telefone com 11 dígitos", () => {
    expect(isValidPhone("(21) 9.7493-4685")).toBe(true);
  });

  it("rejeita telefone com menos dígitos", () => {
    expect(isValidPhone("(21) 9.7493-468")).toBe(false);
  });

  it("rejeita telefone começando com zero", () => {
    expect(isValidPhone("(02) 1.1111-1111")).toBe(false);
  });

  it("rejeita vazio", () => {
    expect(isValidPhone("")).toBe(false);
  });
});

describe("cursorAfterDigits", () => {
  it("retorna posição após o último dígito contado", () => {
    expect(cursorAfterDigits("(21) 9.7493-4685", 2)).toBe(3);
  });

  it("retorna fim da string quando faltam dígitos", () => {
    expect(cursorAfterDigits("(21) 9", 10)).toBe(6);
  });
});

describe("rules", () => {
  it("requiredRule exige valor quando obrigatório", () => {
    expect(requiredRule(true)("")).toBe(MESSAGES.required);
    expect(requiredRule(true)("Ana")).toBeNull();
  });

  it("requiredRule aceita vazio quando opcional", () => {
    expect(requiredRule(false)("")).toBeNull();
  });

  it("emailRule valida formato e obrigatoriedade", () => {
    expect(emailRule(true)("")).toBe(MESSAGES.required);
    expect(emailRule(true)("invalido")).toBe(MESSAGES.email);
    expect(emailRule(true)("ana@email.com")).toBeNull();
    expect(emailRule(false)("")).toBeNull();
  });

  it("phoneRule valida telefone e obrigatoriedade", () => {
    expect(phoneRule(true)("")).toBe(MESSAGES.required);
    expect(phoneRule(true)("(21) 9.7493-468")).toBe(MESSAGES.phone);
    expect(phoneRule(true)("(21) 9.7493-4685")).toBeNull();
    expect(phoneRule(false)("")).toBeNull();
  });

  it("birthDateRule exige data quando obrigatório", () => {
    expect(birthDateRule(true)("")).toBe(MESSAGES.required);
    expect(birthDateRule(false)("")).toBeNull();
  });

  it("birthDateRule rejeita data de calendário inválida", () => {
    expect(birthDateRule(true)("2010-02-30")).toBe(MESSAGES.birthDateInvalid);
  });

  it("birthDateRule rejeita data futura", () => {
    expect(birthDateRule(true)("2026-12-31")).toBe(MESSAGES.birthDateFuture);
  });

  it("birthDateRule rejeita data muito antiga", () => {
    expect(birthDateRule(true)("1775-02-05")).toBe(MESSAGES.birthDateTooOld);
    expect(birthDateRule(true)("1500-02-05")).toBe(MESSAGES.birthDateTooOld);
  });

  it("birthDateRule aceita data real e não futura", () => {
    expect(birthDateRule(true)("2010-05-14")).toBeNull();
    expect(birthDateRule(true)("1990-06-01")).toBeNull();
  });
});
