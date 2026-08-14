import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { Field } from "@/components/ui/Field";

const renderField = (props: Partial<Parameters<typeof Field>[0]> = {}) => {
  const defaultProps = {
    label: "Nome",
    name: "nome",
    value: "",
    onChange: () => {},
  };
  return render(<Field {...defaultProps} {...props} />);
};

const PhoneField = () => {
  const [value, setValue] = useState("");
  return (
    <Field
      label="Telefone"
      name="telefone"
      mask="phone"
      value={value}
      onChange={(_name, next) => setValue(next)}
    />
  );
};

describe("Field", () => {
  it("renderiza um input de texto", () => {
    renderField();
    expect(screen.getByRole("textbox", { name: /nome/i })).toBeInTheDocument();
  });

  it("renderiza o marcador de obrigatório", () => {
    renderField({ required: true });
    expect(screen.getByLabelText(/nome \*/i)).toBeInTheDocument();
  });

  it("renderiza um select com as opções", () => {
    renderField({
      name: "assunto",
      label: "Assunto",
      options: ["Matrícula", "Imprensa"],
    });
    const select = screen.getByRole("combobox", { name: /assunto/i });
    expect(select).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Matrícula" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Imprensa" })).toBeInTheDocument();
  });

  it("renderiza um textarea quando rows é informado", () => {
    renderField({ name: "mensagem", label: "Mensagem", rows: 5 });
    const textarea = screen.getByLabelText(/mensagem/i);
    expect(textarea.tagName).toBe("TEXTAREA");
  });

  it("aplica a máscara de telefone no input", () => {
    const onChange = jest.fn();
    renderField({
      name: "telefone",
      label: "Telefone",
      mask: "phone",
      onChange,
    });
    const input = screen.getByLabelText(/telefone/i);
    fireEvent.change(input, { target: { value: "(21) 9.7493-4685" } });
    expect(onChange).toHaveBeenCalledWith("telefone", "21974934685");
  });

  it("exibe o telefone mascarado quando há estado", () => {
    render(<PhoneField />);
    const input = screen.getByLabelText(/telefone/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "21974934685" } });
    expect(input.value).toBe("(21) 9.7493-4685");
  });

  it("exibe o erro com role alert e aria-invalid", () => {
    renderField({ error: "Preencha este campo." });
    const input = screen.getByRole("textbox", { name: /nome/i });
    expect(screen.getByRole("alert")).toHaveTextContent("Preencha este campo.");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-describedby", "nome-error");
  });

  it("exibe o hint quando não há erro", () => {
    renderField({ hint: "Obrigatório" });
    expect(screen.getByText("Obrigatório")).toBeInTheDocument();
  });

  it("esconde o campo quando hidden", () => {
    const { container } = renderField({ hidden: true });
    expect(container.querySelector("label")).toHaveClass("hidden");
  });
});
