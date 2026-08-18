import { randomUUID } from "node:crypto";
import jwt from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { env } from "../../config/env.js";
import type { Admin } from "../../domain/entities/admin.js";
import type { AdminRepository } from "../repositories/admin-repository.js";
import { hashPassword, verifyPassword } from "./password.js";

export type AuthSession = {
  token: string;
  expiresAt: string;
};

export type AuthTokenPayload = {
  sub: string;
  username: string;
};

@injectable()
export class AuthService {
  constructor(
    @inject("AdminRepository") private readonly repository: AdminRepository,
  ) {}

  async login(username: string, password: string): Promise<AuthSession> {
    const admin = await this.repository.findByUsername(username);
    if (!admin || !verifyPassword(password, admin.passwordHash)) {
      throw new Error("invalid_credentials");
    }
    return this.createSession(admin);
  }

  verifyToken(token: string): AuthTokenPayload {
    const payload = jwt.verify(token, env.AUTH_SECRET) as jwt.JwtPayload;
    if (typeof payload.sub !== "string" || typeof payload.username !== "string") {
      throw new Error("invalid_token");
    }
    return { sub: payload.sub, username: payload.username };
  }

  async seedAdmin(username: string, password: string): Promise<Admin> {
    const admin: Admin = {
      id: randomUUID(),
      username,
      passwordHash: hashPassword(password),
      createdAt: new Date().toISOString(),
    };
    return this.repository.upsert(admin);
  }

  private createSession(admin: Admin): AuthSession {
    const expiresAt = new Date(Date.now() + env.AUTH_TOKEN_TTL * 1000);
    const token = jwt.sign(
      { username: admin.username },
      env.AUTH_SECRET,
      { subject: admin.id, expiresIn: env.AUTH_TOKEN_TTL },
    );
    return { token, expiresAt: expiresAt.toISOString() };
  }
}