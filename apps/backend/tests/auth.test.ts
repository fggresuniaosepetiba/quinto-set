import request from "supertest";
import { createApp } from "../src/interfaces/http/app.js";
import { container } from "../src/config/container.js";
import { AuthService } from "../src/application/services/auth-service.js";
import { InMemoryAdminRepository } from "../src/application/repositories/in-memory-admin-repository.js";
import { InMemoryLeadRepository } from "../src/application/repositories/in-memory-lead-repository.js";

describe("POST /auth/login", () => {
  beforeEach(async () => {
    container.resolve(InMemoryAdminRepository).clear();
    container.resolve(InMemoryLeadRepository).clear();
    await container.resolve(AuthService).seedAdmin("admin", "secret123");
  });

  it("responde 200 com token e expiresAt", async () => {
    const app = createApp();
    const response = await request(app).post("/auth/login").send({
      username: "admin",
      password: "secret123",
    });
    expect(response.status).toBe(200);
    expect(typeof response.body.token).toBe("string");
    expect(typeof response.body.expiresAt).toBe("string");
    expect(new Date(response.body.expiresAt).getTime()).toBeGreaterThan(
      Date.now(),
    );
  });

  it("responde 401 com credenciais inválidas", async () => {
    const app = createApp();
    const response = await request(app).post("/auth/login").send({
      username: "admin",
      password: "senha-errada",
    });
    expect(response.status).toBe(401);
    expect(response.body.error).toBe("invalid_credentials");
  });

  it("responde 401 para usuário inexistente", async () => {
    const app = createApp();
    const response = await request(app).post("/auth/login").send({
      username: "nao-existe",
      password: "qualquer",
    });
    expect(response.status).toBe(401);
    expect(response.body.error).toBe("invalid_credentials");
  });

  it("responde 400 com dados inválidos", async () => {
    const app = createApp();
    const response = await request(app)
      .post("/auth/login")
      .send({ username: "", password: "" });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("invalid_input");
  });
});
