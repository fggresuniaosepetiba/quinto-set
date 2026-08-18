import type { NextFunction, Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import type { LeadService } from "../../../application/services/lead-service.js";
import type { LeadType } from "../../../domain/entities/lead.js";

@injectable()
export class FormController {
  constructor(
    @inject("LeadService") private readonly leadService: LeadService,
  ) {}

  async create(
    type: LeadType,
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const lead = await this.leadService.submit(type, req.body);
      res.status(201).json({
        id: lead.id,
        type: lead.type,
        createdAt: lead.createdAt,
      });
    } catch (error) {
      next(error);
    }
  }

  async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const leads = await this.leadService.list();
      res.status(200).json({ leads });
    } catch (error) {
      next(error);
    }
  }
}
