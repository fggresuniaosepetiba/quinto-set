import request from "supertest";
import { createApp } from "../src/interfaces/http/app.js";

describe("GET /health", () => {
  it("responde 200 com status ok", async () => {
    const app = createApp();
    const response = await request(app).get("/health");
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("ok");
    expect(typeof response.body.timestamp).toBe("string");
    expect(typeof response.body.uptime).toBe("number");
  });
});
