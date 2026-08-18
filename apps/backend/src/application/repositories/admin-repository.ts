import type { Admin } from "../../domain/entities/admin.js";

export interface AdminRepository {
  findByUsername(username: string): Promise<Admin | null>;
  upsert(admin: Admin): Promise<Admin>;
}
