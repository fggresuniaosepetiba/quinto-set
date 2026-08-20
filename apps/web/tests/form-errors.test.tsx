import { fireEvent, render, screen } from "@testing-library/react";
import { FormErrors } from "@/components/ui/FormErrors";

describe("FormErrors", () => {
  it("não renderiza nada quando não há itens", () => {
    const { container } = render(<FormErrors items={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("lista cada campo inválido com o motivo", () => {
    render(
      <FormErrors
        items={[
          { name: "nome", label: "Nome", error: "Preencha este campo." },
          {
            name: "email",
            label: "E-mail",
            error: "Informe um e-mail válido.",
          },
        ]}
      />,
    );
    expect(screen.getByText("Corrija os campos abaixo:")).toBeInTheDocument();
    expect(screen.getByText("Nome")).toBeInTheDocument();
    expect(screen.getByText("Preencha este campo.")).toBeInTheDocument();
    expect(screen.getByText("E-mail")).toBeInTheDocument();
    expect(screen.getByText("Informe um e-mail válido.")).toBeInTheDocument();
  });

  it("foca o campo ao clicar no item", () => {
    render(
      <>
        <input id="nome-field" />
        <FormErrors
          items={[{ name: "nome", label: "Nome", error: "Preencha este campo." }]}
        />
      </>,
    );
    fireEvent.click(screen.getByRole("button", { name: /nome/i }));
    expect(document.getElementById("nome-field")).toHaveFocus();
  });
});