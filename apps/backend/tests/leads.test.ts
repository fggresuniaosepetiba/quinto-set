import request from "supertest";
import { createApp } from "../src/interfaces/http/app.js";
import { container } from "../src/config/container.js";
import { AuthService } from "../src/application/services/auth-service.js";

async function loginToken(): Promise<string> {
  const authService = container.resolve(AuthService);
  await authService.seedAdmin("admin", "secret123");
  const app = createApp(authService);
  const response = await request(app).post("/auth/login").send({
    username: "admin",
    password: "secret123",
  });
  return response.body.token as string;
}

describe("GET /leads", () => {
  it("responde 401 sem token", async () => {
    const app = createApp();
    const response = await request(app).get("/leads");
    expect(response.status).toBe(401);
    expect(response.body.error).toBe("unauthorized");
  });

  it("responde 200 com lista vazia", async () => {
    const app = createApp();
    const token = await loginToken();
    const response = await request(app)
      .get("/leads")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ leads: [] });
  });

  it("retorna leads criados via POST", async () => {
    const app = createApp();
    await request(app).post("/contacts").send({
      name: "Maria Silva",
      email: "maria@email.com",
      message: "Olá",
    });
    const token = await loginToken();
    const response = await request(app)
      .get("/leads")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.leads).toHaveLength(1);
    expect(response.body.leads[0].type).toBe("contact");
  });
});
