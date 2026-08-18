import { jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import type { LeadData } from "../../domain/entities/lead.js";

export const leads = pgTable("leads", {
  id: text("id").primaryKey(),
  type: text("type").notNull(),
  data: jsonb("data").$type<LeadData>().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
});

export type LeadRow = typeof leads.$inferSelect;

export const admins = pgTable("admins", {
  id: text("id").primaryKey(),
  username: text("username").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
});

export type AdminRow = typeof admins.$inferSelect;
