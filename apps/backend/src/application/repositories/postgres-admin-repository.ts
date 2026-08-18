import { inject, injectable } from "tsyringe";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import type { Admin } from "../../domain/entities/admin.js";
import type { AdminRepository } from "./admin-repository.js";
import { admins, type AdminRow } from "../../infra/db/schema.js";
import type * as schema from "../../infra/db/schema.js";

@injectable()
export class PostgresAdminRepository implements AdminRepository {
  constructor(
    @inject("db") private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async findByUsername(username: string): Promise<Admin | null> {
    const [row] = await this.db
      .select()
      .from(admins)
      .where(eq(admins.username, username));
    return row ? this.toAdmin(row) : null;
  }

  async upsert(admin: Admin): Promise<Admin> {
    const [row] = await this.db
      .insert(admins)
      .values({
        id: admin.id,
        username: admin.username,
        passwordHash: admin.passwordHash,
        createdAt: new Date(admin.createdAt),
      })
      .onConflictDoUpdate({
        target: admins.username,
        set: {
          passwordHash: admin.passwordHash,
        },
      })
      .returning();
    return this.toAdmin(row);
  }

  private toAdmin(row: AdminRow): Admin {
    return {
      id: row.id,
      username: row.username,
      passwordHash: row.passwordHash,
      createdAt: row.createdAt.toISOString(),
    };
  }
}