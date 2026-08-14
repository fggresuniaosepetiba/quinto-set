import { render, screen } from "@testing-library/react";
import { FormSuccess } from "@/components/ui/FormSuccess";

describe("FormSuccess", () => {
  it("renderiza o título e a mensagem", () => {
    render(
      <FormSuccess
        title="Mensagem enviada"
        message="Recebemos sua mensagem."
      />,
    );
    expect(
      screen.getByRole("heading", { name: "Mensagem enviada" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Recebemos sua mensagem.")).toBeInTheDocument();
  });
});
