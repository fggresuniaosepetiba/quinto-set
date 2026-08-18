import request from "supertest";
import { createApp } from "../src/interfaces/http/app.js";

describe("GET /leads", () => {
  it("responde 200 com lista vazia", async () => {
    const app = createApp();
    const response = await request(app).get("/leads");
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
    const response = await request(app).get("/leads");
    expect(response.status).toBe(200);
    expect(response.body.leads).toHaveLength(1);
    expect(response.body.leads[0].type).toBe("contact");
  });
});
