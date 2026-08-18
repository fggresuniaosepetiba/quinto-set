import request from "supertest";
import { createApp } from "../src/interfaces/http/app.js";

const validContact = {
  name: "Maria Silva",
  email: "maria@email.com",
  phone: "(21) 9.7493-4685",
  subject: "Matrícula",
  message: "Quero saber mais sobre as turmas.",
};

const validEnrollment = {
  student: {
    name: "João Santos",
    birthDate: "2010-05-12",
    sex: "Masculino",
    phone: "(21) 9.7493-4685",
    email: "joao@email.com",
    address: "Rua das Flores, 100 — Cesarão",
    school: "Escola Municipal A",
    grade: "8º ano",
    category: "SUB-14",
  },
  guardian: {
    name: "Ana Santos",
    relationship: "Mãe",
    phone: "(21) 9.7493-4685",
    email: "ana@email.com",
  },
};

const validSponsor = {
  company: "Empresa Exemplo",
  segment: "Tecnologia",
  contactName: "Carlos Pereira",
  phone: "(21) 9.7493-4685",
  email: "contato@empresa.com.br",
  support: "Patrocínio",
  message: "Temos interesse em apoiar o projeto.",
};

describe("POST /contacts", () => {
  it("responde 201 com dados válidos", async () => {
    const app = createApp();
    const response = await request(app).post("/contacts").send(validContact);
    expect(response.status).toBe(201);
    expect(response.body.type).toBe("contact");
    expect(typeof response.body.id).toBe("string");
    expect(typeof response.body.createdAt).toBe("string");
  });

  it("responde 400 com dados inválidos", async () => {
    const app = createApp();
    const response = await request(app)
      .post("/contacts")
      .send({ name: "", email: "invalido" });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("invalid_input");
    expect(response.body.issues.length).toBeGreaterThan(0);
  });
});

describe("POST /enrollments", () => {
  it("responde 201 com dados válidos", async () => {
    const app = createApp();
    const response = await request(app)
      .post("/enrollments")
      .send(validEnrollment);
    expect(response.status).toBe(201);
    expect(response.body.type).toBe("enrollment");
  });

  it("responde 400 com dados inválidos", async () => {
    const app = createApp();
    const response = await request(app)
      .post("/enrollments")
      .send({ student: { name: "João" } });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("invalid_input");
  });
});

describe("POST /sponsors", () => {
  it("responde 201 com dados válidos", async () => {
    const app = createApp();
    const response = await request(app).post("/sponsors").send(validSponsor);
    expect(response.status).toBe(201);
    expect(response.body.type).toBe("sponsor");
  });

  it("responde 400 com dados inválidos", async () => {
    const app = createApp();
    const response = await request(app).post("/sponsors").send({ company: "" });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("invalid_input");
  });
});
