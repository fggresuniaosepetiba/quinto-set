import { injectable } from "tsyringe";
import type { Admin } from "../../domain/entities/admin.js";
import type { AdminRepository } from "./admin-repository.js";

@injectable()
export class InMemoryAdminRepository implements AdminRepository {
  private readonly admins: Map<string, Admin> = new Map();

  async findByUsername(username: string): Promise<Admin | null> {
    return this.admins.get(username) ?? null;
  }

  async upsert(admin: Admin): Promise<Admin> {
    this.admins.set(admin.username, admin);
    return admin;
  }

  clear(): void {
    this.admins.clear();
  }
}
