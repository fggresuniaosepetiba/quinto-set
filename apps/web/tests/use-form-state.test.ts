import { act, renderHook } from "@testing-library/react";
import { useFormState } from "@/lib/useFormState";
import { requiredRule } from "@/lib/validation";

describe("useFormState", () => {
  it("inicializa com os valores fornecidos", () => {
    const { result } = renderHook(() =>
      useFormState({ nome: "", email: "" }),
    );
    expect(result.current.values).toEqual({ nome: "", email: "" });
    expect(result.current.errors).toEqual({});
  });

  it("handleChange atualiza o valor", () => {
    const { result } = renderHook(() =>
      useFormState({ nome: "", email: "" }),
    );
    act(() => result.current.handleChange("nome", "Ana"));
    expect(result.current.values.nome).toBe("Ana");
  });

  it("handleChange remove o erro do campo editado", () => {
    const { result } = renderHook(() => useFormState({ nome: "" }));
    act(() => result.current.handleChange("nome", ""));
    act(() => result.current.handleBlur("nome", requiredRule(true)));
    expect(result.current.errors.nome).toBeDefined();
    act(() => result.current.handleChange("nome", "Ana"));
    expect(result.current.errors.nome).toBeUndefined();
  });

  it("handleChange não altera erros de outros campos", () => {
    const { result } = renderHook(() =>
      useFormState({ nome: "", email: "" }),
    );
    act(() => result.current.handleBlur("nome", requiredRule(true)));
    act(() => result.current.handleChange("email", "ana@email.com"));
    expect(result.current.errors.nome).toBeDefined();
  });

  it("handleBlur valida e marca erro quando inválido", () => {
    const { result } = renderHook(() => useFormState({ nome: "" }));
    act(() => result.current.handleBlur("nome", requiredRule(true)));
    expect(result.current.errors.nome).toBeDefined();
  });

  it("handleBlur remove erro quando válido", () => {
    const { result } = renderHook(() => useFormState({ nome: "" }));
    act(() => result.current.handleChange("nome", "Ana"));
    act(() => result.current.handleBlur("nome", requiredRule(true)));
    expect(result.current.errors.nome).toBeUndefined();
  });

  it("handleBlur sem regra não altera erros", () => {
    const { result } = renderHook(() => useFormState({ nome: "" }));
    act(() => result.current.handleBlur("nome", undefined));
    expect(result.current.errors).toEqual({});
  });

  it("validateAll retorna e define erros para campos inválidos", () => {
    const { result } = renderHook(() =>
      useFormState({ nome: "", email: "" }),
    );
    let errors: Record<string, string> = {};
    act(() => {
      errors = result.current.validateAll({
        nome: requiredRule(true),
        email: undefined,
      });
    });
    expect(errors).toEqual({ nome: "Preencha este campo." });
    expect(result.current.errors.nome).toBeDefined();
  });

  it("validateAll retorna vazio quando tudo válido", () => {
    const { result } = renderHook(() => useFormState({ nome: "Ana" }));
    let errors: Record<string, string> = {};
    act(() => {
      errors = result.current.validateAll({ nome: requiredRule(true) });
    });
    expect(errors).toEqual({});
  });
});
