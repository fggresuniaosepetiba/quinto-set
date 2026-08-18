import { injectable } from "tsyringe";
import type { Lead } from "../../domain/entities/lead.js";
import type { LeadRepository } from "./lead-repository.js";

@injectable()
export class InMemoryLeadRepository implements LeadRepository {
  private readonly leads: Lead[] = [];

  async save(lead: Lead): Promise<Lead> {
    this.leads.push(lead);
    return lead;
  }

  async list(): Promise<Lead[]> {
    return [...this.leads];
  }
}
