import type { Lead } from "../../domain/entities/lead.js";

export interface LeadRepository {
  save(lead: Lead): Promise<Lead>;
  list(): Promise<Lead[]>;
}
