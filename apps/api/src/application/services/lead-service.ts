import { randomUUID } from "node:crypto";
import { inject, injectable } from "tsyringe";
import { contactSchema, enrollmentSchema, sponsorSchema } from "@quinto-set/contracts";
import { z } from "zod";
import type { Lead, LeadData, LeadType } from "../../domain/entities/lead.js";
import type { LeadRepository } from "../repositories/lead-repository.js";

const schemas: Record<LeadType, z.ZodType<LeadData>> = {
  contact: contactSchema,
  enrollment: enrollmentSchema,
  sponsor: sponsorSchema,
};

@injectable()
export class LeadService {
  constructor(
    @inject("LeadRepository") private readonly repository: LeadRepository,
  ) {}

  async submit(type: LeadType, input: unknown): Promise<Lead> {
    const data = schemas[type].parse(input);
    const lead: Lead = {
      id: randomUUID(),
      type,
      data,
      createdAt: new Date().toISOString(),
    };
    return this.repository.save(lead);
  }
}
