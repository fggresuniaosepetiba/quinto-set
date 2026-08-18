import type { Contact, Enrollment, Sponsor } from "@quinto-set/contracts";

export type LeadType = "contact" | "enrollment" | "sponsor";

export type LeadData = Contact | Enrollment | Sponsor;

export type Lead = {
  id: string;
  type: LeadType;
  data: LeadData;
  createdAt: string;
};
