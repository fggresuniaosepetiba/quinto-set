import { inject, injectable } from "tsyringe";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import type { Lead } from "../../domain/entities/lead.js";
import type { LeadRepository } from "./lead-repository.js";
import { leads, type LeadRow } from "../../infra/db/schema.js";
import type * as schema from "../../infra/db/schema.js";

@injectable()
export class PostgresLeadRepository implements LeadRepository {
  constructor(
    @inject("db") private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async save(lead: Lead): Promise<Lead> {
    const [row] = await this.db
      .insert(leads)
      .values({
        id: lead.id,
        type: lead.type,
        data: lead.data,
        createdAt: new Date(lead.createdAt),
      })
      .returning();
    return this.toLead(row);
  }

  async list(): Promise<Lead[]> {
    const rows = await this.db.select().from(leads);
    return rows.map((row) => this.toLead(row));
  }

  private toLead(row: LeadRow): Lead {
    return {
      id: row.id,
      type: row.type as Lead["type"],
      data: row.data,
      createdAt: row.createdAt.toISOString(),
    };
  }
}
