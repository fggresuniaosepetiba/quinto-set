import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { ContactForm } from "@/components/ui/ContactForm";
import { postLead } from "@/lib/api";
import { LeadValidationError } from "@/lib/leadError";

jest.mock("@/lib/api", () => ({
  postLead: jest.fn(),
}));

const mockedPostLead = postLead as jest.MockedFunction<typeof postLead>;

const fillContactForm = () => {
  fireEvent.change(screen.getByLabelText(/nome/i), {
    target: { value: "Maria Silva" },
  });
  fireEvent.change(screen.getByLabelText(/e-mail/i), {
    target: { value: "maria@email.com" },
  });
  fireEvent.change(screen.getByLabelText(/mensagem/i), {
    target: { value: "Quero saber mais sobre as turmas." },
  });
};

describe("ContactForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("envia o formulário e mostra a mensagem de sucesso", async () => {
    mockedPostLead.mockResolvedValue({
      id: "lead-1",
      type: "contact",
      createdAt: "2026-01-01T00:00:00.000Z",
    });
    render(<ContactForm />);
    fillContactForm();
    fireEvent.click(screen.getByRole("button", { name: /enviar mensagem/i }));
    expect(
      await screen.findByRole("heading", { name: "Mensagem enviada" }),
    ).toBeInTheDocument();
    expect(mockedPostLead).toHaveBeenCalledWith("/contacts", {
      name: "Maria Silva",
      email: "maria@email.com",
      phone: undefined,
      subject: "Contato pelo site",
      message: "Quero saber mais sobre as turmas.",
    });
  });

  it("manda o telefone mascarado quando preenchido", async () => {
    mockedPostLead.mockResolvedValue({
      id: "lead-1",
      type: "contact",
      createdAt: "2026-01-01T00:00:00.000Z",
    });
    render(<ContactForm />);
    fillContactForm();
    fireEvent.change(screen.getByLabelText(/telefone/i), {
      target: { value: "21974934685" },
    });
    fireEvent.click(screen.getByRole("button", { name: /enviar mensagem/i }));
    await screen.findByRole("heading", { name: "Mensagem enviada" });
    expect(mockedPostLead).toHaveBeenCalledWith(
      "/contacts",
      expect.objectContaining({ phone: "(21) 9.7493-4685" }),
    );
  });

  it("não envia e lista os campos inválidos com o motivo", () => {
    render(<ContactForm />);
    fireEvent.click(screen.getByRole("button", { name: /enviar mensagem/i }));
    expect(mockedPostLead).not.toHaveBeenCalled();
    expect(screen.getAllByRole("alert").length).toBeGreaterThan(0);
    const summary = screen
      .getByText("Corrija os campos abaixo:")
      .closest("[role='alert']") as HTMLElement;
    expect(
      within(summary).getByText("Nome"),
    ).toBeInTheDocument();
    expect(
      within(summary).getByText("E-mail"),
    ).toBeInTheDocument();
    expect(
      within(summary).getAllByText("Preencha este campo.").length,
    ).toBeGreaterThanOrEqual(3);
  });

  it("mostra a mensagem de erro quando a API falha", async () => {
    mockedPostLead.mockRejectedValue(new Error("Falha na conexão."));
    render(<ContactForm />);
    fillContactForm();
    fireEvent.click(screen.getByRole("button", { name: /enviar mensagem/i }));
    expect(
      await screen.findByText("Falha na conexão."),
    ).toBeInTheDocument();
  });

  it("lista os erros do servidor por campo quando a API responde invalid_input", async () => {
    mockedPostLead.mockRejectedValue(
      new LeadValidationError([
        { path: "email", message: "Informe um e-mail válido." },
        { path: "message", message: "Use no máximo 2000 caracteres." },
      ]),
    );
    render(<ContactForm />);
    fillContactForm();
    fireEvent.click(screen.getByRole("button", { name: /enviar mensagem/i }));

    const summary = (
      await screen.findByText("Corrija os campos abaixo:")
    ).closest("[role='alert']") as HTMLElement;
    expect(within(summary).getByText("E-mail")).toBeInTheDocument();
    expect(
      within(summary).getByText("Informe um e-mail válido."),
    ).toBeInTheDocument();
    expect(within(summary).getByText("Mensagem")).toBeInTheDocument();
    expect(
      within(summary).getByText("Use no máximo 2000 caracteres."),
    ).toBeInTheDocument();
  });

  it("indica o estado de envio no botão", async () => {
    let resolvePost: (value: unknown) => void = () => {};
    mockedPostLead.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolvePost = resolve;
        }),
    );
    render(<ContactForm />);
    fillContactForm();
    fireEvent.click(screen.getByRole("button", { name: /enviar mensagem/i }));
    expect(screen.getByRole("button", { name: /enviando/i })).toBeDisabled();
    await waitFor(() =>
      expect(mockedPostLead).toHaveBeenCalledWith("/contacts", expect.anything()),
    );
    await act(async () => {
      resolvePost({
        id: "lead-1",
        type: "contact",
        createdAt: "2026-01-01T00:00:00.000Z",
      });
    });
    expect(
      await screen.findByRole("heading", { name: "Mensagem enviada" }),
    ).toBeInTheDocument();
  });
});
