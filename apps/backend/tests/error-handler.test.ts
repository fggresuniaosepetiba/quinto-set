import request from "supertest";
import { createApp } from "../src/interfaces/http/app.js";

describe("error-handler: JSON malformado no corpo", () => {
  it("responde 400 (e não 500) quando o corpo não é JSON válido", async () => {
    const app = createApp();
    const response = await request(app)
      .post("/contacts")
      .set("Content-Type", "application/json")
      .send("{name:foo,email:a@b}");
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("bad_request");
  });
});